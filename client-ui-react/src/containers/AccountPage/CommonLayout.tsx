import React from "react";
import {FC} from "react";
import {ToastContainer} from "react-toastify";
import Sidebar from "../../components/Header/Sidebar";

export interface CommonLayoutProps {
    children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({children}) => {
    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <ToastContainer/>
            <div className='flex'>
                <Sidebar/>
                <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32 min-h-screen">{children}</div>
            </div>
        </div>
    );
};

export default CommonLayout;
