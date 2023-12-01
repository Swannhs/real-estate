import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import CommonLayout from "./CommonLayout";
import FormItem from "../PageAddListing1/FormItem";
import Input from "../../shared/Input/Input";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import Select from "../../shared/Select/Select";
import Checkbox from "../../shared/Checkbox/Checkbox";
import {EstateImageUploader} from "../../shared/Uploader/EstateFileUploader";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import NcImage from "../../shared/NcImage/NcImage";
import {getEditablePropertyByIdApi, postPropertyApi, updatePropertyByIdApi} from "../../apis/Property";
import {toast} from "react-toastify";
// @ts-ignore
import Geocode from "react-geocode";
import {useParams} from "react-router-dom";
import Page404 from "../Page404/Page404";
import GoogleMapLoader from "../../shared/Loader/GoogleMapLoader";
import {useTranslation} from "react-i18next";
import CurrencyInput from "react-currency-input-field";
import MapSearchBar from "../../components/SearchBar/MapSearchBar";
import {useStaticData} from "../../hooks/contextApi/StaticDataContext";
import * as Yup from "yup";
import {
    AddPropertyPropsType,
    PropertyDataType,
    estateContactType,
    EstateImageType,
    locationType,
    PropertyErrorsType,
    EstateFeature
} from "../../types";
import CkeditorCustom from "../../shared/Editor/CkeditorCustom";
import VideoInstructionPopup from "../../shared/Popup/VideoInstructionPopup";
import LocationPicker from "../../components/GoogleMap/MapLocationPicker";

Geocode.setApiKey(import.meta.env.VITE_APP_GOOGLE_API_KEY as string);
Geocode.enableDebug();


const DEFAULT_LAT = 46.204391;
const DEFAULT_LNG = 6.143158;
const DEFAULT_COUNTRY_ID = 231; //Switzerland
const ESTATE_TYPE_PARKING = "Parking";

const ROOMS = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];


const AddAndEditProperty: FC<AddPropertyPropsType> = ({history}) => {
    const {
        success,
        estateFeatures,
        available,
        advertising,
        estateType,
        purpose
    } = useStaticData();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reloadGoogleMaps, setReloadGoogleMaps] = useState<boolean>(false);
    const [availableTo, setAvailableTo] = useState<boolean>(false);
    const [estateImages, setEstateImages] = useState<EstateImageType[]>([]);
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
    const [defaultLocation, setDefaultLocation] = useState({
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG
    });
    const [addPropertyData, setAddPropertyData] = useState<PropertyDataType>({
        location: {
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
            streetNo: '',
            city: '',
            zipCode: '',
            addressLine1: '',
            searchKeywords: ''
        },
        estateAdvertiser: '',
        estateType: '',
        estateAdvertisePurpose: '',
        countryId: DEFAULT_COUNTRY_ID,
        rooms: 1,
        livingArea: undefined,
        estateAvailabilityPolicy: 'By_agreement',
        estatePriceType: 'CHF',
        estatePrice: undefined,
        estateAdditionalPrice: undefined,
        estateFloor: '',
        estateNumberOfFloor: undefined,
        estateLotArea: undefined,
        estateFloorSpace: undefined,
        estateRoomHeight: undefined,
        estateYearOfBuilding: null,
        estateYearOfRenovation: null,
        estateGalleries: [],
        estateDocuments: [],
        estateFeatures: [],
        videoUrl: '',
        title: '',
        description: '',
        estateWillBeAvailable: '',
        estateWillBeAvailableTo: '',
        contact: {
            id: null,
            name: '',
            phone: '',
            email: '',
            displayAsPublic: false
        }
    });
    const [features, setFeatures] = useState<EstateFeature[]>([]);
    const [contact, setContact] = useState<estateContactType>({
        name: '',
        phone: '',
        email: '',
        displayAsPublic: false
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [location, setLocation] = useState<locationType>({
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
        city: '',
        streetNo: '',
        zipCode: '',
        addressLine1: '',
        searchKeywords: ''
    })
    const editPage = window.location.pathname.includes('edit');
    const estateId = useParams<{ id: string }>().id;
    const [validationError, setValidationError] = useState<any>({});
    const [error, setError] = useState<PropertyErrorsType>({hasError: false, message: ''});
    const [title, setTitle] = useState<string>('');
    const {t, i18n} = useTranslation();

    const selectedLang: string = i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1);
    const descriptionField: string = "description" + selectedLang;

    const propertySchema = Yup.object().shape({
        estateAdvertiser: Yup.mixed()
            .test('isNotEmpty', t('addProperty.error.select'), value => {
                return value !== null && value !== '' && value !== undefined && value !== 0;
            }),
        estateAdvertisePurpose: Yup.mixed()
            .test('isNotEmpty', t('addProperty.error.select'), value => {
                return value !== null && value !== '' && value !== undefined;
            }),
        estateType: Yup.mixed()
            .test('isNotEmpty', t('addProperty.error.select'), value => {
                return value !== null && value !== '' && value !== undefined && value !== 0;
            }),
        estateAvailabilityPolicy: Yup.mixed()
            .test('isNotEmpty', t('addProperty.error.select'), function (value) {
                const estateAvailable = this.parent.estateAvailabilityPolicy;
                if (estateAvailable === 'DATE') {
                    return value !== null && value !== '' && value !== undefined;
                }
                return true;
            }),
        estateImages: Yup.array()
            .min(1, t('addProperty.property.photos.error')),
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required(t('description.validation.required')),
        contact: Yup.object().shape({
            name: Yup.string()
                .required(t('addProperty.error.select')),
            email: Yup.string()
                .required(t('addProperty.error.select')),
        }),
        estateYearOfBuilding: Yup.string()
            .nullable()
            .min(4, t('addProperty.property.estateYearOfBuildingOrRenovation.error'))
            .max(4, t('addProperty.property.estateYearOfBuildingOrRenovation.error')),
        estateYearOfRenovation: Yup.string()
            .nullable()
            .min(4, t('addProperty.property.estateYearOfBuildingOrRenovation.error'))
            .max(4, t('addProperty.property.estateYearOfBuildingOrRenovation.error'))
            .test('isGreater', 'Year of renovation must be greater than year of building', function (value) {
                const estateYearOfBuilding = this.parent.estateYearOfBuilding;
                if (estateYearOfBuilding && value) {
                    return parseInt(value) > parseInt(estateYearOfBuilding);
                }
                return true;
            }),
    });

    useEffect(() => {
        if (editPage) {
            fetchEditProperty();
        }
        loadGoogleMap();
    }, [success]);

    useEffect(() => {
        if (success) {
            if(addPropertyData.estateType.length > 0)
                setTitle(addPropertyData.estateType + ' in ' + location.streetNo);
        }
        if (reloadGoogleMaps) {
            loadGoogleMap();
            setReloadGoogleMaps(false);
        }
    }, [location, success, reloadGoogleMaps]);

    const loadGoogleMap = () => {
        setIsMapLoaded(false);
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.addEventListener('load', () => {
            function handleScriptLoad() {
                setIsMapLoaded(true);
            }

            handleScriptLoad();
        });
    }
    const fetchEditProperty = () => {
        getEditablePropertyByIdApi(estateId)
            .then((response: any) => {
                setDefaultLocation({
                    lat: parseFloat(response.data.location.lat),
                    lng: parseFloat(response.data.location.lng)
                });
                setLocation(response.data.location)
                setAddPropertyData(response.data);
                setEstateImages(response.data?.estateGalleries);
                setContact(response.data?.contact);
                setFeatures(response.data?.estateFeatures);
                setReloadGoogleMaps(true);
            })
            .catch((error: any) => {
                setError({hasError: true, message: error.response?.data?.message});
            }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleChangeLocation = async ({lat, lng}: { lat: number, lng: number }) => {
        try {
            const response = await Geocode.fromLatLng(lat, lng);
            if (!response.results || response.results.length === 0) {
                toast.error(t('geocode.get.address.error'));
            }

            const uniqueFields = new Set<string>();
            response.results.forEach((result: any) => {
                result.formatted_address.split(',').forEach((field: string) => {
                    uniqueFields.add(field.trim());
                });
            });
            const allUniqueFields = Array.from(uniqueFields).join(',');
            const address = response.results[0].formatted_address;

            const cityOrder = [
                'locality',
                'postal_town',
                'sublocality',
                'neighborhood',
                'administrative_area_level_2', // Use administrative area level 2 if city is not found
            ];

            const zipOrder = [
                'postal_code',
                'postal_code_prefix',
            ];

            let city = '';
            let zip = '';
            let streetNo = '';

            // Find the best match for city
            cityOrder.some((item: string) => {
                const foundItem = response.results[0].address_components.find((component: any) => component.types.includes(item));
                if (foundItem) {
                    city = foundItem.long_name; // City
                    return true; // Stop further iteration
                }
                return false;
            });

            // Find the best match for postal code
            zipOrder.some((item: string) => {
                const foundItem = response.results[0].address_components.find((component: any) => component.types.includes(item));
                if (foundItem) {
                    zip = foundItem.long_name; // Postal Code
                    return true; // Stop further iteration
                }
                return false;
            });

            // Extract street components
            const streetComponents = response.results[0].address_components.filter((component: any) =>
                component.types.includes('street_number') || component.types.includes('route')
            );

            // Process street components to form the street number and name
            streetComponents.forEach((component: any) => {
                if (component.types.includes('street_number')) {
                    streetNo = component.long_name;
                } else if (component.types.includes('route')) {
                    streetNo = `${component.long_name} ${streetNo}`.trim();
                }
            });

            setLocation({
                ...location,
                lat: lat,
                lng: lng,
                city: city,
                zipCode: zip,
                addressLine1: address,
                streetNo: streetNo,
                searchKeywords: allUniqueFields,
            });
        } catch (error: any) {
            toast.error(error.message || 'Google Maps API Error');
        }
    };

    const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation({
            ...location,
            [event.target.name]: event.target.value
        })
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setAddPropertyData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onDescriptionChangeHandler = (data: any) => {
        setAddPropertyData(prevState => {
            return {
                ...prevState,
                description: data
            }
        })
    }

    const onContactChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    }

    const onFeatureChangeHandler = (item: any) => {
        let selectedFeatures = [];
        let matchedFeature = features.find(f => f.id === item.id);
        if (matchedFeature) {
            selectedFeatures = features.filter(f => f.id !== item.id);
        } else {
            selectedFeatures.push(...features, item);
        }
        setFeatures(selectedFeatures);
    }

    const fileUploadHandler = (data: any) => {
        setEstateImages(prevState => [...prevState, {
            originalImageName: data.original_image.fileModifiedName,
            compressedImageName: data.compressed_image.fileModifiedName
        }]);
    }

    const fileRemoveHandler = (index: number) => {
        setEstateImages(estateImages.filter((image, i) => i !== index));
    }

    const onSubmitHandler = () => {
        setIsSubmitting(true);
        if (addPropertyData.title.length === 0) {
            addPropertyData.title = title;
        }
        addPropertyData.estateGalleries = estateImages;
        addPropertyData.estateFeatures = features;
        addPropertyData.contact = contact;
        addPropertyData.location = location;

        propertySchema.validate(addPropertyData, {abortEarly: false})
            .then(() => {
                // Validation succeeded
                setValidationError({});  // Clear any previous validation errors
                if (editPage) {
                    updatePropertyByIdApi(estateId, addPropertyData)
                        .then(() => {
                            toast.success('Property updated successfully');
                            setTimeout(() => {
                                history.push(`/preview/property/${estateId}`);
                            }, 2000);
                        })
                        .catch((error: any) => {
                            toast.error(error.response?.data?.message ?? 'Something went wrong');
                        })
                        .finally(() => {
                            setIsSubmitting(false);
                        });
                } else {
                    postPropertyApi(addPropertyData)
                        .then((response: any) => {
                            toast.success(response.data.message);
                            redirectToAccountPage();
                        })
                        .catch((error: any) => {
                            console.log("error:", error?.response?.data);
                            toast.error(JSON.stringify(error?.response?.data) || 'Failed to add property');
                        })
                        .finally(() => {
                            setIsSubmitting(false);
                        });
                }

            })
            .catch(err => {
                const errorInner = err.inner;
                const errors: { [key: string]: string } = {};

                errorInner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });

                setValidationError(errors);

                const firstErrorName = Object.keys(errors)[0];
                const element = document.getElementById(firstErrorName);
                if (element) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                window.scrollBy(0, -300); // Adjust based on navbar height
                                observer.disconnect();
                            }
                        });
                    });

                    observer.observe(element);
                    element.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    function redirectToAccountPage() {
        setTimeout(() => {
            history.push('/account-properties');
        }, 2000);
    }

    if (error.hasError) {
        return <Page404 title={error.message}/>
    } else {
        return (
            <CommonLayout
                isEdit={editPage}
                isSubmitting={isSubmitting}
                onSubmit={onSubmitHandler}
            >
                {
                    isLoading ?
                        <LoadingSpinner size={20} align='center'/> :
                        <>
                            <h2 className="text-2xl font-semibold">{t('addProperty.title')}</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5'>
                                <FormItem label={t('addProperty.advertising.as')}>
                                    <Select
                                        name='estateAdvertiser'
                                        id='estateAdvertiser'
                                        className={validationError.estateAdvertiser ? 'border-2 border-red-500' : ''}
                                        value={addPropertyData.estateAdvertiser === '' ? 'SELECT' : addPropertyData.estateAdvertiser}
                                        required={true}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="SELECT" disabled>{t('addProperty.select')}</option>
                                        {
                                            advertising.map((item: any) => (
                                                <option key={item.id} value={item.keyword}>
                                                    {item[descriptionField]}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                    <p className={validationError.estateAdvertiser ? "text-sm text-red-500" : 'hidden'}>
                                        {validationError.estateAdvertiser}
                                    </p>
                                </FormItem>

                                <FormItem label={t('addProperty.property.for')}>
                                    <Select
                                        name='estateAdvertisePurpose'
                                        id='estateAdvertisePurpose'
                                        className={validationError?.estateAdvertisePurpose ? 'border-2 border-red-500' : ''}
                                        required={true}
                                        value={addPropertyData.estateAdvertisePurpose}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="" disabled>{t('addProperty.select')}</option>
                                        {
                                            purpose.map((item: any) => (
                                                <option key={item.id}
                                                        value={item.keyword}>{item[descriptionField]}</option>
                                            ))
                                        }
                                    </Select>
                                    <p className={validationError?.estateAdvertisePurpose ? "text-sm text-red-500" : 'hidden'}>
                                        {validationError?.estateAdvertisePurpose}
                                    </p>
                                </FormItem>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4'>
                                <FormItem label={t('addProperty.property.category')}>
                                    <Select
                                        name='estateType'
                                        id='estateType'
                                        className={validationError?.estateType ? 'border-2 border-red-500' : ''}
                                        required={true}
                                        value={addPropertyData.estateType === '' ? 'SELECT' : addPropertyData.estateType}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="SELECT" disabled>{t('addProperty.select')}</option>
                                        {
                                            estateType.map((item: any) => (
                                                <option
                                                    key={item.id}
                                                    value={item.keyword}
                                                >
                                                    {item[descriptionField]}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                    <p className={validationError?.estateType ? "text-sm text-red-500" : 'hidden'}>
                                        {validationError?.estateType}
                                    </p>
                                </FormItem>
                            </div>

                            <div className="mt-4">
                                <h2 className='mb-3'>
                                    {t('addProperty.label.find.address')}
                                </h2>
                                <div className="rounded-xl overflow-hidden">
                                    {
                                        isMapLoaded ?
                                            <div className="relative h-[300px]">
                                                <LocationPicker
                                                    zoom={15}
                                                    defaultLocation={defaultLocation}
                                                    onLocationChange={handleChangeLocation}
                                                />
                                                {/* MapSearchBar Component - This will be centered over the map */}
                                                <div className="absolute top-[8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                                    <MapSearchBar onPlacesChanged={(places) => {
                                                        if (places.length === 0) {
                                                            return;
                                                        }
                                                        const place = places[0];
                                                        const lat = place.geometry?.location?.lat();
                                                        const lng = place.geometry?.location?.lng();

                                                        if (lat !== undefined && lng !== undefined) {
                                                            setDefaultLocation({
                                                                lat: lat,
                                                                lng: lng
                                                            });
                                                            handleChangeLocation({lat, lng});
                                                        }
                                                    }}/>
                                                </div>
                                            </div>
                                            :
                                            <GoogleMapLoader height={300}/>
                                    }
                                </div>
                            </div>
                            <div
                                className={`grid grid-cols-1 md:grid-cols-1 md:gap-5 md:mt-4 ${location.addressLine1 ? '' : 'hidden'}`}>
                                <h2 className='font-bold mb-2'>
                                    {t('addProperty.label.formatted.address')}
                                    <span className='font-normal'>: {`${location.addressLine1}`}</span>
                                </h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4'>
                                <FormItem label={t('addProperty.property.street.no')}>
                                    <Input
                                        id='streetNo'
                                        value={location.streetNo}
                                        name='streetNo'
                                        type='text'
                                        onChange={onLocationChangeHandler}
                                    />
                                </FormItem>
                                <FormItem label={t('addProperty.property.city')}>
                                    <Input
                                        id='city'
                                        value={location.city}
                                        name='city'
                                        type='text'
                                        onChange={onLocationChangeHandler}
                                    />
                                </FormItem>

                                <FormItem label={t('addProperty.property.zipcode')}>
                                    <Input
                                        id='zipCode'
                                        value={location.zipCode}
                                        name='zipCode'
                                        type='text'
                                        onChange={onLocationChangeHandler}
                                    />
                                </FormItem>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-1 md:gap-5 md:mt-4'>
                                <FormItem label={t('addProperty.property.search.keywords')}>
                                    <Input
                                        id='searchKeywords'
                                        value={location.searchKeywords}
                                        name='searchKeywords'
                                        type='text'
                                        onChange={onLocationChangeHandler}
                                    />
                                </FormItem>
                            </div>
                            <FormItem label={t('addProperty.property.available')} className='mt-4'>
                                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-5 mobile:gap-y-3'>
                                    {
                                        available.map((item: any) => (
                                            <div className="flex items-center" key={item.id}>
                                                <input
                                                    id={`estateAvailable${item.id}`}
                                                    type='radio'
                                                    name='estateAvailabilityPolicy'
                                                    value={item.keyword}
                                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent mobile:py2"
                                                    checked={addPropertyData.estateAvailabilityPolicy === item.keyword}
                                                    onChange={onChangeHandler}
                                                />
                                                <label
                                                    htmlFor={`estateAvailable${item.id}`}
                                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer"
                                                >
                                                    {item[descriptionField]}
                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </FormItem>

                            {
                                addPropertyData.estateAvailabilityPolicy === 'By_date' && (
                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5'>
                                        <FormItem label={t('addProperty.property.available.from')} className='mt-4'>
                                            <div className="nc-SetYourAvailabilityData flex justify-center">
                                                <Input
                                                    id='addProperty13'
                                                    name='estateWillBeAvailable'
                                                    className={validationError?.estateWillBeAvailable ? 'border-2 border-red-500' : ''}
                                                    type='date'
                                                    value={addPropertyData.estateWillBeAvailable ?? Date.now()}
                                                    onChange={onChangeHandler}
                                                />
                                            </div>
                                            <p className={validationError?.estateWillBeAvailable ? 'text-sm text-red-500' : 'hidden'}>
                                                {validationError?.estateWillBeAvailable}
                                            </p>
                                        </FormItem>
                                        <FormItem label={t('addProperty.property.available.to')} className='mt-4'>
                                            <div className="nc-SetYourAvailabilityData flex justify-center">
                                                <Input
                                                    id='estateWillBeAvailableTo'
                                                    name='estateWillBeAvailableTo'
                                                    className={validationError?.estateWillBeAvailableTo ? 'border-2 border-red-500' : `${availableTo ? 'text-neutral-400' : ''}`}
                                                    type='date'
                                                    value={addPropertyData.estateWillBeAvailableTo ?? Date.now()}
                                                    onChange={onChangeHandler}
                                                    disabled={availableTo}
                                                />
                                            </div>
                                            <p className={validationError?.estateWillBeAvailableTo ? 'text-sm text-red-500' : 'hidden'}>
                                                {validationError?.estateWillBeAvailableTo}
                                            </p>
                                            <div className='flex mt-2'>
                                                <Checkbox
                                                    name='isAvailableTo'
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        if (event.target.checked) {
                                                            setAvailableTo(true);
                                                        } else {
                                                            setAvailableTo(false);
                                                            setAddPropertyData(prevState => {
                                                                return {
                                                                    ...prevState,
                                                                    estateWillBeAvailableTo: null
                                                                }
                                                            })
                                                        }
                                                    }}

                                                />
                                                <span
                                                    className='ml-2 mt-0.5'>{t('addProperty.property.available.until')}</span>
                                            </div>

                                        </FormItem>
                                    </div>
                                )
                            }

                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4'>
                                <FormItem
                                    className={ESTATE_TYPE_PARKING === addPropertyData.estateType ? 'hidden' : ''}
                                    label={t('addProperty.property.rooms')}
                                >
                                    <Select name='rooms' value={addPropertyData.rooms} onChange={onChangeHandler}>
                                        {
                                            ROOMS.map((item: any, index: number) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))
                                        }
                                    </Select>
                                </FormItem>

                                <FormItem
                                    label={addPropertyData.estateAdvertisePurpose === 'RENT' ? t('addProperty.property.price.monthly') : t('addProperty.property.price')}
                                >
                                    <p className='flex justify-end'>
                                        <span className='absolute p-3 text-sm'>CHF</span>
                                    </p>

                                    <CurrencyInput
                                        name="estatePrice"
                                        type='text'
                                        className={'block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 '}
                                        value={addPropertyData.estatePrice ?? ''}
                                        decimalsLimit={0}
                                        onValueChange={(value) => setAddPropertyData({
                                            ...addPropertyData,
                                            estatePrice: value
                                        })}
                                    />
                                </FormItem>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4 ${ESTATE_TYPE_PARKING === addPropertyData.estateType ? 'hidden' : '' }`}>
                                <FormItem label={t('addProperty.property.living.space')}>
                                    <p className='flex justify-end'>
                                        <span className='absolute p-3 text-sm'>m<sup>2</sup></span>
                                    </p>
                                    <Input value={addPropertyData.livingArea} name='livingArea' type='number'
                                           onChange={onChangeHandler}/>
                                </FormItem>

                                <FormItem label={t('addProperty.property.lot.area')}>
                                    <p className='flex justify-end'>
                                        <span className='absolute p-3 text-sm'>m<sup>2</sup></span>
                                    </p>
                                    <Input value={addPropertyData.estateLotArea} name='estateLotArea' type='number'
                                           onChange={onChangeHandler}/>
                                </FormItem>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4 ${ESTATE_TYPE_PARKING === addPropertyData.estateType ? 'hidden' : '' }`}>
                                <FormItem label={t('addProperty.property.floor')}>
                                    <Input value={addPropertyData.estateFloor}
                                           name='estateFloor'
                                           type='text'
                                           onChange={onChangeHandler}/>
                                </FormItem>

                                <FormItem label={t('addProperty.property.room.height')}>
                                    <p className='flex justify-end'>
                                        <span className='absolute p-3 text-sm'>m</span>
                                    </p>
                                    <Input value={addPropertyData.estateRoomHeight}
                                           name='estateRoomHeight'
                                           type='number'
                                           onChange={onChangeHandler}/>
                                </FormItem>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4 ${ESTATE_TYPE_PARKING === addPropertyData.estateType ? 'hidden' : '' }`}>
                                <FormItem label={t('addProperty.property.floor.space')}>
                                    <p className='flex justify-end'>
                                        <span className='absolute p-3 text-sm'>m<sup>2</sup></span>
                                    </p>
                                    <Input value={addPropertyData.estateFloorSpace}
                                           name='estateFloorSpace'
                                           type='number'
                                           onChange={onChangeHandler}/>
                                </FormItem>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 md:gap-5 md:mt-4 ${ESTATE_TYPE_PARKING === addPropertyData.estateType ? 'hidden' : '' }`}>
                                <FormItem label={t('addProperty.property.year.built')}>
                                    <Input
                                        value={addPropertyData.estateYearOfBuilding}
                                        name='estateYearOfBuilding'
                                        id='estateYearOfBuilding'
                                        placeholder='YYYY'
                                        type='number'
                                        onChange={onChangeHandler}
                                    />
                                    <p className={validationError?.estateYearOfBuilding ? "text-sm text-red-500" : 'hidden'}>
                                        {validationError?.estateYearOfBuilding}
                                    </p>
                                </FormItem>
                                <FormItem label={t('addProperty.property.year.renovated')}>
                                    <Input
                                        value={addPropertyData.estateYearOfRenovation}
                                        name='estateYearOfRenovation'
                                        id='estateYearOfRenovation'
                                        placeholder='YYYY'
                                        type='number'
                                        onChange={onChangeHandler}
                                    />
                                    <p className={validationError?.estateYearOfRenovation ? "text-sm text-red-500" : 'hidden'}>
                                        {validationError?.estateYearOfRenovation}
                                    </p>
                                </FormItem>
                            </div>

                            <div className={`md:mt-12 ${ESTATE_TYPE_PARKING === addPropertyData.estateType ? 'hidden' : '' }`}>
                                <h2 className='text-2xl font-semibold'>
                                    {t('addProperty.property.features')}
                                </h2>
                                <FormItem>
                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                                        {
                                            estateFeatures.map((item: any, index: number) => (
                                                <Checkbox
                                                    key={index}
                                                    name={item.featuresTitle}
                                                    value={item.id}
                                                    className='cursor-pointer'
                                                    checked={features.filter(f => f.id === item.id).length > 0}
                                                    onChange={() => onFeatureChangeHandler(item)}
                                                    label={i18n.language === "en" ? item.featuresTitle : item["featuresTitle" + selectedLang]}
                                                />
                                            ))
                                        }
                                    </div>
                                </FormItem>
                            </div>

                            <div className='md:mt-12'>
                                <h2 className='text-2xl font-semibold'>
                                    {t('addProperty.property.photos.and.docs')}
                                </h2>
                                <div className="mt-4">
                                    {
                                        estateImages?.map((image: EstateImageType, index: number) => (
                                            <div key={index} className='inline-block my-4'>
                                                <ButtonClose size={5} className='bg-white absolute ml-2 text-red-500'
                                                             onClick={() => fileRemoveHandler(index)}/>
                                                <NcImage containerClassName='mx-2 border-4 h-20 w-36'
                                                         src={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + image.compressedImageName}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div id='estateImages' className="grid grid-cols-4">
                                    <FormItem className='mt-4 col-span-4 px-3'>
                                        <EstateImageUploader
                                            className={validationError?.estateImages ? 'border-2 border-red-500' : ''}
                                            uploadApisResponse={fileUploadHandler}/>
                                        <p className={validationError?.estateImages ? 'text-sm text-red-500' : 'hidden'}>
                                            {validationError?.estateImages}
                                        </p>
                                    </FormItem>

                                </div>
                            </div>

                            <FormItem className='mt-4' label={
                                <div className='flex'>
                                    Video&nbsp;
                                    <div className='pb-1'>
                                        <VideoInstructionPopup/>
                                    </div>
                                </div>
                            }>
                                <Input value={addPropertyData.videoUrl} name='videoUrl' type='text'
                                       onChange={onChangeHandler}/>
                                <p className='text-sm'>{t('addProperty.property.video.hint')}</p>
                            </FormItem>

                            <div className='grid grid-cols-1 md:mt-4'>
                                <h2 className='text-2xl font-semibold'>
                                    {t('addProperty.property.description')}
                                </h2>
                                <FormItem className='mt-4' label={t('addProperty.property.desc.title')}>
                                    <Input id='title'
                                           name='title'
                                           className={validationError?.title ? 'border-2 border-red-500' : ''}
                                           value={addPropertyData.title}
                                           placeholder={title}
                                           type='text'
                                           onChange={onChangeHandler}/>
                                    <p className={validationError?.title ? 'text-sm text-red-500' : 'hidden'}>
                                        {validationError?.title}
                                    </p>
                                </FormItem>
                                <FormItem className='mt-4' label={t('addProperty.property.description')}>
                                    <CkeditorCustom data={addPropertyData.description}
                                                    onChange={onDescriptionChangeHandler}/>
                                    <p className={validationError?.description ? 'text-sm text-red-500' : 'hidden'}>
                                        {validationError?.description}
                                    </p>
                                </FormItem>
                            </div>

                            <div className='md:mt-12'>
                                <h2 className='text-2xl font-semibold inline-block'>
                                    {t('addProperty.property.contact')}
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-1 md:gap-5 mt-4'>
                                    <FormItem label={t('addProperty.property.contact.name')}>
                                        <Input
                                            id='name'
                                            name='name'
                                            className={validationError?.['contact.name'] ? 'border-2 border-red-500' : ''}
                                            value={contact.name}
                                            type='text'
                                            onChange={onContactChangeHandler}
                                        />
                                        <p className={validationError?.['contact.name'] ? 'text-sm text-red-500' : 'hidden'}>
                                            {validationError?.['contact.name']}
                                        </p>
                                    </FormItem>
                                    <FormItem label={t('addProperty.property.contact.email')}>
                                        <Input
                                            id='email'
                                            className={validationError?.['contact.email'] ? 'border-2 border-red-500' : ''}
                                            value={contact.email}
                                            name='email'
                                            type='text'
                                            onChange={onContactChangeHandler}
                                        />
                                        <p className={validationError?.['contact.email'] ? 'text-sm text-red-500' : 'hidden'}>
                                            {validationError?.['contact.email']}
                                        </p>
                                    </FormItem>
                                    <FormItem label={t('addProperty.property.contact.phone')}>
                                        <Input
                                            id='phone'
                                            value={contact.phone}
                                            name='phone'
                                            type='text'
                                            onChange={onContactChangeHandler}
                                        />
                                    </FormItem>
                                    <FormItem>
                                        <div className='flex'>
                                            <Checkbox
                                                name='dispalyAsPublic'
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    if (event.target.checked) {
                                                        setContact(prevState => {
                                                            return {...prevState, displayAsPublic: true}
                                                        })
                                                    } else {
                                                        setContact(prevState => {
                                                            return {...prevState, displayAsPublic: false}
                                                        })
                                                    }
                                                }}
                                                label={t('display-as-public')}
                                            />
                                        </div>
                                    </FormItem>
                                </div>
                            </div>
                        </>
                }
            </CommonLayout>
        );
    }
};

export default AddAndEditProperty;
