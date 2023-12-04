import React, {FC, useEffect, useState} from 'react';
import CommonLayout from '../AccountPage/CommonLayout';
import SwitchButton from "../../shared/SwitchButton/SwitchButton";
import {getPaymentSettingsAdminApi, updatePaymentSettingsAdminApi} from "../../apis/SuperAdmin";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {toast} from "react-toastify";

const PaymentSetting:FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [paymentAllowed, setPaymentAllowed] = useState<boolean>(false);

    useEffect(() => {
        fetchPaymentSetting();
    }, []);

    const fetchPaymentSetting = () => {
        setIsLoading(true);
        getPaymentSettingsAdminApi()
            .then(response => {
                setPaymentAllowed(response.data?.paymentAllowed);
            })
            .catch(error => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const updatePaymentSetting = (isActive: boolean) => {
        setIsLoading(true);
        let data = {
            "paymentAllowed": isActive
        }

        updatePaymentSettingsAdminApi(data)
            .then(response => {
                setPaymentAllowed(response.data?.paymentAllowed);
                toast.success("Payment setting updated successfully");
            })
            .catch(error => {
                toast.error(error?.response?.data?.message || 'Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onChangeHandler = (isActive: boolean) => {
        updatePaymentSetting(isActive);
    }

    if (isLoading) {
        return (
            <CommonLayout>
                <LoadingSpinner size={20} align='center'/>
            </CommonLayout>
        )
    }

    return (
        <CommonLayout>
            <h1 className='text-3xl font-semibold text-center'>Payment Setting</h1>
            {/*Underline*/}
            <div className='w-full h-1 mb-4 bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='flex space-x-5'>
                <div>
                    <h2 className='font-semibold'>Enable Payment</h2>
                </div>
                <div>
                    <SwitchButton isActive={paymentAllowed} onChange={onChangeHandler}/>
                </div>
            </div>
        </CommonLayout>
    );
};

export default PaymentSetting;