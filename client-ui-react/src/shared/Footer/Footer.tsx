import {CustomLink} from "../../data/types";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getCookiesPolicyApi} from "../../apis/StaticData";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {StateInterface} from "../../redux/reducers/rootReducer";
import LogoFooter from "../Logo/LogoFooter";
import SocialsList1 from "../SocialsList1/SocialsList1";

export interface WidgetFooterMenu {
    id: string;
    title: string;
    menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
    {
        id: "4",
        title: "Legal",
        menus: [
            {href: "/gtc", label: "General Terms & Conditions (GTC)"},
            {href: "/privacypolicy", label: "Privacy Policy"},
            {href: "/legalnotice", label: "Legal Notice"}
        ],
    }
]

const Footer: React.FC = () => {
    const [displayCookie, setDisplayCookie] = React.useState(false);
    const {t} = useTranslation();
    const {language} = useSelector((state: StateInterface) => state.lang);
    const langUpperCase = language.charAt(0).toUpperCase()+ language.slice(1);
    const [data, setData] = React.useState<any>(null);

    useEffect(() => {
        const storedCookiePolicy = localStorage.getItem("cookiePolicy");
        if (!storedCookiePolicy) {
            fetchCookiePolicy();
        }
    }, []);

    const fetchCookiePolicy = () => {
        getCookiesPolicyApi()
            .then((response: any) => {
                setData(response?.data?.data);
                setDisplayCookie(true);
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
            });
    }


    const onAcceptCookiePolicy = () => {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds

        if (data) {
            localStorage.setItem("cookiePolicy", data['description' + langUpperCase] || "");
        }
        setDisplayCookie(false);
    }


    const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
        return (
            <div key={index} className="text-sm">
                <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
                    {menu.title}
                </h2>
                <ul className="mt-5 space-y-4">
                    {menu.menus.map((item, index) => (
                        <li key={index}>
                            <Link
                                key={index}
                                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                                to={item.href}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderCookie = () => (
        <div className="absolute bg-gray-100 py-6 flex flex-col justify-center sm:py-12 z-max">
            <div
                className="max-w-screen-lg mx-auto fixed bg-white dark:bg-neutral-700 inset-x-5 p-5 bottom-10 rounded-lg drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between">
                <div className="w-full">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {data && data['description' + langUpperCase]}
                    </p>
                </div>
                <div className="flex gap-4 items-center flex-shrink-0">
                    <button
                        className="bg-green-500 px-5 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                        onClick={onAcceptCookiePolicy}
                    >
                        {t('accept')}
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div className='z-10'>
            <div className="nc-Footer relative pt-24 lg:pt-28 border-t border-neutral-200 dark:border-neutral-700">
                {displayCookie  && renderCookie()}
                <div
                    className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
                    <div
                        className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col tablet:grid-cols-2">
                        <div className="col-span-2 md:col-span-1">
                            <LogoFooter/>
                        </div>
                        <div className="col-span-2 flex items-center">
                            {widgetMenus.map(renderWidgetMenuItem)}
                        </div>
                    </div>
                </div>
                {/*    Copy Right*/}
            </div>
            <div className="container flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {t('copy_right_message')}
                </p>
            </div>
        </div>
    );
};

export default Footer;
