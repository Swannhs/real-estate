import React, {useEffect, useState} from "react";
import {MoonIcon} from "@heroicons/react/solid";
import {SunIcon} from "@heroicons/react/outline";
import {useTranslation} from "react-i18next";

export interface SwitchDarkModeProps {
    className?: string;
}

const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({className = ""}) => {
    const {t} = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            toDark();
        } else {
            toLight();
        }
    }, []);

    const toDark = () => {
        setIsDarkMode(true);
        const root = document.querySelector("html");
        if (!root) return;
        !root.classList.contains("dark") && root.classList.add("dark");
        localStorage.theme = "dark";
    };

    const toLight = () => {
        setIsDarkMode(false);
        const root = document.querySelector("html");
        if (!root) return;
        root.classList.remove("dark");
        localStorage.theme = "light";
    };

    function _toogleDarkMode() {
        if (localStorage.theme === "light") {
            toDark();
        } else {
            toLight();
        }
    }

    return (
        <button
            onClick={_toogleDarkMode}
            className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
        >
            <span className="sr-only">Enable dark mode</span>
            {isDarkMode ? (
                <span title={t('enable-light-mode')}>
                    <MoonIcon className="w-7 h-7" aria-hidden="true"/>
                </span>
            ) : (
                <span title={t('enable-dark-mode')}>
                    <SunIcon className="w-7 h-7" aria-hidden="true"/>
                </span>
            )}
        </button>
    );
};

export default SwitchDarkMode;
