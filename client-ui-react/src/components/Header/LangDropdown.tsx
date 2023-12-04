import {Popover, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {GlobeAltIcon} from "@heroicons/react/outline";
import React, {FC, Fragment, useEffect, useState} from "react";
import i18n from "../../i18n";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setLanguageActions} from "../../redux/actions/langActions";
import {getLanguagesApi} from "../../apis/StaticData";

interface LanguageType {
    name: string;
    value: string;
}

interface LangDropdownProps {
    panelClassName?: string;
}

const LangDropdown: FC<LangDropdownProps> = ({panelClassName = "z-10 w-screen max-w-[70px] px-4 mt-3 right-0 sm:px-0"}) => {
    const dispatch = useDispatch<any>();
    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const {t} = useTranslation();

    useEffect(() => {
        fetchLanguages();
    }, []);

    const onLanguageChangeHandler = (lang: LanguageType) => {
        i18n.changeLanguage(lang.value);
        setCurrentLanguage(lang.name);
        dispatch(setLanguageActions(lang.value));
        localStorage.setItem('language', lang.value);
    }

    const fetchLanguages = () => {
        getLanguagesApi()
            .then(response => {
                setLanguages(response.data);
                if (localStorage.getItem('language')) {
                    setCurrentLanguage(response.data?.find((lang: { value: string | null; }) => lang.value === localStorage.getItem('language'))?.name);
                }
            })
            .catch(() => {
                setLanguages([]);
            })
    }

    return (
        <div className="LangDropdown">
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <Popover.Button
                            className={`${open ? "" : "text-opacity-80"} group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <div className='flex'>
                                <div title={t('account.account.info.page.language')}>
                                    <GlobeAltIcon className="w-[30px] h-[22px] opacity-80"/>
                                </div>
                                <span className='tablet:hidden'>{currentLanguage}</span>
                            </div>

                            <span className="ml-2 md:hidden">{t('Language')}</span>
                            <ChevronDownIcon
                                className={`${open ? "-rotate-180" : "text-opacity-70"} ml-2 tablet:ml-0 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                            />
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
                            <Popover.Panel className={`absolute left-4 rounded-2xl ${panelClassName}`}>
                                <div className="shadow-lg ring-1 ring-black ring-opacity-5 [width:108px]">
                                    <div
                                        className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 lg:grid-cols-1">
                                        {languages?.map((language, index) => (
                                            <li
                                                key={index}
                                                onClick={() => close()}
                                                className={`flex items-center p-2 -m-3 transition ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                                                    language.value === currentLanguage
                                                        ? "bg-gray-100 dark:bg-neutral-700"
                                                        : "opacity-80"
                                                }`}
                                            >
                                                <div className="cursor-pointer"
                                                     onClick={() => onLanguageChangeHandler(language)}>
                                                    <p className="text-sm font-medium ">{language?.name}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};
export default LangDropdown;
