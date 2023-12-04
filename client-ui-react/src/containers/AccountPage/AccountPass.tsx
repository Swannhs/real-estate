import Label from "../../components/Label/Label";
import React, {FC, useState} from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import CommonLayout from "./CommonLayout";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {changePasswordApi} from "../../apis/User";

export interface ChangePasswordType {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const AccountPass: FC = () => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [password, setPassword] = useState<ChangePasswordType>({
        confirmNewPassword: '',
        newPassword: '',
        currentPassword: ''
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (hasError) {
            setHasError(false);
        }
        setPassword({
            ...password,
            [event.target.name]: event.target.value
        });
    }

    const onSubmitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setIsLoading(true);
        await changePasswordApi(password)
            .then((response: any) => {
                toast.success(response.data);
                setIsLoading(false);
            })
            .catch((error: any) => {
                setHasError(true);
                toast.error(error.response.data?.message);
                setIsLoading(false);
            })
    }

    return (
        <div>
            <CommonLayout>
                <div className="space-y-6 sm:space-y-8">
                    {/* HEADING */}
                    <h2 className="text-3xl font-semibold">
                        {t('account.account.password.page.title')}
                    </h2>
                    <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                    {
                        isLoading ?
                            <LoadingSpinner size={20} align='center'/> :
                            <form className=" max-w-xl space-y-6" onSubmit={onSubmitHandler}>
                                <div>
                                    <Label>
                                        {t('account.account.password.page.current.password')}
                                    </Label>
                                    <Input
                                        type="password"
                                        className={`mt-1.5 ${hasError && 'border-2 border-red-500'}`}
                                        required={true}
                                        name='currentPassword'
                                        onChange={onChangeHandler}/>
                                </div>
                                <div>
                                    <Label>
                                        {t('account.account.password.page.new.password')}
                                    </Label>
                                    <Input
                                        type="password"
                                        className={`mt-1.5 ${hasError && 'border-2 border-red-500'}`}
                                        required={true}
                                        name='newPassword'
                                        onChange={onChangeHandler}/>
                                </div>
                                <div>
                                    <Label>
                                        {t('account.account.password.page.confirm.password')}
                                    </Label>
                                    <Input
                                        type="password"
                                        className={`mt-1.5 ${hasError && 'border-2 border-red-500'}`}
                                        required={true}
                                        name='confirmNewPassword'
                                        onChange={onChangeHandler}/>
                                </div>
                                <div className="pt-2">
                                    <ButtonPrimary>
                                        {t('account.account.password.page.update')}
                                    </ButtonPrimary>
                                </div>
                            </form>
                    }
                </div>
            </CommonLayout>
        </div>
    );
};

export default AccountPass;
