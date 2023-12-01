import React, { useState } from 'react';
import { Popover } from "@headlessui/react";
import NcInfoIcon from "../NcIcon/NcInfoIcon";
import {useTranslation} from "react-i18next";

const VideoInstructionPopup = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover className="relative">
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="dark:bg-gray-800"
            >
                <Popover.Button as="div" className='cursor-pointer'>
                    <NcInfoIcon/>
                </Popover.Button>

                {/* Conditional rendering based on the isOpen state */}
                {isOpen && (
                    <Popover.Panel className="absolute z-10 w-72 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl dark:bg-gray-900">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700">
                            <div className="relative bg-white px-5 py-6 sm:p-8 dark:bg-gray-800">
                                <p className="text-base font-medium text-gray-900 mb-2 dark:text-gray-100">
                                    {t('aad-youtube-video-link')}
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-300">
                                    <li>{t('go-to-youtube')}</li>
                                    <li>{t('click-on-share')}</li>
                                    <li>{t('find-ember-button')}</li>
                                    <li>{t('copy-embed-link')}</li>
                                    <li>{t('paste-youtube-video-link')}</li>
                                </ul>
                            </div>
                        </div>
                    </Popover.Panel>
                )}
            </div>
        </Popover>
    );
};

export default VideoInstructionPopup;