import React, {FC, useState} from "react";
import googleSvg from "../../images/Google.svg";
import {Helmet} from "react-helmet";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {Link} from "react-router-dom";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import Logo from "../../shared/Logo/Logo";
import {registerApi} from "../../apis/Auth";
import {toast, ToastContainer} from "react-toastify";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";

export interface PageSignUpProps {
    className?: string;
    location?: any,
    history?: any
}

export interface userDetailsType {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profilePicture_path?: string;
    intro?: string;
    facebookLink?: string;
    twitterLink?: string;
    youtubeLink?: string;
    instagramLink?: string;
    address?: string;
    language?: string;
    birthDate?: string;
}

export interface userRegisterInterface {
    email?: string;
    userName?: string;
    password?: string;
    matchingPassword?: string;
}

const loginSocials = [
    {
        name: "Continue with Google",
        href: "#",
        icon: googleSvg,
    }
];

const PageSignUp: FC<PageSignUpProps> = ({className = "", location, history}) => {
    const {t} = useTranslation();
    const [user, setUser] = useState<userRegisterInterface>({
        email: '',
        userName: '',
        password: '',
        matchingPassword: ''
    });
    const [validationError, setValidationError] = useState<any>({})
    const [submit, setSubmit] = useState<boolean>(false);
    const validatorSchema = Yup.object().shape({
        userName: Yup.string()
            .email(t('signup.email.invalid'))
            .required(t('signup.email.required')),
        password: Yup.string()
            // .min(6, 'Password must be at least 6 characters')    // TODO: Need to modify this later
            .required(t('signup.password.required')),
        matchingPassword: Yup.string()
            .required(t('signup.matching.password.required'))
            .test('passwords-match', t('signup.password.not.match'), function (value) {
                return this.parent.password === value;
            })
    });

    const onChangeHandler = (event: any) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const onRegisterApiCall = (newUser: any) => {
        registerApi(newUser)
            .then((response: any) => {
                if (response.status === 201) {
                    toast.success(t('signup.page.signup.success'));
                    setTimeout(() => {
                        history.push('/login');
                    }, 3000);
                } else {
                    toast.error(t('signup.page.signup.error'));
                }
            })
            .catch((error: any) => {
                if (error.response) {
                    setValidationError({
                        email: error.response.data.message
                    })
                }
                setSubmit(false);
            })
    }

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        validatorSchema.validate(user, {abortEarly: false})
            .then(() => {
                setSubmit(true);
                onRegisterApiCall(registerData);
            })
            .catch((err: any) => {
                const errorInner = err.inner;
                const errors: { [key: string]: string } = {};

                errorInner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });

                setValidationError(errors);
            });

        let registerData: any = {
            userName: user.userName,
            email: user.userName,
            password: user.password,
            details: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                profilePicture_path: "",
                intro: "",
                facebookLink: "",
                twitterLink: "",
                youtubeLink: "",
                instagramLink: "",
                address: "",
                language: "",
                birthDate: ""
            }
        }
    }

    const renderFBandGoogleLogin = () => (
        <>
            <div className="grid gap-3">
                {loginSocials.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                    >
                        <img
                            className="flex-shrink-0"
                            src={item.icon}
                            alt={item.name}
                        />
                        <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                            {item.name}
                        </h3>
                    </a>
                ))}
            </div>
            {/* OR */}
            <div className="relative text-center">
                 <span
                     className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                     OR
                 </span>
                <div
                    className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
        </>
    )

    return (
        <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
            <ToastContainer/>
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Sign Up</title>
            </Helmet>
            <div className="container">
                <div className="text-2xl font-bold text-center text-neutral-700 dark:text-neutral-200 [margin-top:5%]">
                    <Logo/>
                </div>
                <div className="max-w-md mx-auto space-y-6 [margin-top:7%]">

                    {/* FORM */}
                    <form className="grid grid-cols-1 gap-6" onSubmit={onSubmitHandler}>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.email')}
                            </span>
                            <Input
                                type="email"
                                className={`mt-1 ${validationError.email ? 'border-2 border-red-500' : ''}`}
                                name="userName"
                                onChange={onChangeHandler}
                            />
                            <p className={`absolute text-sm text-red-500 ${!validationError.email ? 'hidden' : ''}`}>{validationError.email}</p>
                        </label>
                        <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.password')}
                            </span>
                            <Input
                                type="password"
                                className={`mt-1 ${validationError.password ? 'border-2 border-red-500' : ''}`}
                                name="password"
                                onChange={onChangeHandler}
                            />
                            <p className={`absolute text-sm text-red-500 ${!validationError.password ? 'hidden' : ''}`}>{validationError.password}</p>
                        </label>
                        <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.confirm.password')}
                            </span>
                            <Input
                                type="password"
                                className={`mt-1 ${validationError.matchingPassword ? 'border-2 border-red-500' : ''}`}
                                name="matchingPassword"
                                onChange={onChangeHandler}
                            />
                            <p className={`absolute text-sm text-red-500 ${!validationError.matchingPassword ? 'hidden' : ''}`}>{validationError.matchingPassword}</p>
                        </label>
                        <ButtonPrimary disabled={submit} type="submit">
                            {
                                submit ?
                                    <LoadingSpinner size={8} align='center'/> :
                                    <p>{t("signup.page.signup")}</p>
                            }
                        </ButtonPrimary>
                        <label className='block text-center'>
                            <span className='text-green-500 text-xs hidden'>
                                {t('signup.page.signup.success')}
                            </span>
                        </label>
                    </form>

                    {/* ==== */}
                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        {t('signup.page.already.have.account')} {` `}
                        <Link to='/login' className='text-blue-700 font-bold'>{t('sign-in')}</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageSignUp;
