import React, {FC, Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";

export interface ModalCustomProps {
    title?: string;
    open: boolean;
    onClose: () => void;
    children?: any;
    allowFooter?: boolean;
    onClickedApply?: () => void;
    onClickedClose?: () => void;
    modalStyleClass?: string;
    closeButtonLabel?: string;
    saveButtonLabel?: string;
}

const ModalCustom: FC<ModalCustomProps> = ({
                                               title = "",
                                               open,
                                               children,
                                               onClose,
                                               modalStyleClass = "inline-block py-8 px-2 h-screen w-full max-w-4xl",
                                               allowFooter = false,
                                               onClickedApply,
                                               onClickedClose,
                                               closeButtonLabel = "Close",
                                               saveButtonLabel = "Save",
                                           }) => {

    const renderFooter = () => {
        if (!allowFooter) return null;

        return (
            <div className="flex justify-end pt-4 pr-4 border-t border-neutral-200 dark:border-neutral-800">
                {onClickedClose && (
                    <button
                        onClick={onClickedClose}
                        className="mr-4 px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {closeButtonLabel}
                    </button>
                )}
                {onClickedApply && (
                    <button
                        onClick={onClickedApply}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {saveButtonLabel}
                    </button>
                )}
            </div>
        );
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={onClose}
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

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        className={modalStyleClass}
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
                                    {title}
                                </Dialog.Title>
                            </div>

                            <Dialog.Description>
                                {children}
                            </Dialog.Description>

                            {renderFooter()}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalCustom;
