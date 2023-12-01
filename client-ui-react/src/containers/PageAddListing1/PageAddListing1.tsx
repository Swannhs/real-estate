import React, {FC, useEffect, useState} from "react";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import {useParams} from "react-router-dom";
import {getPropertyByIdApi} from "../../apis/Property";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {toast} from "react-toastify";

export interface PageAddListing1Props {
}

const propertyTypes = [
    {value: "APARTMENT", label: "Apartment"},
    {value: "HOUSE", label: "House"},
    {value: "LAND", label: "Land"},
    {value: "COMMERCIAL", label: "Commercial"},
    {value: "PARKING_SPACE ", label: "Parking Space"},
];

const estatePurposesTypes = [
    {value: "SELL", label: "Sell"},
    {value: "RENT", label: "Rent"},
]

const PageAddListing1: FC<PageAddListing1Props> = (props: any) => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [addProperty, setAddProperty] = useState<any>(property);
    const {id} = useParams<any>();

    useEffect(() => {
        if (window.location.pathname.toString().split('/')[2] === 'edit') {
            getPropertyByIdApi(id)
                .then(response => {
                    setAddProperty({
                        ...addProperty,
                        estateName: response.data?.estateName ?? '',
                        estateType: response.data?.estateType ?? '',
                        estatePurpose: response.data?.estatePurpose ?? '',
                        floorSpace: response.data?.floorSpace ?? '',
                        estateGeneration: response.data?.estateGeneration ?? '',
                        numberOfBalconies: response.data?.numberOfBalconies ?? 0,
                        numberOfBathrooms: response.data?.numberOfBathrooms ?? 0,
                        numberOfBedrooms: response.data?.numberOfBedrooms ?? 0,
                        numberOfGarages: response.data?.numberOfGarages ?? 0,
                        numberOfParkingSpace: response.data?.numberOfParkingSpace ?? 0,
                        pricePerSquareFit: response.data?.pricePerSquareFit ?? '',
                        maxGuest: response.data?.maxGuest ?? 0,
                        estateRules: response.data?.estateRules ?? {},
                        estateAmenities: response.data?.estateAmenities ?? {}
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    toast.error(error.response?.data?.message);
                    setTimeout(() => {
                        props.history.push('/account-properties')
                    }, 2000);
                });
        } else {
            setIsLoading(false);
        }
    }, [])

    const onChangeHandler = (event: any) => {
        setAddProperty({
                ...addProperty,
                [event.target.name]: event.target.value
            }
        );
    }

    const onSubmitHandler = () => {
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty});
    }

    return (
        <CommonLayout
            index="01"
            backtHref="/account"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/2/${id}` : '/property/add/2'}`}
            onSubmit={onSubmitHandler}
        >
            {
                isLoading ?
                    <LoadingSpinner size={20} align='center'/> :
                    <>
                        <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
                        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                        {/* FORM */}
                        <div className="space-y-8">
                            {/* ITEM */}
                            <FormItem
                                label="Choose a property type"
                                desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
                            >
                                <Select name='estateType'
                                        defaultValue={addProperty.estateType === '' ? 'SELECT' : addProperty.estateType}
                                        onChange={onChangeHandler}>
                                    <option disabled={true} value="SELECT">Select a property type</option>
                                    {
                                        propertyTypes.map((item: any) => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </Select>
                            </FormItem>
                            <FormItem
                                label="Place name"
                                desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
                            >
                                <Input name='estateName' value={addProperty.estateName} onChange={onChangeHandler}
                                       placeholder="Estate Name"/>
                            </FormItem>
                            <FormItem
                                label="Estate Purpose"
                                desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
                            >
                                <Select name='estatePurpose'
                                        defaultValue={addProperty.estatePurpose === '' ? 'SELECT' : addProperty.estatePurpose}
                                        onChange={onChangeHandler}>
                                    <option disabled={true} value="SELECT">Select a estate purpose</option>
                                    {
                                        estatePurposesTypes.map((item: any) => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </Select>
                            </FormItem>
                        </div>
                    </>
            }
        </CommonLayout>
    );
};

export default PageAddListing1;
