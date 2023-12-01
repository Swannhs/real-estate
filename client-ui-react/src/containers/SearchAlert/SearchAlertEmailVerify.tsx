import React, {FC, useEffect} from 'react';
import {Helmet} from "react-helmet";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {useSearchQuery} from "../../common/query";
import {Redirect} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {searchAlertVerifyAuthApi} from "../../apis/SearchAlert";
import {toast} from "react-toastify";

export interface SearchAlertEmailVerifyProps {
    className?: string;
}

const SearchAlertEmailVerify: FC<SearchAlertEmailVerifyProps> = ({
                                                                     className = "",
                                                                 }) => {
    const {t} = useTranslation();
    const query = useSearchQuery();

    const verifySearchAlertApi = (token: string) => {
        searchAlertVerifyAuthApi(token)
            .then(() => {
                setTimeout(() => {
                    redirectHome();
                }, 1000)
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
            });
    }

    useEffect(() => {
        verifySearchAlertApi(query.get('token') as string);
    }, []);

    const redirectHome = () => {
        return <Redirect to={'/'}/>;
    }

    const renderVerification = () => {
        return renderSearchAlertActive();
    }

    const renderSearchAlertActive = () => (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center justify-center w-full h-full">
                <div className='text-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              fill={"#6be81a"}
                              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"/>
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-center my-2">
                    {t('search-alert-is-active')}
                </h3>

            </div>
            <div className='flex flex-col items-center justify-center'>
                <p className="text-center">
                    {t('search-alert-intro')}
                </p>
            </div>
            <div className='flex flex-col items-center justify-center mt-10'>
                <h2 className='text-4xl font-semibold my-2'>
                    {t('search-alert-tenant')}
                </h2>
                <p className="text-center">
                    {t('search-alert-description')}
                </p>
            </div>
            <ButtonPrimary href='/' className='my-5'>
                {t('back-to-home')}
            </ButtonPrimary>
        </div>
    )

    return (
        <div className={`nc-PageLogin ${className}`}>
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Search Alert</title>
            </Helmet>
            <div className="container mb-24 lg:mb-32">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    {renderVerification()}
                </div>
            </div>
        </div>
    );
};

export default SearchAlertEmailVerify;