import {Popover, Transition} from "@headlessui/react";
import {
    BellIcon,
    HeartIcon,
    LogoutIcon,
    UserCircleIcon
} from "@heroicons/react/outline";
import {FC, Fragment, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import i18n from "../../i18n";
import {useTranslation} from "react-i18next";
import {initialAuthState, useAuth} from "../../hooks/contextApi/AuthContext";
import EstateAvatar from "../../shared/Avatar/EstateAvatar";

interface avatarDropdownIn {
    username?: string;
}

const solutions = [
    {
        name: "Account",
        href: "/account",
        icon: UserCircleIcon,
    },
    {
        name: "Wishlists",
        href: "/wishlist",
        icon: HeartIcon,
    },
    {
        name: "Search Alert",
        href: "/search-alert",
        icon: BellIcon
    }
];

const AvatarDropdown:FC<avatarDropdownIn> = ({username = ""}) => {
    const history = useHistory();
    const {setAuthState} = useAuth();
    const {t} = useTranslation();
    const [dropdownMenu, setDropdownMenu] = useState(solutions);

    useEffect(() => {
        setDropdownMenu([
            {
                name: t("avatar.dropdown.account"),
                href: "/account",
                icon: UserCircleIcon,
            },
            {
                name: t("avatar.dropdown.wishlist"),
                href: "/wishlist",
                icon: HeartIcon,
            },
            {
                name: t("avatar.dropdown.search.alert"),
                href: "/search-alert",
                icon: BellIcon
            }
        ])
    }, [i18n.language]);

    const onLogoutHandler = () => {
        if (setAuthState) {
            setAuthState({
                ...initialAuthState,
                logout: true
            });
        }
    }

    return (
        <div className="AvatarDropdown">
            <Popover className="relative">
                {() => (
                    <>
                        <Popover.Button
                            className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <EstateAvatar username={username} sizeClass="w-8 h-8 sm:w-9 sm:h-9"/>
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
                                className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
                                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                                        {dropdownMenu.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={item.href}
                                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <item.icon aria-hidden="true" className="w-6 h-6"/>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium ">{item.name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700"/>
                                    <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                                        <button
                                            onClick={onLogoutHandler}
                                            className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
                                            <div
                                                className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                <LogoutIcon aria-hidden="true" className="w-6 h-6"/>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium ">
                                                    {t("avatar.dropdown.logout")}
                                                </p>
                                            </div>
                                        </button>
                                        {/*{solutionsFoot.map((item, index) => (*/}
                                        {/*    <a*/}
                                        {/*        key={index}*/}
                                        {/*        href={item.href}*/}
                                        {/*        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"*/}
                                        {/*    >*/}
                                        {/*        <div*/}
                                        {/*            className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">*/}
                                        {/*            <item.icon aria-hidden="true" className="w-6 h-6"/>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="ml-4">*/}
                                        {/*            <p className="text-sm font-medium ">{item.name}</p>*/}
                                        {/*        </div>*/}
                                        {/*    </a>*/}
                                        {/*))}*/}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}

export default AvatarDropdown;
