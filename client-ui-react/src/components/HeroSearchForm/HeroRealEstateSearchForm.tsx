import React, {FC} from "react";
import RealEstateSearchForm from "./RealEstateSearchForm";

export type SearchRealEstateTab = "Buy" | "Rent" | "Sell";

export interface HeroRealEstateSearchFormProps {
    className?: string;
    currentTab?: SearchRealEstateTab;
}

const HeroRealEstateSearchForm: FC<HeroRealEstateSearchFormProps> = ({className = "",}) => {
    const renderForm = () => (
        <RealEstateSearchForm/>
    );

    return (
        <div
            className={`nc-HeroRealEstateSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
            data-nc-id="HeroRealEstateSearchForm"
        >
            {renderForm()}
        </div>
    );
};

export default HeroRealEstateSearchForm;
