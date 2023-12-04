import React, {FC, useState} from "react";
import {Helmet} from "react-helmet";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {Link} from "react-router-dom";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import Logo from "../../shared/Logo/Logo";
import {toast, ToastContainer} from "react-toastify";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import {useSearchQuery} from "../../common/query";
import {publicResetPasswordApi} from "../../apis/Auth";

export interface PageChangePasswordProps {
    className?: string;
    history?: any
}

const PageChangePassword: FC<PageChangePasswordProps> = ({className = "", history}) => {
    const {t} = useTranslation();
    const [passwordData, setPasswordData] = useState<{ token: string; newPassword: string; confirmNewPassword: string }>({
        token: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<{ newPassword?: string, confirmNewPassword?: string }>({});

    const validatorSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required(t('signup.password.required')),
        confirmNewPassword: Yup.string()
            .required(t('signup.confirmPassword.required'))
            .test('passwords-match', t('signup.password.mismatch'), function (value) {
                return this.parent.newPassword === value;
            })
    });

    const query = useSearchQuery();
    const token = query.get('token');

    const onChangeHandler = (event: any) => {
        setPasswordData({
            ...passwordData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        validatorSchema.validate(passwordData, {abortEarly: false})
            .then(() => {
                setLoading(true);
                passwordData.token = token ? token : '';
                publicResetPasswordApi(passwordData)
                    .then((res: any) => {
                        toast.success(res?.data?.message ?? "Password changed successfully");
                        setTimeout(() => {
                            history.push('/login');
                        }, 3000);
                    })
                    .catch((err: any) => {
                        toast.error(err?.response?.message ?? "Failed to change password");
                        setLoading(false);
                    });
            })
            .catch((err: any) => {
                const errors: { [key: string]: string } = {};
                err.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setValidationError(errors);
            });
    };

    return (
        <div className={`nc-PageChangePassword ${className}`} data-nc-id="PageChangePassword">
            <ToastContainer/>
            <Helmet>
                <title>Change Password</title>
            </Helmet>
            <div className="container">
                <div className="text-2xl font-bold text-center">
                    <Logo/>
                </div>
                <div className="max-w-md mx-auto space-y-6 mt-7">

                    <form className="grid grid-cols-1 gap-6" onSubmit={onSubmitHandler}>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.password')}
                            </span>
                            <Input
                                type="password"
                                className={`mt-1 ${validationError.newPassword ? 'border-2 border-red-500' : ''}`}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={onChangeHandler}
                            />
                            <p className={`text-sm text-red-500 ${!validationError.newPassword ? 'hidden' : ''}`}>{validationError.newPassword}</p>
                        </label>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.confirm.password')}
                            </span>
                            <Input
                                type="password"
                                className={`mt-1 ${validationError.confirmNewPassword ? 'border-2 border-red-500' : ''}`}
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={onChangeHandler}
                            />
                            <p className={`text-sm text-red-500 ${!validationError.confirmNewPassword ? 'hidden' : ''}`}>{validationError.confirmNewPassword}</p>
                        </label>
                        <ButtonPrimary disabled={loading} type="submit">
                            {
                                loading ?
                                    <LoadingSpinner size={8} align='center'/> :
                                    <p>Change</p>
                            }
                        </ButtonPrimary>
                    </form>

                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        Go back to {` `}
                        <Link to='/login' className='text-blue-700 font-bold'>Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageChangePassword;
