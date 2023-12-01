import React, {FC, useState} from "react";
import Checkbox from "../../shared/Checkbox/Checkbox";
import CommonLayout from "./CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import {useParams} from "react-router-dom";

export interface PageAddListing4Props {
}

const PageAddListing4: FC<PageAddListing4Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [estateAmenities, setEstateAmenities] = useState(property.estateAmenities);
    const {id} = useParams<any>();

    const onCheckedHandler = (event: any) => {
        setEstateAmenities({
            ...estateAmenities,
            [event.target.name]: event.target.checked
        });
    }

    const onSubmitHandler = () => {
        let newProperty = {
            ...property,
            estateAmenities
        }
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: newProperty});
    }

    return (
        <CommonLayout
            index="04"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/5/${id}` : '/property/add/5'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/3/${id}` : '/property/add/3'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <div>
                    <h2 className="text-2xl font-semibold">Amenities </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Many customers have searched for accommodation based on amenities
                        criteria
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">
                    {/* ITEM */}
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            General amenities
                        </label>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Checkbox label="Wifi" name="hasWifi" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasWifi}/>
                            <Checkbox label="Internet" name="hasInternet" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasInternet}/>
                            <Checkbox label="TV" name="hasTv" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasTv}/>
                            <Checkbox label="Air conditioning" name='hasAirConditioning' onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasAirConditioning}/>
                            <Checkbox label="Fan" name="hasFan" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasFan}/>
                            <Checkbox label="Private entrance" name='hasAirConditioning' onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasAirConditioning}/>
                            <Checkbox label="Dryer" name="hasDryer" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasDryer}/>
                            <Checkbox label="Heater" name="hasHeater" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasHeater}/>
                            <Checkbox label="Washing machine" name="hasWashingMachine" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasWashingMachine}/>
                            <Checkbox label="Baby cot" name="haBabyCot" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.haBabyCot}/>
                            <Checkbox label="Fridge" name="hasFridge" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasFridge}/>
                            <Checkbox label="Fire Siren" name="hasFireSiren" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasFireSiren}/>
                            <Checkbox label="Fire Extinguisher" name="hasFireExtinguisher" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasFireExtinguisher}/>
                            <Checkbox label="Anti Theft Key" name="hasAntiTheftKey" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasAntiTheftKey}/>
                            <Checkbox label="Basement" name="hasBasement" onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasBasement}/>
                            <Checkbox label="Wheel Chair Accessibility" name="hasWheelChairAccessibility"
                                      onChange={onCheckedHandler}
                                      defaultChecked={property.estateAmenities.hasWheelChairAccessibility}/>
                        </div>
                    </div>

                    {/*
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            Other amenities
                        </label>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Checkbox label="Wardrobe" name="wardrobe" onChange={onCheckedHandler} defaultChecked={property.fridge}/>
                            <Checkbox label="Cloth hook" name="Cloth hook" onChange={onCheckedHandler} defaultChecked={property.fridge}/>
                            <Checkbox
                                label="Extra cushion"
                                name="Extra cushion"
                                onChange={onCheckedHandler}
                                defaultChecked={property.fridge}
                            />
                            <Checkbox label="Gas stove" name="Gas stove" defaultChecked={property.fridge}/>
                            <Checkbox label="Toilet paper" name="Toilet paper" defaultChecked={property.fridge}/>
                            <Checkbox
                                label="Free toiletries"
                                name="Free toiletries"
                                onChange={onCheckedHandler}
                                defaultChecked={property.fridge}
                            />
                            <Checkbox label="Makeup table" name="makeupTable" onChange={onCheckedHandler} defaultChecked={property.makeupTable}/>
                            <Checkbox label="Hot pot" name="hotPot" onChange={onCheckedHandler} defaultChecked={property.hotPot}/>
                            <Checkbox label="Bathroom heaters" name="bathroomHeaters" onChange={onCheckedHandler} defaultChecked={property.bathroomHeaters}/>
                            <Checkbox label="Kettle" name="kettle" onChange={onCheckedHandler} defaultChecked={property.kettle}/>
                            <Checkbox label="Dishwasher" name="dishwasher" onChange={onCheckedHandler} defaultChecked={property.dishwasher}/>
                            <Checkbox label="BBQ grill" name="bbqGrill" onChange={onCheckedHandler} defaultChecked={property.bbqGrill}/>
                            <Checkbox label="Toaster" name="toaster" onChange={onCheckedHandler} defaultChecked={property.toaster}/>
                            <Checkbox label="Towel" name="towel" onChange={onCheckedHandler} defaultChecked={property.towel}/>
                            <Checkbox label="Dining table" name="diningTable" onChange={onCheckedHandler} defaultChecked={property.diningTable}/>
                        </div>
                    </div>

                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            Safe amenities
                        </label>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Checkbox label="Fire siren" name="fireSiren" onChange={onCheckedHandler} defaultChecked={property.diningTable}/>
                            <Checkbox label="Fire extinguisher" name="fireExtinguisher" onChange={onCheckedHandler} defaultChecked={property.fireExtinguisher}/>
                            <Checkbox label="Anti-theft key" name="antiTheftKey" onChange={onCheckedHandler} defaultChecked={property.antiTheftKey}/>
                            <Checkbox label="Safe vault" name="safeVault" onChange={onCheckedHandler} defaultChecked={property.safeVault}/>
                        </div>
                    </div>
                    */}
                </div>
            </>
        </CommonLayout>
    );
};

export default PageAddListing4;
