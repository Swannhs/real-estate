import React, {FC, Fragment, useEffect, useState} from "react";
import {Popover, Transition} from "@headlessui/react";
import Slider from "rc-slider";
import convertNumbThousand from "../../utils/convertNumbThousand";
import ButtonSubmit from "./ButtonSubmit";
import CurrencyInput from "react-currency-input-field";
import {useTranslation} from "react-i18next";

export interface PriceRangeInputProps {
    onChange?: (data: any) => void;
    fieldClassName?: string;
    className?: string;
    priceRangeTitle?: string;
}

const PriceRangeInput: FC<PriceRangeInputProps> = ({
                                                       onChange,
                                                       fieldClassName = "[ nc-hero-field-padding ]",
                                                       className = "",
                                                       priceRangeTitle = "Price Range",
                                                   }) => {
    const {t} = useTranslation();
    const [rangePrices, setRangePrices] = useState<number[]>([0, 10000000]);

    useEffect(() => {
        onChange && onChange(rangePrices);
    }, [rangePrices]);

    const convertPrice = (price: number) => {
        if (price < 1000) {
            return price.toString();
        }
        if (price < 1000000) {
            return convertNumbThousand(price / 1000).toString() + "k";
        } else {
            return convertNumbThousand(price / 1000000).toString() + "M";
        }
    }

    const onSliderChange = (value: number | number[]) => {
        setRangePrices(value as number[])
    }

    return (
        <Popover className="flex relative flex-[1.3]">
            {({open}) => (
                <>
                    <div
                        className={`flex-1 flex items-center focus:outline-none cursor-pointer ${
                            open ? "nc-hero-field-focused" : ""
                        }`}
                    >
                        <Popover.Button
                            className={`flex-1 flex text-left items-center focus:outline-none ${fieldClassName} space-x-3 ${className}`}
                            onClick={() => document.querySelector("html")?.click()}
                        >
                            <div className="text-neutral-300 dark:text-neutral-400">
                                <span title={t('price')}>
                                    <svg
                                        className="nc-icon-field nc-icon-field-2"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="7.25"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                        ></circle>
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"
                                        ></path>
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M12 7.75V8.25"
                                        ></path>
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M12 15.75V16.25"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="flex-grow">
                                <span className="block xl:text-lg font-semibold truncate">
                                    {`${convertPrice(rangePrices[0])} ~ ${convertPrice(rangePrices[1])}`}
                                </span>
                                <span
                                    className="block mt-1 text-sm text-neutral-400 leading-none font-light overflow-hidden">
                                    {priceRangeTitle}
                                </span>
                            </div>
                        </Popover.Button>

                        {/* BUTTON SUBMIT OF FORM */}
                        <div className="pr-2 xl:pr-4">
                            <ButtonSubmit type='submit'/>
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className="absolute right-0 lg:right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 border-3 sm:px-8 rounded-3xl shadow-xl">
                            <div className="relative flex flex-col space-y-8">
                                <div className="space-y-5">
                                    <span className="font-medium">{priceRangeTitle}</span>
                                    <Slider
                                        range
                                        className="text-red-400"
                                        min={0}
                                        max={10000000}
                                        defaultValue={[rangePrices[0], rangePrices[1]]}
                                        allowCross={false}
                                        onChange={(e: number | number[]) => {
                                            onSliderChange(e)
                                        }}
                                    />
                                </div>

                                <div className="flex justify-between space-x-3">
                                    <div>
                                        <label
                                            htmlFor="minPrice"
                                            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center"
                                        >
                                            Min
                                        </label>
                                        <div className="mt-1 relative rounded-md">
                                            <div
                                                className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <span className="text-neutral-500 text-xs">CHF</span>
                                            </div>
                                            <CurrencyInput
                                                type="text"
                                                name="minPrice"
                                                id="minPrice"
                                                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900 font-semibold"
                                                onValueChange={(value) => {
                                                    setRangePrices([value ? Number(value) : 0, rangePrices[1]])
                                                }}
                                                minLength={0}
                                                maxLength={7}
                                                decimalScale={0}
                                                value={rangePrices[0] as number}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="maxPrice"
                                            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center"
                                        >
                                            Max
                                        </label>
                                        <div className="mt-1 relative rounded-md">
                                            <div
                                                className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <span className="text-neutral-500 text-xs">CHF</span>
                                            </div>
                                            <CurrencyInput
                                                type="text"
                                                name="maxPrice"
                                                id="maxPrice"
                                                className="focus:ring-primary-500 focus:border-priring-primary-500 block w-full pl-10 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900 font-semibold"
                                                onValueChange={(value) => {
                                                    setRangePrices([rangePrices[0], value ? Number(value) : 0])
                                                }}
                                                minLength={0}
                                                maxLength={8}
                                                decimalScale={0}
                                                value={rangePrices[1] as number}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default PriceRangeInput;
