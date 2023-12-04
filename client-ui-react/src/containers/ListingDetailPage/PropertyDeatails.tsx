import React, {FC, useEffect, useState} from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import NcImage from "../../shared/NcImage/NcImage";
import ModalPhotos from "./ModalPhotos";
import {useParams} from "react-router-dom";
import {getPropertyByIdApi} from "../../apis/Property";
import {PropertySingleDataType} from "../../types/PropertyTypes";
import {GalleryImageType} from "../../types";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import Page404 from "../Page404/Page404";
import FormItem from "../PageAddListing1/FormItem";
import Textarea from "../../shared/Textarea/Textarea";
import ContentLoader from "react-content-loader";
import GoogleMapReact from "google-map-react";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import BtnLikeIcon from "../../components/BtnLikeIcon/BtnLikeIcon";
import {useTranslation} from "react-i18next";
import {contactAdvisorApi} from "../../apis/ContactUs";
import {useSelector} from "react-redux";
import {StateInterface} from "../../redux/reducers/rootReducer";
import {currencyFormatter} from "../../utils/currencyFormatter";
import Label from "../../components/Label/Label";
import {toast, ToastContainer} from "react-toastify";
import * as Yup from 'yup';

export interface ListingStayDetailPageProps {
    className?: string;
    isPreviewMode?: boolean;
}

export interface ContactFormProps {
    estateId: number | string | null;
    firstName: string;
    lastName: string;
    senderEmail: string;
    phone: string;
    streetNo: string;
    zipCode: string;
    city: string;
    message: string;
}

const PropertyDetails: FC<ListingStayDetailPageProps> = ({className = ""}) => {
    const {language} = useSelector((state: StateInterface) => state.lang);
    const langUpperCase = language.charAt(0).toUpperCase()+ language.slice(1);
    const [property, setProperty] = useState<PropertySingleDataType>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contactDisabled, setContactDisabled] = useState<boolean>(false);
    const [contactForm, setContactForm] = useState<ContactFormProps>({
        estateId: null,
        firstName: "",
        lastName: "",
        senderEmail: "",
        phone: "",
        streetNo: "",
        zipCode: "",
        city: "",
        message: ""
    });
    const [contactSuccess, setContactSuccess] = useState<boolean>(false);
    const {t} = useTranslation();
    const [error, setError] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);
    let {id} = useParams<any>();
    const [mapCenter, setMapCenter] = useState({
        lat: 46.206410643703684,
        lng: 6.1405401640014645
    });
    const contactRef = React.createRef<HTMLDivElement>();
    const hash = window.location.hash;
    const [contactValidationError, setContactValidationError] = useState<any>({});
    const contactSchema = Yup.object().shape({
        firstName: Yup.string()
            .required(t('contact.advertiser.validation.firstname')),
        senderEmail: Yup.string()
            .required(t('contact.advertiser.validation.email')),
        zipCode: Yup.string()
            .required(t('contact.advertiser.validation.zipcode')),
        city: Yup.string()
            .required(t('contact.advertiser.validation.city')),
        message: Yup.string()
            .required(t('contact.advertiser.validation.message')),
    });

    const scrollToContact = () => {
        if (hash === "#contact") {
            contactRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    const fetchSingleProperty: any = async () => {
        if (!id) {
            setError(true);
            return;
        }
        await getPropertyByIdApi(id)
            .then((response: any) => {
                setProperty(response?.data);
                setMapCenter({
                    lat: parseFloat(response.data?.location?.lat as string),
                    lng: parseFloat(response.data?.location?.lng as string)
                });
                setContactForm({
                    ...contactForm,
                    estateId: response.data?.id
                });
                settingUpImages(response.data?.estateGalleries);
                setIsLoading(false);
            })
            .catch((error: any) => {
                setError(error);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        setIsLoading(true);
        fetchSingleProperty();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                scrollToContact();
            }, 500);
        }
    }, [isLoading]);

    useEffect(() => {
        if (contactSuccess) {
            setTimeout(() => {
                setContactSuccess(false)
            }, 2000);
        }
    }, [contactSuccess]);

    const settingUpImages = (estateGalleries: GalleryImageType[]) => {
        if (estateGalleries?.length) {
            let imgs : string[] = [];
            for (let i = 0; i < estateGalleries.length; i++) {
                if (estateGalleries[i] && estateGalleries[i].compressedImageName !== "") {
                    imgs.push(estateGalleries[i].compressedImageName || "");
                }
            }
            setImages(imgs);
        }
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactForm({
            ...contactForm,
            [event.target.name]: event.target.value
        });
    }

    const onContactAdvertiserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        contactSchema.validate(contactForm, {abortEarly: false})
            .then(() => {
                setContactValidationError({})
                setContactDisabled(true);
                contactAdvisorApi(contactForm, language)
                    .then(() => {
                        setContactSuccess(true);
                        setContactForm({
                            estateId: id,
                            firstName: "",
                            lastName: "",
                            senderEmail: "",
                            phone: "",
                            streetNo: "",
                            zipCode: "",
                            city: "",
                            message: ""
                        });
                        toast.success(t('advertise.email.sent'));
                    })
                    .catch((error: any) => {
                        setContactSuccess(false);
                        toast.error(error?.response?.data?.message);
                    })
                    .finally(() => {
                        setContactDisabled(false);
                    });
            })
            .catch((error) => {
                const errorInner = error.inner;
                const errors: {[key: string]: string} = {};

                errorInner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });

                setContactValidationError(errors);
            });
    }

    const handleOpenModal = (index: number) => {
        setIsOpen(true);
        setOpenFocusIndex(index);
    };

    const handleCloseModal = () => setIsOpen(false);

    const blogSection = () => {
        return (
            <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">{property?.title}</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                    <div dangerouslySetInnerHTML={{__html: property?.description as string}}/>
                </div>
            </div>
        );
    };

    const availabilitySection = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">
                        {t("propertyDetails.property.availability")}
                    </h2>
                    <div className='grid grid-cols-2 mt-4'>
                        <p>{t('propertyDetails.property.available.from')}: </p>
                        <p>{property?.estateAvailabilityPolicy?.split("_").filter((item: string) => item.trim()).join(' ')}</p>
                    </div>
                </div>
            </div>
        );
    };

    const priceSection = () => (
        <div className="listingSection__wrap">
            <div>
                <h2 className="text-2xl font-semibold">
                    {t('propertyDetails.property.cost')}
                </h2>
                <div className='grid grid-cols-2 mt-4'>
                    <p className='capitalize'>{property?.estateAdvertisePurpose === 'RENT' ? t('addProperty.property.price.monthly') : t('propertyDetails.property.cost.price')} : </p>
                    <div className='flex'>
                        <h2 className='text-2xl font-bold'>&nbsp;
                            {currencyFormatter(property?.estatePrice as unknown as string)}
                        </h2>
                        <span className='mt-1 ml-2 text-xs font-semibold'>{property?.estatePriceType}</span>
                        {
                            parseInt(property?.estateAdditionalPrice as unknown as string) > 0 && (
                                <span className='text-green-600 mt-1.5'>+
                                    {currencyFormatter(property?.estateAdditionalPrice as unknown as string)}
                                </span>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )

    const mainInformation = () => (
        <div className="listingSection__wrap">
            <div>
                <h2 className="text-2xl font-semibold">
                    {t('propertyDetails.property.main.information')}
                </h2>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('propertyDetails.property.main.information.type')} : </p>
                    <p>{property?.estateType}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('propertyDetails.property.main.information.no.of.rooms')} : </p>
                    <p>{property?.rooms}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('addProperty.property.room.height')} : </p>
                    <p>{property?.estateRoomHeight} <span className='text-xs'>m</span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('propertyDetails.property.main.information.floor')} : </p>
                    <p>{property?.estateFloor}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('propertyDetails.property.main.information.floor.space')} : </p>
                    <p>{property?.estateFloorSpace} <span className='text-xs'>m<sup>2</sup></span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('addProperty.property.living.space')} : </p>
                    <p>{property?.livingArea} <span className='text-xs'>m<sup>2</sup></span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('addProperty.property.lot.area')} : </p>
                    <p>{property?.estateLotArea} <span className='text-xs'>m<sup>2</sup></span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('propertyDetails.property.main.information.year.built')} : </p>
                    <p>{property?.estateYearOfBuilding ?? import.meta.env.VITE_APP_NOT_AVAILABLE_INFO}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>{t('propertyDetails.property.main.information.year.renovation')}</p>
                    <p>{property?.estateYearOfRenovation ?? import.meta.env.VITE_APP_NOT_AVAILABLE_INFO}</p>
                </div>
            </div>
        </div>
    )

    const featuresSection = () => (
        <div className="listingSection__wrap">
            <div>
                <h2 className="text-2xl font-semibold">
                    {t('propertyDetails.property.main.features')}
                </h2>
                <ul className='grid grid-cols-2 mt-4 list-disc px-4'>
                    {
                        property?.estateFeatures?.map((item: any, index) => {
                            return (
                                <li key={index}>{language === "en" ? item.featuresTitle : item["featuresTitle"+langUpperCase]}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )

    const videoSection = () => (
        <div className="listingSection__wrap">
            <h2 className="text-2xl font-semibold">
                {t('propertyDetails.property.video')}
            </h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <iframe
                className="w-full h-96 mt-4"
                src={`${property?.videoUrl as string}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div>
    )

    const renderLocation = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">
                        {t('propertyDetails.property.location')}
                    </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {property?.location?.addressLine1}
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

                {/* MAP */}
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                    <div className="rounded-xl overflow-hidden">
                        {
                            isLoading ?
                                <ContentLoader className='h-screen w-full' viewBox="0 0 100% 100%">
                                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%"/>
                                </ContentLoader> :
                                <GoogleMapReact
                                    defaultZoom={15}
                                    center={mapCenter}
                                    bootstrapURLKeys={{
                                        key: import.meta.env.VITE_APP_GOOGLE_API_KEY as string,
                                    }}
                                    yesIWantToUseGoogleMapApiInternals
                                >
                                    <GoogleMapComponent
                                        isSelected={false}
                                        lat={mapCenter.lat}
                                        lng={mapCenter.lng}
                                    />
                                </GoogleMapReact>
                        }
                    </div>
                </div>
            </div>
        );
    };

    const renderContact = () => {
        return (
            <div ref={contactRef} className="listingSectionSidebar__wrap shadow-xl">
                {/* PRICE */}
                <div className="flex justify-between">
                    <span className="text-xl font-semibold">
                        {t('propertyDetails.property.contact.the.advertiser')}
                    </span>
                </div>

                {/* FORM */}
                <form className="flex flex-col dark:border-neutral-700" onSubmit={onContactAdvertiserSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5 '>
                        <FormItem label={t('propertyDetails.property.contact.firstname')}>
                            <Input
                                type='text'
                                name='firstName'
                                value={contactForm.firstName}
                                onChange={onChangeHandler}
                            />
                            <p className={contactValidationError.firstName ? "text-sm text-red-500" : 'hidden'}>
                                {contactValidationError.firstName}
                            </p>
                        </FormItem>
                        <FormItem label={t('propertyDetails.property.contact.lastname')}>
                            <Input
                                type='text'
                                name='lastName'
                                value={contactForm.lastName}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-1'>
                        <FormItem label={t('propertyDetails.property.contact.email')}>
                            <Input
                                type='email'
                                name='senderEmail'
                                value={contactForm.senderEmail}
                                onChange={onChangeHandler}
                            />
                            <p className={contactValidationError.senderEmail ? "text-sm text-red-500" : 'hidden'}>
                                {contactValidationError.senderEmail}
                            </p>
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-1'>
                        <FormItem label={t('propertyDetails.property.contact.telephone')}>
                            <Input
                                type='tel'
                                name='phone'
                                value={contactForm.phone}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-1'>
                        <FormItem label={t('propertyDetails.property.contact.street.no')}>
                            <Input
                                type='text'
                                name='streetNo'
                                value={contactForm.streetNo}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5'>
                        <FormItem label={t('propertyDetails.property.contact.zipcode')}>
                            <Input
                                type='text'
                                name='zipCode'
                                value={contactForm.zipCode}
                                onChange={onChangeHandler}
                            />
                            <p className={contactValidationError.zipCode ? "text-sm text-red-500" : 'hidden'}>
                                {contactValidationError.zipCode}
                            </p>
                        </FormItem>
                        <FormItem label={t('propertyDetails.property.contact.city')}>
                            <Input
                                type='text'
                                name='city'
                                value={contactForm.city}
                                onChange={onChangeHandler}
                            />
                            <p className={contactValidationError.city ? "text-sm text-red-500" : 'hidden'}>
                                {contactValidationError.city}
                            </p>
                        </FormItem>
                    </div>
                    <div className='grid grid-cols-1'>
                        <FormItem label={t('propertyDetails.property.contact.message')}>
                            <Textarea
                                name='message'
                                rows={3}
                                value={contactForm.message}
                                onChange={onChangeHandler}
                            />
                            <p className={contactValidationError.message ? "text-sm text-red-500" : 'hidden'}>
                                {contactValidationError.message}
                            </p>
                        </FormItem>
                    </div>
                    <ButtonPrimary className={`mt-4 ${contactDisabled ?? 'opacity-50'}`} disabled={contactDisabled}
                                   type='submit'>
                        {t('propertyDetails.property.contact.send.request')}
                    </ButtonPrimary>
                    {
                        contactSuccess ?
                            <p className='text-sm text-center text-green-600 mt-1'>
                                {t('advertise.email.sent')}
                            </p> : <></>
                    }

                </form>
            </div>
        );
    };

    const renderContactDetails = () => {
        return (
            <div className="listingSection__wrap mb-2">
                {/* Contact Details Heading */}
                <div>
                    <h2 className="text-xl font-semibold">
                        {t('contact-details')}
                    </h2>
                </div>
                <div>
                    <p><Label>{t('addProperty.property.contact.name')}: {property?.contact?.name}</Label></p>
                    <p><Label>{t('addProperty.property.contact.email')}: {property?.contact?.email}</Label></p>
                    <p><Label>{t('addProperty.property.contact.phone')}: {property?.contact?.phone}</Label></p>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <LoadingSpinner size={20} align='center' className='py-36'/>
    } else if (error) {
        return <Page404 title='Property is not exist'/>
    } else {
        return (
            <div
                className={`ListingDetailPage nc-ListingStayDetailPage ${className}`}
                data-nc-id="ListingStayDetailPage"
            >
                <ToastContainer/>
                {/* SINGLE HEADER */}
                <>
                    <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
                        <BtnLikeIcon propertyId={property?.id} className='absolute ml-2 mt-2'/>
                        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
                            <div
                                className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                                onClick={() => handleOpenModal(0)}
                            >
                                <NcImage
                                    containerClassName={images[1] ? `absolute inset-0` : 'inset-0'}
                                    className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                    src={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL as string + images[0]}
                                />
                                <div
                                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                            </div>
                            {
                                images?.filter((_, i) => i < 5 && i > 0).map((item, index) => (
                                    <div
                                        key={index}
                                        className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                                            index >= 3 ? "hidden sm:block" : ""
                                        }`}
                                    >
                                        <NcImage
                                            containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                                            className="object-cover w-full h-full rounded-md sm:rounded-xl "
                                            src={import.meta.env.VITE_APP_ESTATE_PUBLIC_URL as string + item || ""}
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                            onClick={() => handleOpenModal(index + 1)}
                                        />
                                    </div>
                                ))}

                            <div
                                className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
                                onClick={() => handleOpenModal(0)}
                            >
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
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                                <span className="ml-2 text-neutral-800 text-sm font-medium">
                                {t('propertyDetails.property.show.all.photos')}
                            </span>
                            </div>
                        </div>
                    </header>
                    {/* MODAL PHOTOS */}
                    <ModalPhotos
                        imgs={images}
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        initFocus={openFocusIndex}
                        uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
                    />
                </>

                {/* MAIn */}
                <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
                    {/* CONTENT */}
                    <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
                        {availabilitySection()}
                        {priceSection()}
                        {mainInformation()}
                        {featuresSection()}
                        {
                            property?.videoUrl !== '' && videoSection()
                        }
                        {blogSection()}
                        {/*{hostInformationSection()}*/}
                        {renderLocation()}
                        {/*{renderSection8()}*/}
                    </div>

                    <div className="flex-grow mt-14 lg:mt-0">
                        <div className="sticky top-28 max-h-[calc(100vh-5rem)] overflow-y-auto hiddenScrollbar">
                            {property?.contact?.displayAsPublic && renderContactDetails()}
                            {renderContact()}
                        </div>
                    </div>
                </main>

                <div className="container py-10 lg:py-10">

                </div>
            </div>
        );
    }
};

export default PropertyDetails;
