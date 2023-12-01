import React, {FC} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export interface CommonLayoutProps {
    children: any;
}

const CommonLayout: FC<CommonLayoutProps> = ({children}) => {
    const {isAuthenticated} = useSelector((state: any) => state.auth);

    if (!isAuthenticated) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div
            className={`nc-PageAddListing1 px-4 py-5 max-w-screen-xl lg:container pb-24 pt-14 sm:py-24 lg:pb-32`}
            data-nc-id="PageAddListing1"
        >
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Add Blog</title>
            </Helmet>

            <ToastContainer/>
            <div className="space-y-11">
                <div>
                    <span className="text-4xl font-semibold">1</span>{" "}
                    <span className="text-lg text-neutral-500 dark:text-neutral-400">
                        / 1
                    </span>
                </div>
                {/* --------------------- */}
                <div className="listingSection__wrap">{children}</div>
            </div>
        </div>
    );
};

export default CommonLayout;
