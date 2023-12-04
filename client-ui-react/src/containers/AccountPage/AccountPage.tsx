import Label from "../../components/Label/Label";
import React, {FC, useEffect, useState} from "react";
import Avatar from "../../shared/Avatar/Avatar";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import CommonLayout from "./CommonLayout";
import {Helmet} from "react-helmet";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {uploadProfilePictureApi} from "../../apis/Auth";
import {toast} from "react-toastify";
import {getUserInfoApi, updateUserInfoApi} from "../../apis/User";
import Select from "../../shared/Select/Select";
import Textarea from "../../shared/Textarea/Textarea";
import {useTranslation} from "react-i18next";
import {getLanguagesApi} from "../../apis/StaticData";

export interface UpdateUserType {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    profilePicture_path: string;
    intro: string;
    facebookLink?: string;
    twitterLink?: string;
    youtubeLink?: string;
    instagramLink?: string;
    address: string;
    language: string;
    birthDate?: string;
}

export interface AccountPageProps {
    className?: string;
}

export interface langType {
    name: string;
    value: string;
}

const AccountPage: FC<AccountPageProps> = ({className = ""}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});
    const [updateUser, setUpdateUser] = useState<UpdateUserType>({} as UpdateUserType);
    const [languages, setLanguages] = useState<langType[]>([]);


    useEffect(() => {
        fetchLanguages();
        fetchUserInfo();
    }, []);

    const fetchLanguages = () => {
        getLanguagesApi()
            .then(response => {
                setLanguages(response.data);
            })
            .catch(error => {
                toast.error(error?.data?.message);
            });
    }

    const fetchUserInfo = () => {
        setIsLoading(true);
        getUserInfoApi()
            .then((response: any) => {
                setUser(response.data);
                setUpdateUser({
                    firstName: response?.data?.details?.firstName,
                    lastName: response?.data?.details?.lastName,
                    phoneNumber: response?.data?.details?.phoneNumber,
                    gender: response?.data?.details?.gender,
                    profilePicture_path: response?.data?.details?.profilePicture_path,
                    intro: response?.data?.details?.intro,
                    facebookLink: response?.data?.details?.facebookLink,
                    twitterLink: response?.data?.details?.twitterLink,
                    youtubeLink: response?.data?.details?.youtubeLink,
                    instagramLink: response?.data?.details?.instagramLink,
                    address: response?.data?.details?.address,
                    language: response?.data?.details?.language,
                    birthDate: response?.data?.details?.birthDate
                });
                setIsLoading(false);
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
            })
    }

    const onFileChangeHandler = async (event: any) => {
        let formData: FormData = new FormData();
        formData.append('file', event.target.files[0]);
        setIsImageUploading(true);
        await uploadProfilePictureApi(formData)
            .then((response: any) => {
                setUpdateUser({...updateUser, profilePicture_path: response.data.fileModifiedName});
                setIsImageUploading(false);
            })
            .catch((error: any) => {
                toast.error(error?.data.message);
            })
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setUpdateUser({
            ...updateUser,
            [event.target.name]: event.target.value
        });
    }

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateUserInfoApi(user.username, updateUser)
            .then((response: any) => {
                toast.success(response.data);
                fetchUserInfo();
                localStorage.setItem('defaultLanguage', updateUser.language);
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
            });
    }

    const accountInfo = () => {
        if (isLoading) {
            return <LoadingSpinner size={20} align='center'/>
        } else {
            return (
                <div className="space-y-6 sm:space-y-8">
                    {/* HEADING */}
                    <h2 className="text-3xl font-semibold">
                        {t('account.account.info.page.title')}
                    </h2>
                    <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                    <form className="flex flex-col md:flex-row" onSubmit={onSubmitHandler}>
                        <div className="flex-shrink-0 flex items-start">
                            <div className="relative rounded-full overflow-hidden flex">
                                {
                                    updateUser.profilePicture_path !== '' || null ?
                                        <Avatar
                                            imgUrl={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + updateUser.profilePicture_path}
                                            sizeClass="w-32 h-32"/> :
                                        <Avatar sizeClass="w-32 h-32"/>
                                }

                                <div
                                    className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                                    {
                                        isImageUploading ?
                                            <LoadingSpinner size={10} className='pl-2'
                                                            align='center'/> :
                                            <>
                                                <svg
                                                    width="30"
                                                    height="30"
                                                    viewBox="0 0 30 30"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                                                        stroke="currentColor"
                                                        strokeWidth={1.5}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                                <span className="mt-1 text-xs">{t('change-image')}</span>
                                            </>
                                    }

                                </div>
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={onFileChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                            <div>
                                <Label>
                                    {t('account.account.info.page.firstname')}
                                </Label>
                                <Input className="mt-1.5" name='firstName'
                                       value={updateUser.firstName}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>
                                    {t('account.account.info.page.lastname')}
                                </Label>
                                <Input className="mt-1.5" name='lastName'
                                       value={updateUser.lastName}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>
                                    {t('account.account.info.page.gender')}
                                </Label>
                                <Select className="mt-1.5" name='gender'
                                        defaultValue={updateUser.gender ?? "SELECT"}
                                        value={updateUser.gender}
                                        onChange={onChangeHandler}>
                                    <option value='SELECT' disabled>{t('addProperty.select')}</option>
                                    <option value="MALE">{t('male')}</option>
                                    <option value="FEMALE">{t('female')}</option>
                                    <option value="OTHER">{t('other')}</option>
                                </Select>
                            </div>
                            {/*<div>*/}
                            {/*    <Label>Date of birth</Label>*/}
                            {/*    <Input*/}
                            {/*        name='dateOfBirth'*/}
                            {/*        className="mt-1.5"*/}
                            {/*        value={`${updateUser.birthDate}`}*/}
                            {/*        type="date"*/}
                            {/*        onChange={onChangeHandler}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/* ---- */}
                            <div>
                                <Label>{t('address')}</Label>
                                <Input className="mt-1.5" name='address' value={updateUser.address}
                                       onChange={onChangeHandler}/>
                            </div>
                            {/* ---- */}
                            <div>
                                <Label>{t('phone-number')}</Label>
                                <Input className="mt-1.5" name='phoneNumber' value={updateUser.phoneNumber}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>Facebook</Label>
                                <Input className="mt-1.5" name='facebookLink'
                                       value={updateUser.facebookLink}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>Twitter</Label>
                                <Input className="mt-1.5" name='twitterLink'
                                       value={updateUser.twitterLink}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>Instagram</Label>
                                <Input className="mt-1.5" name='instagramLink'
                                       value={updateUser.instagramLink}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>Youtube</Label>
                                <Input className="mt-1.5" name='youtubeLink'
                                       value={updateUser.youtubeLink}
                                       onChange={onChangeHandler}/>
                            </div>
                            <div>
                                <Label>{t('language')}</Label>
                                <Select className="mt-1.5" name='language'
                                        value={updateUser.language}
                                        onChange={onChangeHandler}>
                                    <option disabled value='SELECT'>{t('select-language')}</option>
                                    {languages?.map((language, index) => <option key={index} value={language.value}>{language.name}</option>)}
                                </Select>
                            </div>
                            <div>
                                <Label>{t('about-you')}</Label>
                                <Textarea className="mt-1.5" name='intro' value={updateUser.intro}
                                          onChange={onChangeHandler}/>
                            </div>
                            <div className="pt-2">
                                <ButtonPrimary type='submit'>{t('update-info')}</ButtonPrimary>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }

    return (
        <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
            <Helmet>
                <title>Account | {import.meta.env.VITE_APP_TITLE}</title>
            </Helmet>
            <CommonLayout>
                {accountInfo()}
            </CommonLayout>
        </div>
    );
};

export default AccountPage;