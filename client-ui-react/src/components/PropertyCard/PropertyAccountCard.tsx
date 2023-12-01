import React, {FC, useEffect, useState} from 'react';
import GallerySlider from "../GallerySlider/GallerySlider";
import BtnEditIcon from "../IconButton/BtnEditIcon";
import BtnDeleteIcon from "../IconButton/BtnDeleteIcon";
import {deletePropertyByIdApi} from "../../apis/Property";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Badge from "../../shared/Badge/Badge";
// import {useTranslation} from "react-i18next";
import PropertyCardContent from "./PropertyCardContent";
import {useTranslation} from "react-i18next";
import BtnFeaturedIcon from "../IconButton/BtnFeaturedIcon";

interface PropertyCardTypes {
    className?: string;
    data?: any;
    isSuperUser?: boolean;
    onDelete?: (id: number | string) => void;
}

const PropertyAccountCard: FC<PropertyCardTypes> = ({data, className = "", isSuperUser = false, onDelete}) => {
    const {t} = useTranslation();
    const {
        id,
        location,
        estatePrice,
        rooms,
        estateAdditionalPrice,
        livingArea,
        estatePriceType,
        title,
        isActive,
        estateStickers
    } = data;
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const estateFeatureId = 1; // TODO: Will be change later

    useEffect(() => {
        let images: string[] = [];
        if (data?.estateGalleries?.length > 0) {
            for (let i = 0; i < data.estateGalleries.length; i++) {
                if (data.estateGalleries[i]) {
                    images.push(import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + data.estateGalleries[i].compressedImageName);
                }
            }
        }
        setGalleryImages(images);
    }, []);

    const onConfirmDelete = (id: number | string) => {
        deletePropertyByIdApi(id)
            .then((response: any) => {
                toast.success(response?.data?.message);
                if (onDelete) {
                    onDelete(id);
                }
            })
            .catch((error: any) => {
                toast.error(error.response?.data?.message);
            });
    }

    // TODO: Will be added later
    const renderBadge = () => {
        if (isActive) {
            return <Badge name={t('active')} color='green'/>
        } else {
            return <Badge name={t('inactive')} href={`/subscription/${id}`} color='red'/>
        }
    }

    const renderSliderGallery = () => {
        return (
            <div className='relative w-full'>
                <GallerySlider
                    galleryImgs={galleryImages}
                    uniqueID={`propertyCard_${id}`}
                    ratioClass='aspect-w-4 aspect-h-3'
                    href={`/preview/property/${id}`}
                />
                {/*<div className='absolute top-4 left-2'>*/}
                {/*    {renderBadge()}*/}
                {/*</div>*/}
                {
                    isSuperUser && (
                        <BtnFeaturedIcon
                            propertyId={id}
                            className='absolute right-[30%] top-3 z-[1]'
                            isFeatured={estateStickers?.some((sticker: any) => sticker.id === estateFeatureId)}
                        />
                    )
                }
                <Link to={`/edit/property/${id}`}>
                    <BtnEditIcon className='absolute right-12 top-3 z-[1]'/>
                </Link>
                <BtnDeleteIcon id={id} onDelete={onConfirmDelete} className="absolute right-3 top-3 z-[1]"/>
            </div>
        )
    }


    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link to={`/preview/property/${id}`}>
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

export default PropertyAccountCard;
