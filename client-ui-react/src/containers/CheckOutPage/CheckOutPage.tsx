import React, {FC, useEffect, useState} from "react";
import NcModal from "../../shared/NcModal/NcModal";
import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {PayPalScriptOptions} from "@paypal/paypal-js/types/script-options";
import {useSearchQuery} from "../../common/query";
import {getPricePackageByIdApi} from "../../apis/StaticData";
import {toast, ToastContainer} from "react-toastify";
import {getPropertyByIdApi} from "../../apis/Property";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import GallerySlider from "../../components/GallerySlider/GallerySlider";
import Checkbox from "../../shared/Checkbox/Checkbox";
import {useTranslation} from "react-i18next";

export interface CheckOutPageProps {
    className?: string;
}

interface IsLoadingType {
    property: boolean;
    pricePackage: boolean;
}

const CheckOutPage: FC<CheckOutPageProps> = ({className = ""}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState<IsLoadingType>({
        property: true,
        pricePackage: true,
    });
    const query = useSearchQuery();
    const [pricePackage, setPricePackage] = useState<any>(null);
    const [property, setProperty] = useState<any>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    // const [additionalPrice, setAdditionalPrice] = useState<number>(0);


    useEffect(() => {
        if (query.get('package') && query.get('property')) {
            setIsLoading({
                property: true,
                pricePackage: true
            });
            fetchPricePackage(query.get('package') as string);
            fetchProperty(query.get('property') as string);
        } else {
            toast('Package not found', {type: 'error'});
        }
    }, []);

    const fetchPricePackage = (pricePackageId: string) => {
        getPricePackageByIdApi(pricePackageId)
            .then((response: any) => {
                if (response.data.success) {
                    setPricePackage(response.data.data);
                    setIsLoading({
                        ...isLoading,
                        pricePackage: false
                    });
                } else {
                    toast(response.data.message, {type: 'error'});
                }
            })
            .catch((error: any) => {
                toast(error?.response?.message, {type: 'error'});
            });
    }

    const fetchProperty = (propertyId: string) => {
        getPropertyByIdApi(propertyId)
            .then((response: any) => {
                setProperty(response.data.data);
                let images: string[] = [];
                response?.data?.data?.images?.map((src: string) => {
                    images.push(import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + src);
                });
                setGalleryImages(images);
                setIsLoading({
                    ...isLoading,
                    property: false
                });
            })
            .catch((error: any) => {
                toast(error?.response?.message, {type: 'error'});
            });
    }

    const paypalScriptOptions: PayPalScriptOptions = {
        "client-id": import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
        currency: "CHF",
    };

    function Paypal() {
        /**
         * usePayPalScriptReducer use within PayPalScriptProvider
         * isPending: not finished loading(default state)
         * isResolved: successfully loaded
         * isRejected: failed to load
         */
        const [{isPending}] = usePayPalScriptReducer();
        const paypalTransactionProps: any = {
            createOrder(data: any, actions: {
                order: { create: (arg0: { purchase_units: { amount: { value: string; }; }[]; }) => any; };
            }) {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: pricePackage?.price
                            }
                        }
                    ]
                });
            },
            onApprove(data: any, actions: { order: { capture: (arg0: {}) => Promise<any>; }; }) {
                /**
                 * data: {
                 *   orderID: string;
                 *   payerID: string;
                 *   paymentID: string | null;
                 *   billingToken: string | null;
                 *   facilitatorAccesstoken: string;
                 * }
                 */
                return actions.order.capture({})
                    .then((details) => {
                        console.log(details);
                    });
            }
        };
        return (
            <>
                {isPending ? <h2>Load Smart Payment Button...</h2> : null}
                <div className='relative z-0'>
                    <PayPalButtons {...paypalTransactionProps} />
                </div>
            </>
        );
    }

    const renderProperty = () => {
        return (
            <div
                className="w-full flex flex-col tablet:block sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
                <ToastContainer/>
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-shrink-0 w-full sm:w-40">
                        <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 overflow-hidden">
                            <GallerySlider galleryImgs={galleryImages} uniqueID={'unique_id_checkout_page'}/>
                        </div>
                    </div>
                    <div className="py-5 sm:px-5 space-y-3">
                        <div>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {property?.title}
                            </span>
                            <span className="text-base font-medium mt-1 block line-clamp-1">
                                {property?.location?.address}
                            </span>
                        </div>
                        <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                            {t('addProperty.property.lot.area')}&nbsp;{property?.estateLotArea} m<sup>2</sup> . {t('addProperty.property.floor')}&nbsp;{property?.estateFloorSpace} m<sup>2</sup>
                        </span>
                        <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h3 className="text-2xl font-semibold">{t('price-details')}</h3>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span className='capitalize'>{pricePackage?.name}</span>
                        <span className='text-2xl font-semibold'>
                            <span className='font-medium text-sm mr-1'>{pricePackage?.currency}</span>
                            {pricePackage?.price}
                        </span>
                    </div>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>{t('duration')}</span>
                        <span>{pricePackage?.priceBy}</span>
                    </div>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>{t('additional')}</span>
                        <span>{pricePackage?.priceBy}</span>
                    </div>
                    <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                    <div className="flex justify-between font-semibold">
                        <span className='capitalize'>{t('total')}</span>
                        <span className='text-2xl font-semibold'>
                            <span className='font-medium text-sm mr-1'>{pricePackage?.currency}</span>
                            {pricePackage?.price}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const renderMain = () => {
        return (
            <div
                className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                    {t('confirm-and-pay')}
                </h2>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <div>
                    <div>
                        <h3 className="text-2xl font-semibold">{t('your-subscription')}</h3>
                        <NcModal
                            renderTrigger={(openModal) => (
                                <span
                                    onClick={() => openModal()}
                                    className="block lg:hidden underline  mt-1 cursor-pointer"
                                >
                                    {t('view-details')}
                                </span>
                            )}
                            renderContent={renderProperty}
                            modalTitle="Property Details"
                        />
                    </div>
                    <div
                        className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                    </div>
                </div>

                <div>
                    <div className="flex mb-5">
                        <Checkbox
                            name="Featured"
                            label="Please feature my advertisement on the first page of the search results of my postal code."
                            defaultChecked={true}
                        />
                    </div>

                    <h3 className="text-2xl font-semibold">{t('pay-with')}</h3>
                    <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

                    <div className="mt-6">
                        <PayPalScriptProvider options={paypalScriptOptions}>
                            <Paypal/>
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
            <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
                <div className="hidden lg:block flex-grow">
                    {
                        isLoading.property && isLoading.pricePackage ?
                            <LoadingSpinner className='mt-20' size={20} align='center'/> :
                            renderProperty()
                    }
                </div>
            </main>
        </div>
    );
};

export default CheckOutPage;
