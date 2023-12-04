import React, {FC, useEffect, useState} from 'react';
import GallerySlider from "../GallerySlider/GallerySlider";
import {Link} from "react-router-dom";
import {currencyFormatter} from "../../utils/currencyFormatter";
import Badge from "../../shared/Badge/Badge";

export interface StayCardGoogleProps {
    className?: string;
    data: any;
    size?: "default" | "small";
}

const StayCardGoogle: FC<StayCardGoogleProps> = ({data, size = "default", className = ""}) => {
    const [galleryImgs, setGalleryImgs] = useState<any>([]);

    useEffect(() => {
        let estateImgs: string[] = [];
        if (data?.estateGalleries.length) {
            for (let i = 0; i < data.estateGalleries.length; i++) {
                estateImgs.push(import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + data.estateGalleries[i].compressedImageName);
            }
        }
        setGalleryImgs(estateImgs);
    }, []);

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full">
                <GallerySlider
                    uniqueID={`StayCard_${data.id}`}
                    ratioClass="aspect-w-4 aspect-h-3 "
                    galleryImgs={galleryImgs}
                    href={`/estate-details/${data.id}`}
                />
                {/*<BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]"/>*/}
                {/*{saleOff && <SaleOffBadge className="absolute left-3 top-3"/>}*/}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
                <div className="space-y-2">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {data?.estateAdvertiser} · {data?.rooms} rooms
                    </span>
                    <div className="flex items-center space-x-2">
                        {/*{isAds && <Badge name="ADS" color="green"/>}*/}
                        <h2
                            className={` font-medium capitalize ${
                                size === "default" ? "text-lg" : "text-base"
                            }`}
                        >
                            <span className="line-clamp-1">{data?.title}</span>
                        </h2>
                    </div>
                    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                        {size === "default" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        )}
                        <span className="">{data?.location?.addressLine1}</span>
                    </div>
                </div>
                <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex justify-between items-center">
                    <p className='text-xs font-semibold'>{data?.estatePriceType}
                        <span className='text-lg'>
                             {currencyFormatter(data?.estatePrice as unknown as string)}
                        </span>
                    </p>
                    <Badge className='tablet:self-start tablet-landscape:hidden tablet:hidden'
                           name={data?.estateType}
                           color='purple'/>
                    {/*{!!reviewStart && (*/}
                    {/*    <StartRating reviewCount={reviewCount} point={reviewStart}/>*/}
                    {/*)}*/}
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link to={`/estate-details/${data.id}`}>{renderContent()}</Link>
        </div>
    );
};

export default StayCardGoogle;
