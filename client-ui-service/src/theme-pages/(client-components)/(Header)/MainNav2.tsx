"use-client";

import React, {FC} from "react";
import Logo from "@/shared/Logo";
import Link from "next/link";
import MenuBar from "@/shared/MenuBar";
import AvatarDropdown from "@/theme-pages/(client-components)/(Header)/AvatarDropdown";
import LangDropdown from "@/theme-pages/(client-components)/(Header)/LangDropdown";
import SwitchDarkMode from "@/shared/SwitchDarkMode";

export interface MainNav2Props {
    className?: string;
}

const MainNav2: FC<MainNav2Props> = ({className = ""}) => {
    // const {isAuthenticated} = useAuth();
    // const location = useLocation();
    // const [username, setUserName] = React.useState<string>('');

    // useEffect(() => {
    //     if(isAuthenticated){
    //         getUserInfoApi()
    //           .then(({data}: { data: UserDetailsInterface }) => {
    //               setUserName(data.userName);
    //           })
    //           .catch((error: any) => {
    //               toast.error(error?.response?.data?.message);
    //           })
    //     }
    // }, [isAuthenticated]);

    return (
        <div className={`nc-MainNav1 nc-MainNav2 relative z-10 ${className}`}>
            <div
                className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center mobile:p-0 mobile:flex-col">
                <div
                    className="hidden md:flex justify-start flex-1 items-center space-x-3 sm:space-x-8 lg:space-x-10">
                    <div className=''>
                        <Logo/>
                    </div>
                    <div className="hidden md:block">
                        <ul className='flex justify-between'>
                            <li className="inline-block">
                                <Link
                                    href='/'
                                    className="text-opacity-90 group px-4 py-2 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Home
                                </Link>
                            </li>
                            <li className="inline-block">
                                <Link
                                    href='/contact'
                                    className="text-opacity-90 group px-4 py-2 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Contact Us
                                </Link>
                            </li>
                            {/*{*/}
                            {/*    !isAuthenticated && (*/}
                            {/*        <li className="inline-block">*/}
                            {/*            <Link*/}
                            {/*                href='/wish-list'*/}
                            {/*                className="text-opacity-90 px-4 group py-2 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">*/}
                            {/*                {t('wish-list')}*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*    )*/}
                            {/*}*/}
                            {/*<li className="inline-block">*/}
                            {/*    <Link*/}
                            {/*        href="/blog"*/}
                            {/*        className="text-opacity-90 group px-4 py-2 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"*/}
                            {/*    >*/}
                            {/*        {t('Blog')}*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>

                <div
                    className="hidden md:flex flex-shrink-0 items-center justify-end lg:flex-none text-neutral-700 dark:text-neutral-100">
                    <div className="hidden items-center md:flex space-x-1 tablet:space-x-0">
                        {/*{*/}
                        {/*    isAuthenticated ? (*/}
                        {/*        <button className="p-0">*/}
                        {/*            <Link*/}
                        {/*                className='bg-white dark:bg-slate-800 w-[140px] tablet:w-[108px] py-2 rounded-2xl text-opacity-90 group border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 tablet:py-1 tablet:rounded-xl'*/}
                        {/*                href='/add/property'>*/}
                        {/*                <span className="mx-auto">{t('Submit Ad')}</span>*/}
                        {/*            </Link>*/}
                        {/*        </button>*/}
                        {/*    ) : (*/}
                        {/*        <button className="p-0">*/}
                        {/*            <Link*/}
                        {/*                className='bg-white dark:bg-slate-800 w-[140px] tablet:w-[108px] py-2 rounded-2xl text-opacity-90 group border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 tablet:py-1 tablet:rounded-xl'*/}
                        {/*                href='/login'>*/}
                        {/*                <span className="mx-auto">{t('Submit Ad')}</span>*/}
                        {/*            </Link>*/}
                        {/*        </button>*/}
                        {/*    )*/}
                        {/*}*/}
                        <div></div>
                        <div></div>
                        <SwitchDarkMode/>
                        <LangDropdown/>
                        <div></div>
                        <div></div>
                        {/* <div className='rgb-border'>
                            <Link className='add-property-btn' href='/add/property'>
                                Submit Ad
                            </Link>
                        </div> */}
                        <div></div>
                        {/*{*/}
                        {/*    isAuthenticated ?*/}
                        {/*        <>*/}
                        {/*            <AvatarDropdown username={username}/>*/}
                        {/*        </> :*/}
                        {/*        <Link*/}
                        {/*            className='border-x-4 border-y-2 border-cyan-500 hover:text-green-500 nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors py-1 px-4'*/}
                        {/*            href={{pathname: "/login", state: {prevPath: location.pathname}}}>*/}
                        {/*            Login*/}
                        {/*        </Link>*/}
                        {/*}*/}
                    </div>
                    <div className="flex items-center space-x-2 md:hidden">
                        {/*{*/}
                        {/*    isAuthenticated ?*/}
                        {/*      <>*/}
                        {/*          <AvatarDropdown username={username}/>*/}
                        {/*      </> : <></>*/}
                        {/*}*/}
                        <MenuBar/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainNav2;