import {CheckIcon} from "@heroicons/react/solid";
import React, {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPricePackagesActions} from "../../redux/actions/staticDataActions";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {useTranslation} from "react-i18next";

export interface PageSubcriptionProps {
    className?: string;
}

export interface PriceFeaturesType {
    id: number;
    isActive: boolean;
    isNew: boolean;
    title: string;
}

export interface PricingItemType {
    crossPrice: number;
    currency: string;
    id: number;
    isActive: boolean;
    name: string;
    price: number;
    priceBy: string;
    description: string;
    paymentFeatures: PriceFeaturesType[];
}

const PageSubscription: FC<PageSubcriptionProps> = ({className = ""}) => {
    const dispatch = useDispatch<any>();
    const {t} = useTranslation();
    const {loading, data, success} = useSelector((state: any) => state.static.pricePackages);
    const [pricePackage, setPricePackage] = useState<PricingItemType[]>([]);
    const {propertyId} = useParams<any>();

    useEffect(() => {
        if (success) {
            setPricePackage(data);
            return;
        }
        dispatch(getPricePackagesActions());
    }, [dispatch, success]);

    const renderPricingItem = (pricing: PricingItemType, index: number) => {
        return (
            <div
                key={index}
                className={`h-full relative px-6 py-8 mx-2 rounded-3xl border-2 flex flex-col overflow-hidden ${
                    pricing.name === 'Top'
                        ? "border-primary-500"
                        : "border-neutral-100 dark:border-neutral-700"
                }`}
            >
                {pricing.name === 'Top' && (
                    <span
                        className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
                        {pricing.name}
                    </span>
                )}
                <div className="mb-8">
                    <h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
                        {pricing.name}
                    </h3>
                    <h2 className="text-5xl leading-none flex items-center text-neutral-900 dark:text-neutral-300">
                        <span className='text-sm font-black mt-5 pr-2 text-slate-500'>CHF</span>
                        <span>{pricing.price}</span>
                        <span className="text-lg ml-1 font-normal text-neutral-500">
                            /{pricing.priceBy}
                        </span>
                    </h2>
                </div>
                <nav className="space-y-4 mb-8">
                    {pricing.paymentFeatures.map((item, index) => (
                        <li className="flex items-center" key={index}>
                            <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                                <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                            </span>
                            <span className="text-neutral-700 dark:text-neutral-300">
                                {item.title}
                            </span>
                        </li>
                    ))}
                </nav>
                <div className="flex flex-col mt-auto">
                    {pricing.name === 'Top' ? (
                        <Link
                            className='border-2 rounded-3xl py-2.5 text-center disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50'
                            to={`/checkout?property=${propertyId}&package=${pricing.id}`}>
                            {t('subscription.page.proceed')}
                        </Link>
                    ) : (
                        <Link
                            className='border-2 rounded-3xl py-2.5 text-center font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            to={`/checkout?property=${propertyId}&package=${pricing.id}`}>
                            <span className="font-medium">
                                {t('subscription.page.proceed')}
                            </span>
                        </Link>
                    )}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                        {pricing.description}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-PageSubcription container pb-24 lg:pb-32 ${className}`}
            data-nc-id="PageSubcription"
        >
            <header className="text-center max-w-2xl mx-auto my-20">
                <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    <span className="mr-4 text-3xl md:text-4xl leading-none">💎</span>
                    {t("subscription.page.title")}
                </h2>
                <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                    {t('subscription.page.description')}
                </span>
            </header>
            {
                loading ? <LoadingSpinner size={20} align='center'/> : (
                    <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
                        <div className="grid lg:grid-cols-4 tablet:grid-cols-2 gap-5 sm:gap-0 xl:gap-8 tablet:gap-y-5">
                            {pricePackage.map(renderPricingItem)}
                        </div>
                    </section>
                )
            }
        </div>
    );
};

export default PageSubscription;
