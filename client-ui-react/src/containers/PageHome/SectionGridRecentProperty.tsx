import React, {FC, ReactNode, useEffect, useState} from "react";
import HeaderFilter from "./HeaderFilter";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import PropertyCardCustom from "../../components/PropertyCardH/PropertyCardCustom";
import {PropertyDataType} from "../../types";
import {getRecentPropertiesApi} from "../../apis/Property";
import {toast} from "react-toastify";

export interface SectionGridFeaturePropertyProps {
    stayListings?: PropertyDataType[];
    gridClass?: string;
    heading?: ReactNode;
    subHeading?: ReactNode;
    headingIsCenter?: boolean;
    tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
                                                                             gridClass = "",
                                                                             heading = "Recent Listings",
                                                                             subHeading = "Properties listed recently",
                                                                             tabs = ["New York", "Tokyo", "Paris", "London"],
                                                                         }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recentProperties, setRecentProperties] = useState<PropertyDataType[]>([]);

    useEffect(() => {
        fetchRecentProperties();
    }, []);

    const fetchRecentProperties = () => {
        setIsLoading(true);
        getRecentPropertiesApi()
            .then((response: any) => {
                setRecentProperties(response.data);
                setIsLoading(false);
            })
            .catch((error: any) => {
                toast.error(error?.response?.message);
                setIsLoading(false);
            })
    }

    const renderCard = (propertyData: PropertyDataType, index: number) =>
        <PropertyCardCustom
            key={index}
            className="h-full tablet:h-32"
            data={propertyData}
        />

        const renderLoading = () => {
            return <LoadingSpinner size={20} align='center'/>
        }

        return (
            <div className="nc-SectionGridFeatureProperty relative tablet:mt-0">
                <HeaderFilter
                    tabActive={"New York"}
                    subHeading={subHeading}
                    tabs={tabs}
                    heading={heading}
                    onClickTab={() => {
                    }}
                />
                {
                    isLoading ?
                        renderLoading() :
                        <div
                            className={`grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 tablet:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
                        >
                            {recentProperties?.map(renderCard)}
                        </div>
                }
            </div>
        );
};

export default SectionGridFeatureProperty;
