import React from "react";
import {Helmet} from "react-helmet";
import MainNav2 from "../components/Header/MainNav2";

const SiteHeader = () => {
    const anchorRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE}</title>
            </Helmet>
            <nav className='z-50 sticky top-0 mobile:w-full bg-white dark:bg-neutral-900'>
                <MainNav2/>
            </nav>
            <div ref={anchorRef} className="h-1 absolute invisible"></div>
        </>
    );
};

export default SiteHeader;
