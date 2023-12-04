import React, {FC} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import ButtonPublish from "../../shared/Button/ButtonPublish";
import {useTranslation} from "react-i18next";
import AccountLayout from "../AccountPage/CommonLayout";

export interface CommonLayoutProps {
    isEdit: boolean;
    children: any;
    isSubmitting?: boolean;
    onSubmit?: () => void;
}

const CommonLayout: FC<CommonLayoutProps> = ({children, onSubmit, isEdit, isSubmitting = false}) => {
    const {t} = useTranslation();

    const onBackButtonHandler = () => {
        window.history.back();
    }

    const onClickHandler = () => {
        onSubmit && onSubmit();
    }

    return (
        <AccountLayout>
            <div
                className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-5 lg:pb-32`}
                data-nc-id="PageAddListing1"
            >
                <Helmet>
                    <link rel="apple-touch-icon" href="src/assets/favicon.png"/>
                    <title>{import.meta.env.VITE_APP_TITLE} | {window.location.pathname.toString().split('/')[2] === 'edit' ? 'Edit Property' : 'Add Property'}</title>
                </Helmet>
                <ToastContainer/>
                <div className="space-y-11">

                    {/* --------------------- */}
                    <div className="listingSection__wrap ">
                        {children}
                    </div>

                    {/* --------------------- */}
                    <div className="flex justify-end space-x-5">
                        <ButtonSecondary onClick={onBackButtonHandler}>{t('addProperty.button.go-back')}</ButtonSecondary>
                        <ButtonPublish
                            className={isSubmitting ? 'bg-green-200 hover:bg-green-300': ''}
                            disabled={isSubmitting}
                            onClick={onClickHandler}
                        >
                            {isEdit ? t('account.account.info.page.update') : t('addProperty.button.publish')}
                        </ButtonPublish>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
};

export default CommonLayout;
