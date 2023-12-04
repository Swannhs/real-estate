import React, {FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {PropertyDataType} from "../../types";
import GallerySlider from "../GallerySlider/GallerySlider";
import Badge from "../../shared/Badge/Badge";
import BtnLikeIcon from "../BtnLikeIcon/BtnLikeIcon";
import {useTranslation} from "react-i18next";
import {currencyFormatter} from "../../utils/currencyFormatter";
import SkeletonLoader from "../../shared/Loader/SkeletonLoader";

export interface PropertyProps {
    className?: string;
    data: PropertyDataType | any;
    isLoading?: boolean;
    sticker?: boolean;
}

const FeaturedPropertyCard: FC<PropertyProps> = ({className = "", isLoading, data}) => {
    const {t} = useTranslation();
    const [images, setImages] = useState<string[]>([]);
    const {
        id,
        estateType,
        estateAdvertiser,
        estatePrice,
        rooms,
        estatePriceType,
        livingArea,
        estateAdvertisePurpose,
        contact,
        location
    } = data;

    useEffect(() => {
        let estateImgs: string[] = [];
        if (data?.estateGalleries.length) {
            for (let i = 0; i < data.estateGalleries.length; i++) {
                estateImgs.push(import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + data.estateGalleries[i].compressedImageName);
            }
        }
        setImages(estateImgs);
    }, []);

    const RenderSliderGallery = () => {
        return (
            <div
                className="flex-shrink-0 p-3 tablet:p-1 w-full sm:w-64 tablet:w-32 tablet-landscape:h-52 tablet-landscape:w-52">
                <BtnLikeIcon propertyId={id}
                             className='absolute top-5 left-5 tablet-landscape:top-4 tablet-landscape:left-4 tablet:left-24 tablet:top-1'/>
                <GallerySlider
                    ratioClass="aspect-w-1 aspect-h-1"
                    galleryImgs={images}
                    className="w-full h-full tablet:h-32 tablet:w-32 rounded-2xl overflow-hidden will-change-transform"
                    uniqueID={`PropertyCard_${data.id}`}
                    href={`/estate-details/${data.id}`}
                />
            </div>
        );
    };

    const RenderContent = () => {
        return (
            <Link to={`/estate-details/${data.id}`}
                  className="flex-grow sm:pr-6 flex flex-col items-start tablet:h-32 tablet:w-52 tablet-landscape:w-52 tablet:pl-5 mobile:p-4">
                <div className="space-y-4 tablet-landscape:space-y-2 tablet:space-y-1 w-full mobile:space-y-2">
                    <div className="inline-flex tablet:m-0 tablet:p-0 space-x-1">
                        <p className='text-sm font-semibold'>
                            <span className='capitalize'>
                                {estateType}
                            </span>
                            <span className='mx-1'>
                                {t('for')}
                            </span>
                            <span className='lowercase'>
                                {estateAdvertisePurpose}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 tablet:my-0 tablet:p-0 tablet:h-2">
                        <p className='text-sm pt-0.5 tablet:my-0 tablet:p-0'>
                            {rooms !== undefined ? rooms > 1 ? rooms + ' ' + t('Rooms') : rooms + ' ' + t('Room') : ''}
                        </p>
                        <p className='text-sm pt-0.5 tablet:my-0 tablet:p-0'>
                            {livingArea !== undefined && livingArea !== null ?
                                <span>{livingArea}&nbsp;m<sup>2</sup></span> : ''}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className='text-xs font-semibold'>{estatePriceType} <span className='text-lg'>
                                {currencyFormatter(estatePrice as unknown as string)}
                            </span>
                        </p>
                    </div>
                    <div
                        className="flex items-center space-x-2 tablet:h-5 tablet:truncate tablet-landscape:truncate">
                        <h2 className="text-lg font-medium tablet:text-sm capitalize">
                            <p className='font-normal text-base flex'>
                                <div className='pt-0.5'>
                                    <span title={t('search.location')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                        </svg>
                                    </span>
                                </div>
                                <span className='text-sm pt-0.5 line-clamp-2'>
                                    {location?.addressLine1}
                                </span>
                            </p>
                        </h2>
                    </div>
                    <div className='h-5' style={{margin: 0}}>
                        {
                            contact.name !== null && (
                                <div className='text-xs flex md:mt-2'>
                                    <p className='capitalize tablet:whitespace-nowrap'>{t('placed by')}</p>&nbsp;
                                    <p className='font-semibold tablet:line-clamp-1 overflow-hidden'>{contact.name}</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex w-full justify-between items-end">
                        <Badge className='tablet:self-start tablet:hidden'
                               name={estateAdvertiser}
                               color='purple'/>
                        <Link to={`/estate-details/${data.id}#contact`}
                              className="flex items-center justify-center px-3 py-2 leading-none text-base font-semibold tablet:px-1 tablet:py-0.5 tablet:text-xs ring-offset-2 ring-secondary-500 ring-1 rounded tablet:absolute tablet:right-2 tablet:top-2">
                            <i className="las la-phone"></i>
                            <span className="ml-1 tablet:hidden">{t('addProperty.property.contact')}</span>
                        </Link>
                    </div>
                </div>
            </Link>
        );
    };

    const renderPropertyCard = () => {
        if (isLoading) {
            return <SkeletonLoader height="240" width="100%"/>
        }
        return (
            <React.Fragment>
                <RenderSliderGallery/>
                <RenderContent/>
            </React.Fragment>
        )
    }

    return (
        <div
            className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="PropertyCardH"
        >
            <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
                {
                    data?.estateStickers?.length ?
                        <div
                            style={{zIndex: 1}}
                            className={`absolute tablet:left-0 tablet:right-auto right-0 top-0 border-2 px-2 py-1 font-semibold shadow-2xl rounded-bl-2xl tablet:rounded-bl-none tablet:rounded-br-2xl bg-yellow-300 tablet:text-xs dark:text-neutral-700`}>
                            {data?.estateStickers[0].stickerName}
                        </div> : <></>
                }
                {renderPropertyCard()}
            </div>
        </div>
    );
};

export default FeaturedPropertyCard;
