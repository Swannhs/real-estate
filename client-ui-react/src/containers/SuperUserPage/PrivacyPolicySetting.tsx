import React, {FC, useEffect, useState} from 'react';
import CommonLayout from '../AccountPage/CommonLayout';
import CkeditorCustom from '../../shared/Editor/CkeditorCustom';
import {getPrivacyPolicyApi} from "../../apis/StaticData";
import {toast} from "react-toastify";
import {CookiePolicyDataInterface} from "../../types";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {updateNoticeAdminApi} from "../../apis/SuperAdmin";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {SECTIONS} from "../../contains/contants";

interface PrivacyPolicySettingProps {
}

const PrivacyPolicySetting: FC<PrivacyPolicySettingProps> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<CookiePolicyDataInterface>({} as CookiePolicyDataInterface);

    const fetchPrivacyPolicy = () => {
        setIsLoading(true);
        getPrivacyPolicyApi()
            .then(response => {
                setData(response?.data?.data);
                setIsLoading(false);
            })
            .catch(error => {
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchPrivacyPolicy();
    }, []);

    const onChangeHandler = (name: string, description: string) => {
        setData(prevData => ({
            ...prevData,
            [name]: description
        }));
    };

    const onSubmitHandler = () => {
        updateNoticeAdminApi(data)
            .then(() => {
                toast.success("Privacy policy updated successfully");
            })
            .catch(error => {
                toast.error(error?.response?.data?.message)
            });
    }

    if (isLoading) {
        return (
            <CommonLayout>
                <LoadingSpinner size={20} align={'center'}/>
            </CommonLayout>
        );
    }

    return (
        <CommonLayout>
            <div className='flex'>
                <div className="grid grid-cols-5">
                    {SECTIONS.map((section: { name: string, label: string }, index) => (
                        <div key={index} className="col-span-5">
                            <div className='grid grid-cols-6 pb-4'>
                                <div className='col-span-1 flex items-start'>
                                    <h1 className="text-lg font-medium text-neutral-500">{section.label}</h1>
                                </div>
                                <div className='col-span-5'>
                                    <CkeditorCustom
                                        data={String(data[section.name as keyof CookiePolicyDataInterface]) || ''}
                                        onChange={(value: string) => onChangeHandler(section.name, value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='absolutesticky right-10'>
                    <div className='fixed top-1/3 right-[15%]'>
                        <ButtonPrimary
                            className='bg-green-400 hover:bg-green-600'
                            onClick={onSubmitHandler}
                        >
                            Update All
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
};

export default PrivacyPolicySetting;
