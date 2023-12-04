import React, {FC, useEffect, useState} from "react";
import Label from "../../components/Label/Label";
import Input from "../../shared/Input/Input";
import Textarea from "../../shared/Textarea/Textarea";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import {useTranslation} from "react-i18next";
import {contactUsApi} from "../../apis/ContactUs";
import {useSelector} from "react-redux";
import {StateInterface} from "../../redux/reducers/rootReducer";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";

export interface PageContactProps {
    className?: string;
}

const PageContact: FC<PageContactProps> = ({className = ""}) => {
    const {language} = useSelector((state: StateInterface) => state.lang);
    const {t} = useTranslation();
    const [contactUs, setContactUs] = useState({
        clientEmail: "",
        reason: "",
        firstName: "",
        lastName: "",
        message: "",
    });
    const [messageSent, setMessageSent] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        setDisabled(false);
    }, []);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setContactUs({...contactUs, [name]: value});
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabled(true);
        contactUsApi(contactUs, language)
            .then(() => {
                setMessageSent(true);

                setTimeout(() => {
                    setMessageSent(false);
                }, 3000);
            })
            .catch(error => {
                toast.error(error?.response?.data?.message)
            });
    }

    const renderMain = () => {
        return (
            <div
                className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                    {t('contact.us')}
                </h2>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <form onSubmit={onSubmitHandler}>
                    <div
                        className="mt-6 flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                        <p className='text-neutral-700'>
                            {t('contact-us.get-in-touch')}
                        </p>
                    </div>
                    <div className="w-14 my-5"></div>

                    <h3 className="text-2xl font-semibold text-center">{t('how.can.we.help.you')}</h3>

                    <div className="mt-6">
                        <div className="flex space-x-5">
                            <div className="flex-1 space-y-1">
                                <Label>{t('first.name')} <span className='text-red-600'>*</span></Label>
                                <Input
                                    className={disabled ? "bg-neutral-100 dark:bg-neutral-800" : ""}
                                    required={true}
                                    type='text'
                                    name='firstName'
                                    value={contactUs.firstName}
                                    disabled={disabled}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>{t('last.name')} <span className='text-red-600'>*</span></Label>
                                <Input
                                    className={disabled ? "bg-neutral-100 dark:bg-neutral-800" : ""}
                                    required={true}
                                    type='text'
                                    name='lastName'
                                    value={contactUs.lastName}
                                    disabled={disabled}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>{t('email')} <span className='text-red-600'>*</span></Label>
                            <Input
                                className={disabled ? "bg-neutral-100 dark:bg-neutral-800" : ""}
                                required={true}
                                type='email'
                                name='clientEmail'
                                value={contactUs.clientEmail}
                                disabled={disabled}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>{t('reason.for.contact.us')} <span className='text-red-600'>*</span></Label>
                            <Input
                                className={disabled ? "bg-neutral-100 dark:bg-neutral-800" : ""}
                                required={true}
                                type='text'
                                name='reason'
                                value={contactUs.reason}
                                disabled={disabled}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>{t('your.message.to.us')}</Label>
                            <Textarea
                                className={disabled ? "bg-neutral-100 dark:bg-neutral-800" : ""}
                                name='message'
                                value={contactUs.message}
                                disabled={disabled}
                                onChange={onChangeHandler}
                            />
                        </div>
                        {/*    Position bottom right of this box*/}
                        <div className="flex justify-end">
                            <p className='text-neutral-500'>
                                <span className='text-blue-500'>*&nbsp;</span>
                                {t('contact-us.fill-up-required-fields')}
                            </p>
                        </div>
                    </div>
                    {/*Sent successful message*/}
                    <div className="flex justify-center">
                        {
                            messageSent && (
                                <p className='text-green-500'>
                                    {t('contact-us.message-sent-successfully')}
                                </p>
                            )
                        }
                    </div>
                    <div className="pt-8">
                        <ButtonPrimary className='w-1/5' disabled={disabled} type='submit'>{t('send')}</ButtonPrimary>
                    </div>
                </form>
            </div>
        );
    };
    return (
        <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Contact Us</title>
            </Helmet>
            <main className="container mt-11 mb-24 lg:mb-32 flex justify-center">
                <div
                    className="w-full tablet:w-3/5 tablet-landscape:w-3/5 lg:w-3/5 xl:w-3/5 lg:pr-10">{renderMain()}</div>
            </main>
        </div>
    );
};

export default PageContact;
