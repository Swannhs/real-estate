import React, {FC, useEffect, useMemo} from "react";
import Heading from "../../components/Heading/Heading";
import Glide from "@glidejs/glide";
import {HomepageBlogDataType} from "../../data/types";
import NextPrev from "../../shared/NextPrev/NextPrev";
import CardCategory5 from "../../components/CardCategory5/CardCategory5";
import useNcId from "../../hooks/useNcId";

export interface SectionSliderNewCategoriesProps {
    items?: HomepageBlogDataType[];
    className?: string;
    heading?: string;
    subHeading?: string;
    itemPerRow?: 4 | 5;
    sliderStyle?: "style1" | "style2";
    uniqueClassName: string;
    categories?: any[];
    categoryCardType?: "card3" | "card4" | "card5";
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
                                                                             items = [],
                                                                             heading = "Heading of sections",
                                                                             subHeading = "Descriptions for sections",
                                                                             className = "",
                                                                             itemPerRow = 5,
                                                                             sliderStyle = "style1",
                                                                             uniqueClassName,
                                                                         }) => {
    const UNIQUE_CLASS = "SectionSliderNewCategories__" + uniqueClassName + useNcId();

    let MY_GLIDEJS = useMemo(() => {
        return new Glide(`.${UNIQUE_CLASS}`, {
            perView: itemPerRow,
            gap: 32,
            bound: true,
            breakpoints: {
                1280: {
                    perView: itemPerRow - 1,
                },
                1024: {
                    gap: 20,
                    perView: itemPerRow - 1,
                },
                768: {
                    gap: 20,
                    perView: itemPerRow - 2,
                },
                640: {
                    gap: 20,
                    perView: itemPerRow - 3,
                },
                500: {
                    gap: 20,
                    perView: 1.3,
                },
            },
        });
    }, [UNIQUE_CLASS]);

    useEffect(() => {
        setTimeout(() => {
            MY_GLIDEJS.mount();
        }, 100);
    }, [MY_GLIDEJS, UNIQUE_CLASS]);

    return (
        <div className={`nc-SectionSliderNewCategories ${className}`}>
            <div className={`${UNIQUE_CLASS} flow-root`}>
                <Heading
                    desc={subHeading}
                    hasNextPrev={sliderStyle === "style1"}
                    isCenter={sliderStyle === "style2"}
                >
                    {heading}
                </Heading>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {
                            items?.map((item: HomepageBlogDataType, index: number) => (
                                <li key={index} className={`glide__slide`}>
                                    <CardCategory5 item={item}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {sliderStyle === "style2" && (
                    <NextPrev className="justify-center mt-16"/>
                )}
            </div>
        </div>
    );
};

export default SectionSliderNewCategories;
