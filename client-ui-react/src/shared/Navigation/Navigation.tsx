import React from "react";
import NavigationItem, {NavItemType} from "./NavigationItem";
import {NAVIGATION_MOBILE} from "../../data/navigation";

function Navigation() {
    return (
        <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
            {NAVIGATION_MOBILE.map((item: NavItemType) => (
                <NavigationItem key={item.id} menuItem={item}/>
            ))}
        </ul>
    );
}

export default Navigation;
