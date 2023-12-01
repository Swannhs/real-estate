import {Dialog, Tab, Transition} from "@headlessui/react";
import {SearchIcon} from "@heroicons/react/outline";
import {XIcon} from "@heroicons/react/solid";
import React, {Fragment, useEffect, useState} from "react";
import ButtonSubmit from "./ButtonSubmit";
import StaySearchForm from "./StaySearchForm";
import {useTimeoutFn} from "react-use";
import {PropertySelectType} from "../HeroSearchForm/RealEstateSearchForm";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getStaticCategoryDataActions} from "../../redux/actions/staticDataActions";

const HeroSearchForm2Mobile = () => {
    const dispatch = useDispatch<any>();
    const {data, success} = useSelector((state: any) => state.static.categoryStaticData);
    const [showModal, setShowModal] = useState(false);
    let history = useHistory<any>();
    const [locationInputValue, setLocationInputValue] = useState("");
    const [category, setCategory] = useState<PropertySelectType[]>([]);
    const [purpose, setPurpose] = useState<string | string[]>("RENT");
    const [rangePrices, setRangePrices] = useState([0, 1000000]);
    const [showDialog, setShowDialog] = useState(false);
    let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
    let selectedCategories: number | string[] = [];

    useEffect(() => {
        if (!success) {
            dispatch(getStaticCategoryDataActions());
        } else {
            for (let i = 0; i < data?.length; i++) {
                let item = data[i];
                if (item?.estateCategoryTypeName) {
                    setCategory((prev) => [...prev, {
                        name: item?.estateCategoryTypeName,
                        description: item?.estateCategoryTypeDescription,
                        value: item?.id,
                    }]);
                }
            }
        }
    }, [success]);

    const onLocationChangeHandler = (value: string) => {
        setLocationInputValue(value);
    }

    const onTypeOfPropertyChange = (selectedTypes: number | string[]) => {
        selectedCategories = selectedTypes;
    }

    const onPurposeChange = (selectedPurpose: string | string[]) => {
        setPurpose(selectedPurpose);
    }

    const onPriceChange = (value: number[]) => {
        setRangePrices(value);
    }

    function closeModal() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    const renderButtonOpenModal = () => {
        return (
            <div className="md:hidden max-w-lg !mx-auto md:px-3 w-full px-4 absolute top-32 z-10">
                <button
                    onClick={openModal}
                    className="relative flex items-center w-full border border-neutral-200 dark:border-neutral-6000 px-4 py-2 pr-11 rounded-full shadow-lg bg-slate-50 dark:bg-neutral-700"
                >
                    <SearchIcon className="flex-shrink-0 w-5 h-5"/>

                    <div className="ml-3 flex-1 text-left overflow-hidden">
                        <span className="block font-medium text-sm">Location</span>
                        <span
                            className="block mt-0.5 text-xs font-light text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            Find your best places
                        </span>
                    </div>

                    <span
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
                        <svg
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            className="block w-4 h-4"
                            fill="currentColor"
                        >
                        <path
                            d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        );
    };

    const onSubmitHandler = () => {
        history.push({
            pathname: '/search',
            search: `?loc=${locationInputValue}&pur=${purpose}&cat=${selectedCategories}&min=${rangePrices[0]}&max=${rangePrices[1]}&page=1`,
        });
    }

    return (
        <div className="HeroSearchForm2Mobile">
            {renderButtonOpenModal()}
            <Transition appear show={showModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="HeroSearchFormMobile__Dialog relative z-max"
                    onClose={closeModal}
                >
                    <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex h-full">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out transition-transform"
                                enterFrom="opacity-0 translate-y-52"
                                enterTo="opacity-100 translate-y-0"
                                leave="ease-in transition-transform"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-52"
                            >
                                <Dialog.Panel
                                    className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                                    {showDialog && (
                                        <Tab.Group manual>
                                            <div className="absolute left-4 top-4">
                                                <button className="" onClick={closeModal}>
                                                    <XIcon className="w-5 h-5 text-black dark:text-white"/>
                                                </button>
                                            </div>

                                            <div className="flex-1 pt-3 px-1 flex overflow-hidden">
                                                <Tab.Panels className="flex-1 overflow-y-auto py-4">
                                                    <Tab.Panel>
                                                        <div
                                                            className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                                                            {/*<StaySearchForm*/}
                                                            {/*    locationInputValue={locationInputValue}*/}
                                                            {/*    category={category}*/}
                                                            {/*    purpose={purpose}*/}
                                                            {/*    onLocationChange={onLocationChangeHandler}*/}
                                                            {/*    onPurposeChange={onPurposeChange}*/}
                                                            {/*    onTypeOfPropertyChange={onTypeOfPropertyChange}*/}
                                                            {/*    onPriceChange={onPriceChange}*/}
                                                            {/*/>*/}
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </div>
                                            <div
                                                className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                                                <button
                                                    type="button"
                                                    className="font-semibold flex-shrink-0"
                                                    onClick={() => {
                                                        setShowDialog(false);
                                                        resetIsShowingDialog();
                                                    }}
                                                >
                                                    Clear all
                                                </button>
                                                <ButtonSubmit
                                                    onClick={() => {
                                                        onSubmitHandler();
                                                    }}
                                                />
                                            </div>
                                        </Tab.Group>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default HeroSearchForm2Mobile;
