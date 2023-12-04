import React, {FC, Fragment, useRef, useState} from 'react';
import NcStarIcon from "../../shared/NcIcon/NcStarIcon";
import {Dialog, Transition} from "@headlessui/react";
import Button from "../../shared/Button/Button";
import {activateEstateFeatureApi, removeEstateFeatureApi} from "../../apis/Property";
import {toast} from "react-toastify";

interface BtnFeaturedIconProps {
    className?: string;
    colorClass?: string;
    propertyId: number | string;
    isFeatured?: boolean;
    confirmFeatured?: () => void;
}

const BtnFeaturedIcon: FC<BtnFeaturedIconProps> = ({
                                                       propertyId,
                                                       isFeatured = false,
                                                       className = "",
                                                       colorClass = 'text-white bg-black bg-opacity-30 hover:bg-opacity-50',
                                                       confirmFeatured
                                                   }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const cancelButtonRef = useRef(null);
    const stickerId = 1; // TODO: Need to make it dynamic

    const onOpenHandler = () => {
        setModalOpen(true);
    }

    const onCloseHandler = () => {
        setModalOpen(false);
    }

    const onConfirmHandler = () => {
        if (isFeatured) {
            removeEstateFeatureApi(propertyId, stickerId)
                .then((response: any) => {
                    toast.warning(response?.data?.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                })
                .catch((error: any) => {
                    toast.error(error.response?.data?.message);
                })
                .finally(() => {
                    setModalOpen(false);
                    confirmFeatured && confirmFeatured();
                });
        } else {
            activateEstateFeatureApi(propertyId, stickerId)
                .then((response: any) => {
                    toast.success(response?.data?.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                })
                .catch((error: any) => {
                    toast.error(error.response?.data?.message);
                })
                .finally(() => {
                    setModalOpen(false);
                    confirmFeatured && confirmFeatured();
                });
        }

    }

    return (
        <button
            onClick={onOpenHandler}
            className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${isFeatured ? 'bg-amber-400' : colorClass} ${className}`}>
            <NcStarIcon/>
            <Transition.Root show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onCloseHandler}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 sm:mx-0 sm:h-10 sm:w-10">
                                                <NcStarIcon/>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3"
                                                              className="text-lg font-medium leading-6 text-gray-900">
                                                    {isFeatured ? 'Remove from featured' : 'Add to featured'}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {isFeatured ? 'Are you sure you want to remove this property from featured?' : 'Are you sure you want to add this property to featured?'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Button
                                            className={`${isFeatured ? 'bg-red-600' : 'bg-amber-400'} text-white`}
                                            onClick={onConfirmHandler}
                                        >
                                            {isFeatured ? 'Remove' : 'Feature'}
                                        </Button>
                                        <Button
                                            className='border-2'
                                            onClick={onCloseHandler}>
                                            Close
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </button>
    );
};

export default BtnFeaturedIcon;