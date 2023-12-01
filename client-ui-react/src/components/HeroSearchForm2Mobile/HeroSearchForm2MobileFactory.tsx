import React from "react";
import {useLocation} from "react-router-dom";
import {PathName} from "../../routers/types";
import HeroSearchForm2Mobile from "./HeroSearchForm2Mobile";

const PAGES_REAL_ESTATE: PathName[] = [
    "/",
];

const HeroSearchForm2MobileFactory = () => {
    const location = useLocation();
    if (PAGES_REAL_ESTATE.includes(location.pathname as PathName)) {
        return <HeroSearchForm2Mobile/>;
    } else {
        return <React.Fragment/>
    }
};

export default HeroSearchForm2MobileFactory;
