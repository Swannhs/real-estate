import React, {FC, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {useAuth} from "../../hooks/contextApi/AuthContext";

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = () => {
    const {t} = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const {isSuperUser} = useAuth();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const renderSuperUserLinks = () => (
        <>
            <NavLink
                activeClassName="border-b-[2px] border-green-400 w-full block"
                to="/admin/privacy-policy"
                className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
            >
                Privacy Policy
            </NavLink>
            <NavLink
                activeClassName="border-b-[2px] border-green-400 w-full block"
                to="/admin/cookie-policy"
                className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
            >
                Cookie Policy
            </NavLink>
            <NavLink
                activeClassName="border-b-[2px] border-green-400 w-full block"
                to="/admin/manage-users"
                className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
            >
                Manage Users
            </NavLink>
            <NavLink
                activeClassName="border-b-[2px] border-green-400 w-full block"
                to="/admin/payment-setting"
                className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
            >
                Payment Setting
            </NavLink>
        </>
    )

    return (
        <div
            className={`border-r pt-12 bg-neutral-50 dark:bg-neutral-900 transition-width duration-300 ease-in-out flex flex-col items-start ${isCollapsed ? 'w-16' : 'w-64'}`}
            style={{transition: 'width 0.3s ease-in-out'}}
        >
            <button
                onClick={toggleCollapse}
                className="p-2 mb-4 bg-white rounded-full shadow-lg focus:outline-none ml-4 mt-2"
                aria-label="Toggle Sidebar"
            >
                {isCollapsed ? <ChevronRightIcon className="h-6 w-6"/> : <ChevronLeftIcon className="h-6 w-6"/>}
            </button>
            <div className="flex flex-col items-start overflow-x-hidden px-4 w-full">
                {!isCollapsed && (
                    <>
                        <NavLink
                            activeClassName="border-b-[2px] border-green-400 w-full block"
                            to="/account"
                            className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
                        >
                            {t('account.page.account.info')}
                        </NavLink>
                        <NavLink
                            activeClassName="border-b-[2px] border-green-400 w-full block"
                            to="/account-properties"
                            className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
                        >
                            {t('account.page.property.list')}
                        </NavLink>
                        <NavLink
                            activeClassName="border-b-[2px] border-green-400 w-full block"
                            to="/wishlist"
                            className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
                        >
                            {t('account.page.wishlist')}
                        </NavLink>
                        <NavLink
                            activeClassName="border-b-[2px] border-green-400 w-full block"
                            to="/search-alert"
                            className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
                        >
                            {t('search.alerts')}
                        </NavLink>
                        <NavLink
                            activeClassName="border-b-[2px] border-green-400 w-full block"
                            to="/account-password"
                            className="text-neutral-900 font-semibold my-1 dark:text-neutral-100 py-2 px-4 mb-2 hover:border-b-[2px] hover:border-green-300 transition-colors duration-200 whitespace-nowrap w-full block"
                        >
                            {t('account.page.change.password')}
                        </NavLink>
                        {isSuperUser && renderSuperUserLinks()}
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
