import React, {FC} from "react";
import Heading from "../../shared/Heading/Heading";
import {ReactNode} from "react";

export interface HeaderFilterProps {
    tabActive: string;
    tabs: string[];
    heading: ReactNode;
    subHeading?: ReactNode;
    onClickTab: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({subHeading = "", heading = "",}) => {
    return (
        <div className="flex flex-col mb-0 relative">
            <Heading desc={subHeading}>{heading}</Heading>
            <div className="flex items-center justify-between">
                <span className="hidden sm:block flex-shrink-0"></span>
            </div>
        </div>
    );
};

export default HeaderFilter;
