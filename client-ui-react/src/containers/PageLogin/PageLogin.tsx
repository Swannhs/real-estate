import React, {FC, useEffect, useState} from "react";
import facebookSvg from "../../images/Facebook.svg";
import googleSvg from "../../images/Google.svg";
import {Helmet} from "react-helmet";
import Input from "../../shared/Input/Input";
import {Link} from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import GoogleLogin from "react-google-login";
// import {gapi} from "gapi-script";
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {useAuth} from "../../hooks/contextApi/AuthContext";
import {loginApi} from "../../apis/Auth";
import {useTranslation} from "react-i18next";
import LogoFooter from "../../shared/Logo/LogoFooter";

export interface PageLoginProps {
    className?: string;
    location?: any,
    history?: any
}

export interface userLoginInterface {
    username: string;
    password: string;
}

export interface loginErrorInterface {
    hasError: boolean,
    message: ''
}

const PageLogin: FC<PageLoginProps> = ({className = "", location, history}) => {
    const {isAuthenticated, setAuthState} = useAuth();
    const {t} = useTranslation();
    const [submit, setSubmit] = useState<boolean>(false);
    const [userLogin, setUserLogin] = useState<userLoginInterface>({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState<loginErrorInterface>({
        hasError: false,
        message: ''
    });
    const prevUrl: string = location.state !== undefined || null ? location.state.prevPath : '/'

    useEffect(() => {
        // function start() {
        //     gapi.auth2.init({
        //         clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID as string,
        //         scope: '',
        //     })
        // }
        //
        // gapi.load('client:auth2', start);

        if (isAuthenticated) {
            if (prevUrl === "/signup" || prevUrl === "/login") {
                history.push('/');
            }
            history.push(prevUrl);
        }
    }, [isAuthenticated]);

    const onChangeHandler = (event: any) => {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        fetchLogin(userLogin);
    }

    const fetchLogin = (userLogin: userLoginInterface) => {
        setSubmit(true);
        loginApi(userLogin.username, userLogin.password)
            .then((response) => {
                setSubmit(false);
                if (setAuthState) {
                    setAuthState(prevState => {
                        return {
                            ...prevState,
                            isAuthenticated: true,
                            token: {
                                accessToken: response.data.access_token,
                            }
                        }
                    });
                }
                // Redirect to home page
                history.push('/');
            })
            .catch((error: any) => {
                setSubmit(false);
                setLoginError({
                    hasError: true,
                    message: error?.response?.data?.message
                });
            })
    }

    const onGoogleLogin = (response: any) => {
        // console.log('google login', response);
    }

    const onGoogleFailure = (response: any) => {
        // console.log('google failure', response);
    }

    const responseFacebook = (response: any) => {
        // console.log(response);
    }

    const renderFBandGoogleLogin = () => (
        <>
            <div className="grid gap-3">
                <GoogleLogin
                    clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID as string}
                    render={renderProps => (
                        <button
                            className='nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
                            onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <img src={googleSvg} alt="Google" className="flex-shrink-0"/>
                            <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                                Continue with Google
                            </h3>
                        </button>
                    )}
                    onSuccess={onGoogleLogin}
                    onFailure={onGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    appId={import.meta.env.VITE_APP_FACEBOOK_APP_ID as string}
                    autoLoad={false}
                    callback={responseFacebook}
                    render={(renderProps: {
                        onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
                    }) => (
                        <button
                            className='nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
                            onClick={renderProps.onClick}>
                            <img src={facebookSvg} alt="Facebook" className="flex-shrink-0"/>
                            <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                                Continue with Facebook
                            </h3>
                        </button>
                    )}
                />
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
        <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Login</title>
            </Helmet>
            <div className="container">
                <div className="text-2xl font-bold text-center text-neutral-700 dark:text-neutral-200 [margin-top:5%]">
                    <LogoFooter/>
                </div>
                <div className="max-w-md mx-auto space-y-6 [margin-top:7%]">
                    {/* FORM */}
                    <form className="grid grid-cols-1 gap-6" onSubmit={onSubmitHandler}>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                {t('email')}
                            </span>
                            <Input
                                type="email"
                                name='username'
                                className={`mt-1 ${loginError.hasError ? 'border-2 border-red-500' : ''}`}
                                required={true}
                                onChange={onChangeHandler}
                            />
                        </label>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                {t('signup.page.password')}
                            </span>
                            <Input
                                type="password"
                                name='password'
                                className={`mt-1 ${loginError.hasError ? 'border-2 border-red-500' : ''}`}
                                required={true}
                                onChange={onChangeHandler}
                            />
                            <p className={`text-sm text-red-500 ${loginError.hasError ? '' : 'hidden'}`}>
                                {loginError.message}
                            </p>
                            <span className="flex justify-end text-neutral-800 font-semibold dark:text-neutral-200">
                                <Link to="/forgot-pass" className="text-sm">
                                    {t('forgot-password')}?
                                </Link>
                            </span>
                        </label>
                        <ButtonPrimary type="submit" disabled={submit}>
                            {
                                submit ?
                                    <LoadingSpinner size={8} align='center'/> :
                                    <p>{t('login')}</p>
                            }
                        </ButtonPrimary>
                    </form>

                    {/* ==== */}
                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        {t('new-user')}? {` `}
                        <Link to='/signup' className='text-blue-700 font-bold'>{t('create-account')}</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;
