import React, {FC, useEffect, useState} from 'react';
import {getCookie, setCookie} from "typescript-cookie";
import GallerySlider from "../GallerySlider/GallerySlider";
import {Link} from "react-router-dom";
import BtnDeleteIcon from "../IconButton/BtnDeleteIcon";
import {toast} from "react-toastify";
import PropertyCardContent from "./PropertyCardContent";
import {useAuth} from "../../hooks/contextApi/AuthContext";

import {removePropertyFromWishListApi} from "../../apis/Wishlist";
import {useWishListContext} from "../../hooks/contextApi/WishListContext";

export interface WishListPropertyCardTypes {
    className?: string;
    data?: any;
}

const WishListPropertyCard: FC<WishListPropertyCardTypes> = ({data, className}) => {
    const {isAuthenticated} = useAuth();
    const {
        id,
        location,
        estatePrice,
        livingArea,
        rooms,
        estateAdditionalPrice,
        estatePriceType,
        title
    } = data;
    const {refreshWishList} = useWishListContext();
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    useEffect(() => {
        let estateImgs: string[] = [];
        if (data?.estateGalleries.length) {
            for (let i = 0; i < data.estateGalleries.length; i++) {
                estateImgs.push(import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + data.estateGalleries[i].compressedImageName);
            }
        }
        setGalleryImages(estateImgs);
    }, []);

    const onConfirmDelete = (id: number | string) => {
        const likedProperties: number[] = getCookie("likedProperties") ? JSON.parse(getCookie("likedProperties") as string) : [];
        const index = likedProperties.indexOf(id as number);
        if (index > -1) {
            likedProperties.splice(index, 1);
        }
        setCookie('likedProperties', JSON.stringify(likedProperties), {path: '/'});
        if (isAuthenticated) {
            fetchRemoveWishList(id as string);
        }
    }

    const fetchRemoveWishList = (propertyId: string) => {
        removePropertyFromWishListApi(propertyId)
            .then(() => {
                toast.success("Property removed from wish list");
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => {
                if (refreshWishList) {
                    refreshWishList();
                }
            });
    }

    const renderSliderGallery = () => {
        return (
            <div className='relative w-full'>
                <GallerySlider
                    galleryImgs={galleryImages}
                    uniqueID={`propertyCard_${id}`}
                    ratioClass='aspect-w-4 aspect-h-3'
                    href={`/estate-details/${id}`}
                />
                <BtnDeleteIcon id={id} onDelete={onConfirmDelete} className="absolute right-3 top-3 z-[1]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="red"
                        viewBox="0 0 24 24"
                        stroke="red"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </BtnDeleteIcon>
            </div>
        )
    }

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link to={`/estate-details/${id}`}>
                <PropertyCardContent
                    estateAdditionalPrice={estateAdditionalPrice}
                    livingArea={livingArea}
                    estatePrice={estatePrice}
                    estatePriceType={estatePriceType}
                    title={title}
                    location={location}
                    rooms={rooms}
                />
            </Link>
        </div>
    )
};

export default WishListPropertyCard;