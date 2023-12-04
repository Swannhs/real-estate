import React, {FC, useEffect} from 'react';
import CommonLayout from "./CommonLayout";
import WishListPropertyCard from "../../components/PropertyCard/WishListPropertyCard";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {useWishListContext} from "../../hooks/contextApi/WishListContext";
import {toast} from "react-toastify";

export interface WishListPageProps {

}

const AuthWishListPage: FC<WishListPageProps> = () => {
    const {t} = useTranslation();
    const {isLoading, data, error} = useWishListContext();

    useEffect(() => {
        if (error) {
            toast.warning(error?.message || t('something-went-wrong'));
        }
    }, [error]);

    const renderNoWishList = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <h3 className="text-2xl font-semibold">{t('no-wishlist-found')}</h3>
                <p className="text-neutral-500 mt-3">{t('no-wishlist-item-list')}</p>
            </div>
        </div>
    )

    const renderWishList = () => (
        <div className='space-y-6 text sm:space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    data.map((item: any, index: number) => (
                        <WishListPropertyCard key={index} data={item}/>
                    ))
                }
            </div>
        </div>
    )

    const renderWishListContent = () => {
        if (!isLoading) {
            if (data.length) {
                return renderWishList();
            } else {
                return renderNoWishList();
            }
        } else {
            return <LoadingSpinner size={20} align='center'/>
        }
    }

    return (
        <CommonLayout>
            {renderWishListContent()}
        </CommonLayout>
    );
};

export default AuthWishListPage;