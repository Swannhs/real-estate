import NcInputNumber from "../../components/NcInputNumber/NcInputNumber";
import React, {FC, useState} from "react";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import Input from "../../shared/Input/Input";
import {useParams} from "react-router-dom";

export interface PageAddListing3Props {
}

const PageAddListing3: FC<PageAddListing3Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [addProperty, setAddProperty] = useState(property);
    const {id} = useParams<any>();

    const onChangeHandler = (event: any) => {
        setAddProperty({
                ...addProperty,
                [event.target.name]: event.target.value
            }
        );
    }

    const onNcChangeHandler = (name: string, value: any) => {
        setAddProperty({
            ...addProperty,
            [name]: value
        })
    }

    const onSubmitHandler = () => {
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty});
    }
    return (
        <CommonLayout
            index="03"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/4/${id}` : '/property/add/4'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/2/${id}` : '/property/add/2'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <h2 className="text-2xl font-semibold">Size of your location</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">
                    <FormItem
                        label="Floor Space"
                    >
                        <Input name='floorSpace' type='number' value={addProperty.floorSpace}
                               onChange={onChangeHandler}/>
                    </FormItem>
                    <FormItem
                        label="Estate Generation"
                    >
                        <Input name='estateGeneration' value={addProperty.estateGeneration} onChange={onChangeHandler}/>
                    </FormItem>

                    <NcInputNumber label="Balconies" onChange={value => onNcChangeHandler('numberOfBalconies', value)}
                                   defaultValue={property.numberOfBalconies ?? 0}/>
                    <NcInputNumber label="Bathrooms" onChange={value => onNcChangeHandler('numberOfBathrooms', value)}
                                   defaultValue={property.numberOfBathrooms ?? 0}/>
                    <NcInputNumber label="Bedrooms" onChange={value => onNcChangeHandler('numberOfBedrooms', value)}
                                   defaultValue={property.numberOfBedrooms ?? 0}/>
                    <NcInputNumber label="Garages" onChange={value => onNcChangeHandler('numberOfGarages', value)}
                                   defaultValue={property.numberOfGarages ?? 0}/>
                    <NcInputNumber label="Parking Space"
                                   onChange={value => onNcChangeHandler('numberOfParkingSpace', value)}
                                   defaultValue={property.numberOfParkingSpace ?? 0}/>


                    {/*<NcInputNumber label="Guests" onChange={value => onNcChangeHandler('guests', value)}*/}
                    {/*               defaultValue={property.guests ?? 0}/>*/}
                    {/*<NcInputNumber label="Bedroom" onChange={value => onNcChangeHandler('bedroom', value)}*/}
                    {/*               defaultValue={property.bedroom ?? 0}/>*/}
                    {/*<NcInputNumber label="Beds" onChange={value => onNcChangeHandler('beds', value)}*/}
                    {/*               defaultValue={property.beds ?? 0}/>*/}
                    {/*<NcInputNumber label="Bathroom" onChange={value => onNcChangeHandler('bathroom', value)}*/}
                    {/*               defaultValue={property.bathroom ?? 0}/>*/}
                    {/*<NcInputNumber label="Kitchen" onChange={value => onNcChangeHandler('kitchen', value)}*/}
                    {/*               defaultValue={property.kitchen ?? 0}/>*/}
                </div>
            </>
        </CommonLayout>
    );
};

export default PageAddListing3;
