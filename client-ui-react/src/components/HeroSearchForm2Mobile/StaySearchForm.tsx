import {FC, Fragment, useState} from "react";
import LocationInput from "./LocationInput";
import PropertyTypeSelect from "../HeroSearchForm/PropertyTypeSelect";
import {Popover, Transition} from "@headlessui/react";
import Slider from "rc-slider";
import {useTranslation} from "react-i18next";
import {useStaticData} from "../../hooks/contextApi/StaticDataContext";
import { StaticDataType } from "../../types";

export interface RealEstateSearchFormProps {
    locationInputValue: string;
    category: StaticDataType[];
    purpose: StaticDataType[];
    onLocationChange?: (value: string) => void;
    onTypeOfPropertyChange: (selectedTypes: number | string[]) => void;
    onPurposeChange: (value: string | string[]) => void;
    onPriceChange: (value: number[]) => void;
}

const StaySearchForm: FC<RealEstateSearchFormProps> = ({
                                                           category,
                                                           onLocationChange,
                                                           onTypeOfPropertyChange,
                                                           onPurposeChange,
                                                           onPriceChange
                                                       }) => {
    const [fieldNameShow, setFieldNameShow] = useState<"location" | "dates" | "guests">("location");
    const [rangePrices, setRangePrices] = useState([0, 1000000]);
    const {t, i18n} = useTranslation();
    const selectedLang: string = i18n.language.charAt(0).toUpperCase()+i18n.language.slice(1);
    const {estateType, purpose} = useStaticData();
    
    const renderInputLocation = () => {
        const isActive = fieldNameShow === "location";
        return (
            <div
                className={`w-full bg-white dark:bg-neutral-800 ${
                    isActive
                        ? "rounded-2xl shadow-lg"
                        : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
                }`}
            >
                {!isActive ? (
                    <button
                        className={`w-full flex justify-between text-sm font-medium p-4`}
                        onClick={() => setFieldNameShow("location")}
                    >
                        <span className="text-neutral-400">Where</span>
                    </button>
                ) : (
                    <LocationInput
                        onChange={(value) => {
                            onLocationChange && onLocationChange(value);
                        }}
                    />
                )}
            </div>
        );
    };

    const renderPropertyType = () => (
        <div
            className='w-full bg-white dark:bg-neutral-800 rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'>
            <div className='w-full flex justify-between text-sm font-medium'>
                <PropertyTypeSelect
                    lang={selectedLang}
                    name='Property type'
                    textStyle='text-sm font-medium text-neutral-400'
                    fieldClassName='py-4 px-1'
                    items={purpose}
                    itemInputFieldName="estateType"
                    defaultValue=""
                    onChange={onPurposeChange}
                />
            </div>
        </div>
    );

    const renderCategoryType = () => (
        <div
            className='w-full bg-white dark:bg-neutral-800 rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'>
            <div className='w-full flex justify-between text-sm font-medium'>
                <PropertyTypeSelect
                    lang={selectedLang}
                    name='Category type' textStyle='text-sm font-medium text-neutral-400'
                    fieldClassName='py-4 px-1' 
                    items={estateType}
                    itemInputFieldName="categoryType"
                    onChange={onTypeOfPropertyChange}/>
            </div>
        </div>
    );

    const renderPriceRange = () => (
        <div
            className='w-full bg-white dark:bg-neutral-800 rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'>
            <div className='w-full flex justify-between text-sm font-medium'>
                <Popover className="flex relative flex-1">
                    {({open}) => (
                        <>
                            <Popover.Button
                                className={`flex text-left w-full flex-shrink-0 items-center space-x-3 focus:outline-none cursor-pointer py-4 px-1 ${
                                    open ? "nc-hero-field-focused" : ""
                                }`}
                                onClick={() => document.querySelector("html")?.click()}
                            >
                                <div className="flex-1">
                            <span className="text-sm font-medium text-neutral-400">
                                <span className="line-clamp-1 ml-3">
                                    Price range
                                </span>
                            </span>
                                </div>
                            </Popover.Button>
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
                                    className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
                                    <div className="">
                                        <div className="relative flex flex-col space-y-5">
                                            <Slider
                                                range
                                                className="text-red-400"
                                                min={0}
                                                max={1000000}
                                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                                allowCross={false}
                                                onChange={(e) => {
                                                    setRangePrices(e as number[])
                                                    onPriceChange(e as number[])
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-5">
                                        <div>
                                            <label
                                                htmlFor="minPrice"
                                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                            >
                                                Min price
                                            </label>
                                            <div className="mt-1 relative rounded-md">
                                                <div
                                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              CHF
                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="minPrice"
                                                    disabled
                                                    id="minPrice"
                                                    className="ml-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                    value={rangePrices[0]}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="maxPrice"
                                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                            >
                                                Max price
                                            </label>
                                            <div className="mt-1 relative rounded-md">
                                                <div
                                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              CHF
                            </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    disabled
                                                    name="maxPrice"
                                                    id="maxPrice"
                                                    className="ml-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                    value={rangePrices[1]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </div>
    );

    return (
        <div>
            <div className="w-full space-y-5 mt-5">
                {renderInputLocation()}
                {renderPropertyType()}
                {renderCategoryType()}
                {renderPriceRange()}
            </div>
        </div>
    );
};

export default StaySearchForm;
