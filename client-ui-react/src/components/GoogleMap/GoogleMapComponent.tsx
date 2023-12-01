import React, {FC, Fragment, useEffect, useState} from 'react';
import {Transition} from "@headlessui/react";
import StayCardGoogle from "./StayCardGoogle";

export interface GoogleMapComponentProps {
    isSelected: boolean;
    className?: string;
    listing?: any;
    lat: number;
    lng: number;
}

const GoogleMapComponent: FC<GoogleMapComponentProps> = ({isSelected, listing, className = ''}) => {
    const [selectedHover, setSelectedHover] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(selectedHover);
    }, [selectedHover]);

    useEffect(() => {
        setSelectedHover(false);
        setTimeout(() => {
            setSelectedHover(isSelected);
        }, 700);
    }, [isSelected]);

    return (
        <div
            className={`nc-AnyReactComponent relative  ${className}`}
            data-nc-id="AnyReactComponent"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <span
                className={`cursor-pointer flex px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 text-sm font-semibold items-center justify-center min-w-max shadow-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors ${
                    selectedHover
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : ""
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
            </span>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute z-50 bottom-full pb-3 -left-12 w-[260px] aspect-w-1">
                    {listing && (
                        <StayCardGoogle size="small" data={listing} className="shadow-2xl"/>
                    )}
                </div>
            </Transition>
        </div>
    );
};

export default GoogleMapComponent;
