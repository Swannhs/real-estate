import React, {FC, Fragment, useEffect, useState} from "react";
import {Dialog, Popover, Transition} from "@headlessui/react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonThird from "../../shared/Button/ButtonThird";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import Checkbox from "../../shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import {priceFormatter} from "../../utils/convertNumbThousand";
import {useSearchQuery} from "../../common/query";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CurrencyInput from "react-currency-input-field";
import {useStaticData} from "../../hooks/contextApi/StaticDataContext";
import LocationInputSearchResult from "../../components/HeroSearchForm/LocationInputSearchResult";
import NcBellIcon from "../../shared/NcIcon/NcBellIcon";

interface TabFiltersProps {
    handleShowAlertModal?: () => void;
}

const TabFilters: FC<TabFiltersProps> = ({handleShowAlertModal}) => {
    const {
        purpose,
        estateType,
        estateFeatures,
        advertising,
    } = useStaticData();
    let history = useHistory<any>();
    const {t, i18n} = useTranslation();
    const selectedLang: string = i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1);
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
    const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
    const [rangePrices, setRangePrices] = useState<number[]>([0, 10000000]);
    const [rangeRooms, setRangeRooms] = useState<number[]>([0, 20]);
    const [rangeLivingArea, setRangeLivingArea] = useState<number[]>([0, 1000]);
    const [rangeLivingLandArea, setRangeLivingLandArea] = useState<number[]>([0, 1000]);
    const [rangeFloorSpace, setRangeFloorSpace] = useState<number[]>([0, 1000]);
    const [propertyAdsPurposeFilter, setPropertyAdsPurposeFilter] = useState<string[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
    const [filterFeatures, setFilterFeatures] = useState<string[]>([]);
    const [advertisingFilter, setAdvertisingFilter] = useState<string[]>([]);
    const query = useSearchQuery();
    const [searchedAddress, setSearchedAddress] = useState<string>(query.get("loc") ?? '');


    useEffect(() => {
        if (query.get('cat')) {
            setCategoryFilter(query.get('cat')?.split(',') ?? []);
        }
        if (query.get('pur')) {
            setPropertyAdsPurposeFilter(query.get('pur')?.split(',') ?? []);
        }
        if (query.get('filter')) {
            if (query.get('roomStart')) {
                setRangeRooms([parseInt(query.get('roomStart') ?? '0'), parseInt(query.get('roomEnd') ?? '20')]);
            }
            if (query.get('priceStart')) {
                setRangePrices([parseInt(query.get('priceStart') ?? '0'), parseInt(query.get('priceEnd') ?? '10000000')]);
            }
            if (query.get('livingAreaStart')) {
                setRangeLivingArea([parseInt(query.get('livingAreaStart') ?? '0'), parseInt(query.get('livingAreaEnd') ?? '1000')]);
            }
            if (query.get('landAreaStart')) {
                setRangeLivingLandArea([parseInt(query.get('landAreaStart') ?? '0'), parseInt(query.get('landAreaEnd') ?? '1000')]);
            }
            if (query.get('floorSpaceStart')) {
                setRangeFloorSpace([parseInt(query.get('floorSpaceStart') ?? '0'), parseInt(query.get('floorSpaceEnd') ?? '1000')]);
            }
            if (query.get('estateFeatures')) {
                setFilterFeatures(query.get('estateFeatures')?.split(',') ?? []);
            }
            if (query.get('estateAdvertiser')) {
                setAdvertisingFilter(query.get('estateAdvertiser')?.split(',') ?? []);
            }
        }
    }, []);


    const onAddressChangeHandler = (address: string) => {
        setSearchedAddress(address);
    }

    //
    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
    const openModalMoreFilter = () => setisOpenMoreFilter(true);
    //
    const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
    const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

    const onPropertyTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setPropertyAdsPurposeFilter([...propertyAdsPurposeFilter, event.target.value]);
        } else {
            setPropertyAdsPurposeFilter(propertyAdsPurposeFilter.filter((item) => item !== event.target.value));
        }
    }

    const onCategoryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setCategoryFilter([...categoryFilter, event.target.value]);
        } else {
            setCategoryFilter(categoryFilter.filter((item) => item !== event.target.value));
        }
    }

    const onFeaturesChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setFilterFeatures([...filterFeatures, event.target.value]);
        } else {
            setFilterFeatures(filterFeatures.filter(item => item !== event.target.value));
        }
    }

    const onAdvertisingChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setAdvertisingFilter([...advertisingFilter, event.target.value]);
        } else {
            setAdvertisingFilter(advertisingFilter.filter(item => item !== event.target.value));
        }
    }

    const applyFilerHandler = () => {
        history.push({
            pathname: '/search',
            search: `?loc=${searchedAddress}&pur=${propertyAdsPurposeFilter.toString()}&cat=${categoryFilter.toString()}&min=${rangePrices[0]}&max=${rangePrices[1]}` +
                `&filter=true&roomStart=${rangeRooms[0]}&roomEnd=${rangeRooms[1]}&livingAreaStart=${rangeLivingArea[0]}&livingAreaEnd=${rangeLivingArea[1]}` +
                `&lotAreaStart=${rangeLivingLandArea[0]}&lotAreaEnd=${rangeLivingLandArea[1]}&floorSpaceStart=${rangeFloorSpace[0]}&floorSpaceEnd=${rangeFloorSpace[1]}` +
                `&estateAdvertiser=${advertisingFilter.join()}&estateFeatures=${filterFeatures.toString()}&page=1`
        });
    }

    const renderSearchAlertModalButton = () => (
        <button
            className="relative"
            title={t('subscription.search.save-search')}
            onClick={handleShowAlertModal}
        >
            <div className='flex pt-0.5'>
                <div className="flex gap-4 items-center flex-shrink-0">
                    <div
                        className="bg-blue-600 px-3 py-1.5 text-white rounded-md hover:bg-indigo-700 focus:outline-none">
                        <div className='flex'>
                            <div className='flex' aria-label={t('subscription.search.save-search')}>
                                <NcBellIcon/>
                                <p className='hidden xl:block'>{t('subscription.search.save-search')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )

    const renderTabsCategory = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                                open ? "!border-primary-500 " : ""
                            }`}
                        >
                            <span>{t('search.category')}</span>
                            <i className="las la-angle-down ml-2"></i>
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
                                className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {estateType.map((item: any, index: number) => (
                                            <Checkbox
                                                key={index}
                                                name={item.keyword}
                                                label={item["description" + selectedLang]}
                                                subLabel={item["description" + selectedLang]}
                                                value={item.keyword}
                                                defaultChecked={categoryFilter.includes(item.keyword)}
                                                onChange={onCategoryChangeHandler}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                                            {t('Close')}
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                applyFilerHandler();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Apply')}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderTabsPropertyAdsPurpose = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center md:w-28 lg:w-32 px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                                open ? "!border-primary-500 " : ""
                            }`}
                        >
                            <span> {t('search.property')} </span>
                            <i className="las la-angle-down ml-2"></i>
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
                                className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {
                                            purpose?.map((item: any, index: number) => (
                                                <div key={index} className="">
                                                    <Checkbox
                                                        name={item.keyword}
                                                        label={item["description" + selectedLang]}
                                                        subLabel={item["description" + selectedLang]}
                                                        value={item.keyword}
                                                        checked={propertyAdsPurposeFilter.includes(item.keyword)}
                                                        onChange={onPropertyTypeChangeHandler}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                                            {t('Close')}
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                applyFilerHandler();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Apply')}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderTabsPriceRage = () => {
        return (
            <Popover className="relative">
                {({close}) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none `}
                        >
                            <span className='line-clamp-1 tablet:hidden'>
                                {`${priceFormatter(rangePrices[0])} - ${priceFormatter(rangePrices[1])}`}{" "}
                                <span className='font-bold'>CHF</span>
                            </span>
                            <span className='hidden tablet:block'>
                                {t('addProperty.property.price')}
                            </span>
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
                            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-8">
                                        <div className="flex justify-between space-x-5">
                                            <div>
                                                <label
                                                    htmlFor="minPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    Min
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                                                    <div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-neutral-500 sm:text-sm">
                                                          CHF
                                                        </span>
                                                    </div>
                                                    <CurrencyInput
                                                        type="text"
                                                        name="minPrice"
                                                        id="minPrice"
                                                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-12 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900 font-semibold"
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
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    Max
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                                                    <div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-neutral-500 sm:text-sm">
                                                            CHF
                                                        </span>
                                                    </div>
                                                    <CurrencyInput
                                                        type="text"
                                                        name="maxPrice"
                                                        id="maxPrice"
                                                        className="focus:ring-primary-500 focus:border-priring-primary-500 block w-full pl-12 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900 font-semibold"
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
                                        <div className="space-y-5">
                                            <Slider
                                                range
                                                className="text-red-400"
                                                min={0}
                                                max={20000000}
                                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                                allowCross={false}
                                                onChange={(e) => setRangePrices(e as number[])}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                setRangePrices([0, 10000000]);
                                                close();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5">
                                            {t('Clear')}
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                close();
                                                applyFilerHandler();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Apply')}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderFeaturesFilterItem = () => {
        return (
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
                {
                    estateFeatures?.map((feature: any, index: number) => (
                        <Checkbox
                            key={index}
                            name={feature.featuresTitle}
                            label={i18n.language === "en" ? feature.featuresTitle : feature["featuresTitle" + selectedLang]}
                            labelClassName='ml-3.5'
                            value={feature.id}
                            defaultChecked={filterFeatures.includes(feature?.id.toString())}
                            onChange={onFeaturesChangeHandler}
                        />
                    ))
                }
            </div>
        )
    }

    const renderAdvertisingFilterItem = () => {
        return (
            <div className="grid grid-cols-3 md:gap-4 sm:gap-0">
                {
                    advertising?.map((advertise: any) => (
                        <Checkbox
                            key={advertise?.keyword}
                            name={advertise?.keyword}
                            label={advertise?.["description" + selectedLang]}
                            value={advertise?.keyword}
                            defaultChecked={advertisingFilter.includes(advertise?.keyword)}
                            onChange={onAdvertisingChangeHandler}
                        />
                    ))
                }
            </div>
        )
    }

    const renderTabMoreFilter = () => {
        return (
            <div>
                <div
                    className={`flex items-center justify-center px-5 py-2 text-sm rounded-full border focus:outline-none cursor-pointer`}
                    onClick={openModalMoreFilter}
                >
                    <span>{t('Filter')}</span>
                </div>

                <Transition appear show={isOpenMoreFilter} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50 overflow-y-auto"
                        onClose={closeModalMoreFilter}
                    >
                        <div className="min-h-screen text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"/>
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div
                                    className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                                    <div
                                        className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {t('More Filters')}
                                        </Dialog.Title>
                                        <span className="absolute left-3 top-3">
                                            <ButtonClose onClick={closeModalMoreFilter}/>
                                        </span>
                                    </div>

                                    <div className="flex-grow overflow-y-auto">
                                        <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                                            <div className="py-7 grid md:grid-cols-2 sm:grid-flow-col-1 gap-10">
                                                <div>
                                                    <h3 className="text-xl font-medium">
                                                        {t('addProperty.property.rooms')}&nbsp;
                                                        <span className='text-sm'>
                                                            ({rangeRooms[0]} - {rangeRooms[1]})
                                                        </span>
                                                    </h3>
                                                    <div className="mt-6 relative px-1">
                                                        <Slider
                                                            range
                                                            className="text-red-400"
                                                            min={0}
                                                            max={20}
                                                            defaultValue={[rangeRooms[0], rangeRooms[1]]}
                                                            allowCross={false}
                                                            onChange={(range) => setRangeRooms(range as number[])}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-medium">
                                                        {t('addProperty.property.living.space')}&nbsp;
                                                        <span className='text-sm'>
                                                            ({rangeLivingArea[0]} - {rangeLivingArea[1]})
                                                            <sup>
                                                                m<sup>2</sup>
                                                            </sup>
                                                        </span>
                                                    </h3>
                                                    <div className="mt-6 relative px-1">
                                                        <Slider
                                                            range
                                                            className="text-red-400"
                                                            min={0}
                                                            max={1000}
                                                            defaultValue={[rangeLivingArea[0], rangeLivingArea[1]]}
                                                            allowCross={false}
                                                            onChange={(range) => setRangeLivingArea(range as number[])}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-medium">
                                                        {t('addProperty.property.lot.area')}&nbsp;
                                                        <span className='text-sm'>
                                                            ({rangeLivingLandArea[0]} - {rangeLivingLandArea[1]})
                                                            <sup>
                                                                m<sup>2</sup>
                                                            </sup>
                                                        </span>
                                                    </h3>
                                                    <div className="mt-6 relative px-1">
                                                        <Slider
                                                            range
                                                            className="text-red-400"
                                                            min={0}
                                                            max={1000}
                                                            defaultValue={[rangeLivingLandArea[0], rangeLivingLandArea[1]]}
                                                            allowCross={false}
                                                            onChange={(range) => setRangeLivingLandArea(range as number[])}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-medium">
                                                        {t('addProperty.property.floor.space')}&nbsp;
                                                        <span className='text-sm'>
                                                            ({rangeFloorSpace[0]} - {rangeFloorSpace[1]})
                                                            <sup>
                                                                m<sup>2</sup>
                                                            </sup>
                                                        </span>
                                                    </h3>
                                                    <div className="mt-6 relative px-1">
                                                        <Slider
                                                            range
                                                            className="text-red-400"
                                                            min={0}
                                                            max={1000}
                                                            defaultValue={[rangeFloorSpace[0], rangeFloorSpace[1]]}
                                                            allowCross={false}
                                                            onChange={(range) => setRangeFloorSpace(range as number[])}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    {t('addProperty.advertising.as')}
                                                </h3>
                                                <div className="mt-6 relative ">
                                                    {renderAdvertisingFilterItem()}
                                                </div>
                                            </div>
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    {t('addProperty.property.features')}
                                                </h3>
                                                <div className="mt-6 relative ">
                                                    {renderFeaturesFilterItem()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={closeModalMoreFilter}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Close')}
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                closeModalMoreFilter();
                                                applyFilerHandler();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Apply')}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        );
    };

    const renderTabMoreFilterMobile = () => {
        return (
            <div>
                <div
                    className={`flex md:hidden items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer fixed top-32 z-50 right-4 bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-lg`}
                    onClick={openModalMoreFilterMobile}
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                        </svg>
                    </span>
                </div>

                <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50 overflow-y-auto"
                        onClose={closeModalMoreFilterMobile}
                    >
                        <div className="min-h-screen text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"/>
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                className="inline-block py-8 px-2 h-screen w-full max-w-4xl tablet:w-3/4"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div
                                    className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                                    <div
                                        className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {t('More Filter')}
                                        </Dialog.Title>
                                    </div>

                                    <div className="flex-grow overflow-y-auto">
                                        <div
                                            className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                                            <div className="relative flex flex-col space-y-8">
                                                <div className="grid grid-flow-col-1 gap-10 tablet:gap-3">
                                                    <div className='mt-4'>
                                                        <div className='absolute right-0 top-[7%]'>
                                                            {renderSearchAlertModalButton()}
                                                        </div>
                                                        <h3 className="text-xl font-medium tablet:text-sm">
                                                            {t('property-type')}
                                                            <div className='grid grid-cols-3 mt-5 tablet:mt-3'>
                                                                {
                                                                    purpose.map((item: any, index: number) => (
                                                                        <div key={index} className="">
                                                                            <Checkbox
                                                                                name="estateType"
                                                                                label={item["description" + selectedLang]}
                                                                                value={item.keyword}
                                                                                checked={propertyAdsPurposeFilter.includes(item.keyword)}
                                                                                onChange={onPropertyTypeChangeHandler}
                                                                            />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div className='mt-4'>
                                                        <h3 className="text-xl font-medium tablet:text-sm">
                                                            {t('search.category')}&nbsp;
                                                            <div className="grid grid-cols-3 md:gap-4 sm:gap-0 mt-5">
                                                                {
                                                                    advertising?.map((item: any) => (
                                                                        <Checkbox
                                                                            name={item.keyword}
                                                                            label={item["description" + selectedLang]}
                                                                            value={item.keyword}
                                                                            defaultChecked={categoryFilter.includes(item.keyword)}
                                                                            onChange={onCategoryChangeHandler}
                                                                        />
                                                                    ))
                                                                }
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div className="tablet:mt-3">
                                                        <h3 className="text-xl font-medium tablet:text-sm">
                                                            {t('addProperty.property.rooms')}&nbsp;
                                                            <span className='text-sm'>
                                                            ({rangeRooms[0]} - {rangeRooms[1]})
                                                        </span>
                                                        </h3>
                                                        <div className="mt-6 relative px-1">
                                                            <Slider
                                                                range
                                                                className="text-red-400"
                                                                min={0}
                                                                max={20}
                                                                defaultValue={[rangeRooms[0], rangeRooms[1]]}
                                                                allowCross={false}
                                                                onChange={(range) => setRangeRooms(range as number[])}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-medium tablet:text-sm">
                                                            {t('addProperty.property.lot.area')}&nbsp;
                                                            <span className='text-sm'>
                                                            ({rangeLivingArea[0]} - {rangeLivingArea[1]})
                                                            <sup>
                                                                m<sup>2</sup>
                                                            </sup>
                                                        </span>
                                                        </h3>
                                                        <div className="mt-6 relative px-1">
                                                            <Slider
                                                                range
                                                                className="text-red-400"
                                                                min={0}
                                                                max={1000}
                                                                defaultValue={[rangeLivingArea[0], rangeLivingArea[1]]}
                                                                allowCross={false}
                                                                onChange={(range) => setRangeLivingArea(range as number[])}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-medium tablet:text-sm">
                                                            {t('addProperty.property.lot.area')}&nbsp;
                                                            <span className='text-sm'>
                                                            ({rangeLivingLandArea[0]} - {rangeLivingLandArea[1]})
                                                            <sup>
                                                                m<sup>2</sup>
                                                            </sup>
                                                        </span>
                                                        </h3>
                                                        <div className="mt-6 relative px-1">
                                                            <Slider
                                                                range
                                                                className="text-red-400"
                                                                min={0}
                                                                max={1000}
                                                                defaultValue={[rangeLivingLandArea[0], rangeLivingLandArea[1]]}
                                                                allowCross={false}
                                                                onChange={(range) => setRangeLivingLandArea(range as number[])}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-medium tablet:text-sm">
                                                            Floor Space&nbsp;
                                                            <span className='text-sm'>
                                                            ({rangeFloorSpace[0]} - {rangeFloorSpace[1]})
                                                            <sup>
                                                                m<sup>2</sup>
                                                            </sup>
                                                        </span>
                                                        </h3>
                                                        <div className="mt-6 relative px-1">
                                                            <Slider
                                                                range
                                                                className="text-red-400"
                                                                min={0}
                                                                max={1000}
                                                                defaultValue={[rangeFloorSpace[0], rangeFloorSpace[1]]}
                                                                allowCross={false}
                                                                onChange={(range) => setRangeFloorSpace(range as number[])}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between space-x-5">
                                                    <div>
                                                        <label
                                                            htmlFor="minPrice"
                                                            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                        >
                                                            {t('min-price')}
                                                        </label>
                                                        <div className="mt-1 relative rounded-md">
                                                            <div
                                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <span className="text-neutral-500 sm:text-sm">$</span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                name="minPrice"
                                                                disabled
                                                                id="minPrice"
                                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                value={rangePrices[0]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="maxPrice"
                                                            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                        >
                                                            {t('max-price')}
                                                        </label>
                                                        <div className="mt-1 relative rounded-md">
                                                            <div
                                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <span className="text-neutral-500 sm:text-sm">$</span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                disabled
                                                                name="maxPrice"
                                                                id="maxPrice"
                                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                value={rangePrices[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    {t('addProperty.advertising.as')}
                                                </h3>
                                                <div className="mt-6 relative ">
                                                    {renderAdvertisingFilterItem()}
                                                </div>
                                            </div>

                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    {t('addProperty.property.features')}
                                                </h3>
                                                <div className="mt-6 relative ">
                                                    {renderFeaturesFilterItem()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={closeModalMoreFilterMobile}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Close')}
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={() => {
                                                applyFilerHandler();
                                                closeModalMoreFilterMobile();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Apply')}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        );
    };

    return (
        <div>
            <div className='tablet:flex tablet:gap-2 tablet-landscape:flex tablet-landscape:gap-2'>
                <LocationInputSearchResult
                    onChange={onAddressChangeHandler}
                    defaultValue={searchedAddress}
                    onSubmit={applyFilerHandler}
                />
                <div className='hidden tablet:block tablet-landscape:block'>
                    {renderSearchAlertModalButton()}
                </div>
            </div>

            <div className="flex lg:space-x-4">
                <div className="hidden md:flex space-x-4">
                    {renderTabsPropertyAdsPurpose()}
                    {renderTabsCategory()}
                    {renderTabsPriceRage()}
                    {renderTabMoreFilter()}
                    <div className='tablet:hidden tablet-landscape:hidden'>
                        {renderSearchAlertModalButton()}
                    </div>
                </div>
                {renderTabMoreFilterMobile()}
            </div>
        </div>
    );
};

export default TabFilters;
