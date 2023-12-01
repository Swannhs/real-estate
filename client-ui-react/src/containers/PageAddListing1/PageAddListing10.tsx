import StayCard from "../../components/StayCard/StayCard";
import {DEMO_STAY_LISTINGS} from "../../data/listings";
import React, {FC, useEffect, useState} from "react";
import CommonLayout from "./CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {addPropertyActions, getPropertiesByUserActions} from "../../redux/actions/propertyActions";
import {StayDataType} from "../../data/types";
import ncNanoId from "../../utils/ncNanoId";
import {PROPERTY} from "../../redux/actionTypes";
import {toast} from "react-toastify";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {useParams} from "react-router-dom";
import {updatePropertyByIdApi} from "../../apis/Property";

export interface PageAddListing10Props {
    history?: any
}

const PageAddListing10: FC<PageAddListing10Props> = ({history}) => {
    const dispatch = useDispatch<any>();
    const property = useSelector((state: any) => state.property.addProperty);
    const {loading, response, status, error} = property;
    const [addSuccess, setAddSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {id} = useParams<any>();
    const path = window.location.pathname.toString().split('/')[2];

    useEffect(() => {
        if (loading) {
            return;
        }
        if (status) {
            toast.success('Property has been added successfully');
            setIsLoading(false);
            setAddSuccess(true);
            dispatch({type: PROPERTY.ADD_PROPERTY_SUCCESSFUL});
            dispatch(getPropertiesByUserActions(1, 8));
            setTimeout(() => {
                history.push(`/realestateandhomes-detail/${response.id}`)
            }, 1000);
            return;
        }
        if (error) {
            setIsLoading(false);
            toast.error(error?.data !== '' ? error?.data : "Failed to add property try again");
            setTimeout(() => {
                history.push('/property/add/1');
            }, 3000);
        }
    }, [loading, response, error]);

    let galleryImgs: string[] = [];
    galleryImgs.push(property.featuredImage.featuredImageUrl);
    galleryImgs = [...galleryImgs, ...property.galleryImgs.galleryImgsUrls];

    const preview: StayDataType = {
        ...DEMO_STAY_LISTINGS[0],
        id: ncNanoId(),
        galleryImgs: galleryImgs,
        listingCategory: {
            ...DEMO_STAY_LISTINGS[0].listingCategory,
            name: property.propertyType
        },
        address: `${property.location.cityName}, ${property.location.state}, ${property.location.countryName}`,
        bedrooms: property.numberOfBedrooms,
        title: property.title,
        price: property.pricePerSquareFit ?? 0,
    }

    useEffect(() => {
        let propertyPreview = {
            ...property,
            preview
        };
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: propertyPreview});
    }, []);

    const onSubmitHandler = () => {
        setIsLoading(true);
        let rules: Object[] = []

        property.estateAdditionalRules?.map((rule: string) => {
            rules.push({
                customRule: rule
            })
            return null
        })

        let estateModel = {
            location: property.location,
            estateType: property?.estateType,
            estatePurpose: property?.estatePurpose,
            estateName: property?.estateName,
            floorSpace: property?.floorSpace,
            estateGeneration: property?.estateGeneration,
            numberOfBalconies: property?.numberOfBalconies,
            numberOfBathrooms: property?.numberOfBathrooms,
            numberOfBedrooms: property?.numberOfBedrooms,
            numberOfGarages: property?.numberOfGarages,
            numberOfParkingSpace: property?.numberOfParkingSpace,
            availableDateFrom: property.selectedDate?.startDate ? property.selectedDate.startDate.toDate() : null,
            availableDateTo: property.selectedDate?.endDate ? property.selectedDate.endDate.toDate() : null,
            pricePerSquareFit: parseFloat(property?.pricePerSquareFit),
            maxGuest: property?.maxGuest,
            estateAdditionalRules: rules,
            estateRules: property.estateRules,
            estateAmenities: property?.estateAmenities
        }

        let formData = new FormData();
        formData.append('estateModelDto', new Blob([JSON.stringify(estateModel)], {type: 'application/json'}));
        formData.append('featuredImage', property.featuredImage.featuredImageFile);
        property.galleryImgs.galleryImgsFile?.map((image: File) => {
            formData.append('galleryImage', image);
            return null;
        });


        if (path === 'edit') {
            updatePropertyByIdApi(id, estateModel)
                .then(response => {
                    
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            dispatch(addPropertyActions(formData));
        }
    }

    if (addSuccess) {
        return (
            <CommonLayout
                index='10'
                backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/9/${id}` : '/property/add/9'}`}
                nextHref="#"
            >
                <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Excellent, congratulations on completing the listing, it is waiting
                        to be reviewed for publication
                    </span>
            </CommonLayout>
        )
    } else {
        return (
            <CommonLayout
                nextBtnText={path === 'edit' ? 'Update Property' : 'Publish Property'}
                index="10"
                backtHref="/add-listing-9"
                nextHref="#"
                onSubmitting={isLoading}
                onSubmit={onSubmitHandler}
            >
                {
                    isLoading ?
                        <LoadingSpinner size={20} align='center'/> :
                        <>
                            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                            {/* FORM */}
                            <div>
                                <h3 className="text-lg font-semibold">This is your listing</h3>
                                <div className="max-w-xs">
                                    <StayCard
                                        className="mt-8"
                                        data={{...preview, reviewStart: 0}}
                                    />
                                </div>
                                {/*<div className="flex items-center space-x-5 mt-8">*/}
                                {/*    <ButtonSecondary href="/add-listing-1">*/}
                                {/*        <svg*/}
                                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                                {/*            className="h-5 w-5"*/}
                                {/*            fill="none"*/}
                                {/*            viewBox="0 0 24 24"*/}
                                {/*            stroke="currentColor"*/}
                                {/*        >*/}
                                {/*            <path*/}
                                {/*                strokeLinecap="round"*/}
                                {/*                strokeLinejoin="round"*/}
                                {/*                strokeWidth={1.5}*/}
                                {/*                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"*/}
                                {/*            />*/}
                                {/*        </svg>*/}
                                {/*        <span className="ml-3">Edit</span>*/}
                                {/*    </ButtonSecondary>*/}

                                {/*    <Link to='/account-savelists'>*/}
                                {/*        <ButtonPrimary>*/}
                                {/*            <svg*/}
                                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                                {/*                className="h-5 w-5"*/}
                                {/*                fill="none"*/}
                                {/*                viewBox="0 0 24 24"*/}
                                {/*                stroke="currentColor"*/}
                                {/*            >*/}
                                {/*                <path*/}
                                {/*                    strokeLinecap="round"*/}
                                {/*                    strokeLinejoin="round"*/}
                                {/*                    strokeWidth={1.5}*/}
                                {/*                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"*/}
                                {/*                />*/}
                                {/*                <path*/}
                                {/*                    strokeLinecap="round"*/}
                                {/*                    strokeLinejoin="round"*/}
                                {/*                    strokeWidth={1.5}*/}
                                {/*                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"*/}
                                {/*                />*/}
                                {/*            </svg>*/}
                                {/*            <span className="ml-3">Preview</span>*/}
                                {/*        </ButtonPrimary>*/}
                                {/*    </Link>*/}
                                {/*</div>*/}
                            </div>
                            {/*  */}
                        </>
                }
            </CommonLayout>
        );
    }
};

export default PageAddListing10;
