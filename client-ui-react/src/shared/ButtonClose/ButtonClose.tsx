import React from "react";
import {XIcon} from "@heroicons/react/solid";
import twFocusClass from "../../utils/twFocusClass";
import {useTranslation} from "react-i18next";

export interface ButtonCloseProps {
    className?: string;
    size?: 2 | 5 | 10;
    onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
                                                     className = "",
                                                     size = 5,
                                                     onClick = () => {
                                                     },
                                                 }) => {
    const {t} = useTranslation();
    return (
        <button
            className={
                `w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${className} ` +
                twFocusClass()
            }
            onClick={onClick}
        >
            <span className="sr-only">{t('Close')}</span>
            <XIcon className={`w-${size} h-${size}`}/>
        </button>
    );
};

export default ButtonClose;
