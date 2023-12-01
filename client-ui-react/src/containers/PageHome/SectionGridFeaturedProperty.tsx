import React, {FC, useEffect, useState} from 'react';
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {PropertyDataType} from "../../types";
import HeaderFilter from "./HeaderFilter";
import FeaturedPropertyCard from "../../components/PropertyCardH/FeaturedPropertyCard";
import {getHomePageFeaturedPropertiesApi} from "../../apis/Property";
import {toast} from "react-toastify";

export interface SectionGridFeaturedPropertyProps {
    gridClass?: string;
    heading?: string;
    subHeading?: string;
    tabs?: string[];
}

const SectionGridFeaturedProperty: FC<SectionGridFeaturedPropertyProps> = ({
                                                                               gridClass = "",
                                                                               heading = "Featured Listings",
                                                                               subHeading = "Highlighted properties",
                                                                               tabs = ["New York", "Tokyo", "Paris", "London"]
                                                                           }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [featuredProperties, setFeaturedProperties] = useState<PropertyDataType[]>([]);

    useEffect(() => {
        fetchFeaturedProperties()
    }, []);

    const fetchFeaturedProperties = () => {
        setIsLoading(true);
        getHomePageFeaturedPropertiesApi()
            .then((res) => {
                setFeaturedProperties(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
                setIsLoading(false);
            })
    }

    const renderCard = (stay: PropertyDataType, index: number) =>
        <FeaturedPropertyCard
            key={index}
            className="h-full tablet:h-32"
            data={stay}
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
                        {featuredProperties?.map(renderCard)}
                    </div>
            }
        </div>
    )
};

export default SectionGridFeaturedProperty;