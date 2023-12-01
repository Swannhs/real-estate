import React, {FC, useEffect, useState} from 'react';
import CommonLayout from "./CommonLayout";
import {searchAlertDataInterface} from "../../redux/reducers/searchAlertReducer";
import BtnDeleteIcon from "../../components/IconButton/BtnDeleteIcon";
import {deleteSearchAlertApi, getSearchAlertAuthApi} from "../../apis/SearchAlert";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export interface SearchAlertProps {

}

const SearchAlertPage: FC<SearchAlertProps> = () => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<any[]>([]);

    const fetchSearchAlerts = () => {
        setIsLoading(true)
        getSearchAlertAuthApi()
            .then((response: any) => {
                setItems(response?.data?.data);
                setIsLoading(false);
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message || 'Something went wrong!');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchSearchAlerts();
    }, []);

    const onConfirmDelete = (id: any) => {
        deleteSearchAlertApi(id)
            .then((response) => {
                fetchSearchAlerts();
                toast.success(t(response?.data?.message));
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message || 'Something went wrong!');
            });
    }

    const renderNoSearchAlert = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <h3 className="text-2xl font-semibold">{t('no-search-alert-found')}</h3>
                <p className="text-neutral-500 mt-3">{t('no-search-alert-item-list')}</p>
            </div>
        </div>
    )

    const renderSearchAlerts = (item: searchAlertDataInterface, index: React.Key) => {
        return (
            <div key={index}
                 className='nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow h-40'>
                <BtnDeleteIcon id={item.id} onDelete={onConfirmDelete} className="absolute right-3 top-3 z-[1]"/>
                <div className='p-4 space-y-4'>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <h2
                                className={`capitalize text-lg font-bold`}
                            >
                                {item.smtpTime.name}
                            </h2>
                        </div>
                        {/*    Inline block*/}
                        <div className='inline-block'>
                            <p>{item.estateAdsPurpose}</p>
                            <p>{item.estateTypes}</p>
                            <p>{item.addressLine1}</p>
                            <p>CHF {item.priceStart ?? 0}</p>
                            <p>CHF {item.priceEnd}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <CommonLayout>
            <div className='space-y-6 text sm:space-y-8'>
                {
                    isLoading ?
                        <LoadingSpinner size={20} align='center'/> :
                        <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                items?.map((item: searchAlertDataInterface, index: React.Key) => (
                                    renderSearchAlerts(item, index)
                                ))
                            }
                        </div>
                }
            </div>
            {!isLoading && items.length === 0 && renderNoSearchAlert()}
        </CommonLayout>
    );
};

export default SearchAlertPage;