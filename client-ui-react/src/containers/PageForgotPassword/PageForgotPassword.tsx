import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../shared/Loader/LoadingSpinner";
import Logo from "../../shared/Logo/Logo";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {forgotPasswordApi} from "../../apis/ContactUs";

export interface PageForgotPasswordProps {
    className?: string;
}

const PageForgotPassword: FC<PageForgotPasswordProps> = ({ className = "" }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>('');

    const validatorSchema = Yup.string()
        .email(t('signup.email.invalid'))
        .required(t('signup.email.required'));

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        validatorSchema.validate(email)
            .then(() => {
                let data = {
                    email: email
                }
                setLoading(true);
                forgotPasswordApi(data)
                    .then((res: any) => {
                        toast.success(res?.data?.message ?? "Email sent successfully");
                    })
                    .catch((err: any) => {
                        toast.error(err?.response?.data?.message ?? "Something went wrong");
                        setLoading(false);
                    });
            })
            .catch((err: any) => {
                setValidationError(err.message);
            });
    };

    return (
        <div className={`nc-PageForgotPassword ${className}`} data-nc-id="PageForgotPassword">
            <ToastContainer/>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <div className="container">
                <div className="text-2xl font-bold text-center">
                    <Logo/>
                </div>
                <div className="max-w-md mx-auto space-y-6 mt-7">

                    <form className="grid grid-cols-1 gap-6" onSubmit={onSubmitHandler}>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.email')}
                            </span>
                            <Input
                                type="email"
                                className={`mt-1 ${validationError ? 'border-2 border-red-500' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className={`text-sm text-red-500 ${!validationError ? 'hidden' : ''}`}>{validationError}</p>
                        </label>
                        <ButtonPrimary disabled={loading} type="submit">
                            {
                                loading ?
                                    <LoadingSpinner size={8} align='center'/> :
                                    <p>Forgot</p>
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

export default PageForgotPassword;