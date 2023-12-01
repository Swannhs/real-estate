import React from 'react';
import {useTranslation} from "react-i18next";
import PropertyCardCustom from "../../components/PropertyCardH/PropertyCardCustom";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {useWishListContext} from "../../hooks/contextApi/WishListContext";

const PublicWishListPage = () => {
    const {t} = useTranslation();
    const {isLoading, data} = useWishListContext();

    const renderNotFound = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <h3 className="text-2xl font-semibold">{t('wish-list-not-available')}</h3>
                <p className="text-neutral-500 mt-3">{t('wish-list-need-to-be-added')}</p>
            </div>
        </div>
    )

    const renderLoading = () => (
        <LoadingSpinner size={20} align='center'/>
    )

    const renderWishListProperty = () => {
        if (isLoading) {
            return renderLoading();
        }
        if (data.length === 0) {
            return renderNotFound();
        }
        return (
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                {
                    data.map((property) => (
                        <PropertyCardCustom data={property}/>
                    ))
                }
            </div>
        );
    }

    return (
        <div
            className="w-full justify-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
            <div className="flex items-center">
                <h2 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100 ml-[30%]">
                    {t('wish-list')}
                </h2>
            </div>
            {renderWishListProperty()}
        </div>
    );
};

export default PublicWishListPage;