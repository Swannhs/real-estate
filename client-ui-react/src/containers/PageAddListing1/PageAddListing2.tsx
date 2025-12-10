import {LocationMarkerIcon} from "@heroicons/react/solid";
import Label from "../../components/Label/Label";
import React, {FC, useState} from "react";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import MapPicker from "react-google-map-picker";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {useJsApiLoader} from "@react-google-maps/api";
import {useParams} from "react-router-dom";

// @ts-ignore
import Geocode from "react-geocode";

// Ensure the API key is available before setting it
const googleApiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY as string;
if (googleApiKey) {
    Geocode.setApiKey(googleApiKey);
    Geocode.enableDebug();
}

// Example usage of Geocode (commented out until accounts/billing for Google Maps API is set up)
// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//     (response: { results: { formatted_address: any; }[]; }) => {
//         const address = response.results[0].formatted_address;
//         console.log(address);
//     },
//     (error: any) => {
//         console.error(error);
//     }
// );


export interface PageAddListing2Props {
}

const PageAddListing2: FC<PageAddListing2Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [addProperty, setAddProperty] = useState(property);
    const {id} = useParams<any>();
    const [defaultLocation] = useState({lat: 10, lng: 106});

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-picker',
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY as string,
    });

    const onChangeHandler = (event: { target: any }) => {
        setAddProperty({
            ...addProperty,
            location: {
                ...addProperty.location,
                [event.target.name]: event.target.value
            }
        })
    }

    const onCountryChangeHandler = (event: { target: any }) => {
        setAddProperty({
            ...addProperty,
            location: {
                ...addProperty.location,
                countryCode: (event.target.childNodes[event.target.selectedIndex]).getAttribute('id'),
                countryName: event.target.value,
            }
        })
    }

    const handleChangeLocation = (lat: number, lng: number) => {
        setAddProperty({
            ...addProperty,
            location: {
                ...addProperty.location,
                latitude: lat,
                longitude: lng,
            }
        })
    }

    const onSubmitHandler = () => {
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty});
    }
    return (
        <CommonLayout
            index="02"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/3/${id}` : '/property/add/3'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/1/${id}` : '/property/add/1'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <h2 className="text-2xl font-semibold">Your place location</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <form className="space-y-8" autoComplete='off'>
                    <ButtonSecondary>
                        <LocationMarkerIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400"/>
                        <span className="ml-3">Use current location (not implemented)</span>
                    </ButtonSecondary>
                    {/* ITEM */}
                    <FormItem label="Country/Region">
                        <Select
                            name='country'
                            defaultValue={addProperty.location?.countryName === '' ? 'SELECT' : addProperty.location?.countryName}
                            onChange={onCountryChangeHandler}>
                            <option disabled={true} value="SELECT"> Select Country</option>
                            <option id='100' value="Viet Nam">Viet Nam</option>
                            <option id='101' value="Thailand">Thailand</option>
                            <option id='102' value="France">France</option>
                            <option id='103' value="Singapore">Singapore</option>
                            <option id='104' value="Jappan">Jappan</option>
                            <option id='105' value="Korea">Korea</option>
                        </Select>
                    </FormItem>
                    {/*<FormItem label="Street">*/}
                    {/*    <Input name='street' value={addProperty.location.street ?? ''} onChange={onChangeHandler}*/}
                    {/*           placeholder=""*/}
                    {/*           disabled={true}/>*/}
                    {/*</FormItem>*/}
                    {/*<FormItem label="Room number (optional)">*/}
                    {/*    <Input name='roomNumber' value={addProperty.location.roomNumber ?? ''}*/}
                    {/*           onChange={onChangeHandler}*/}
                    {/*           disabled={true}/>*/}
                    {/*</FormItem>*/}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                        <FormItem label="City">
                            <Input
                                name='cityName'
                                value={addProperty.location?.cityName}
                                onChange={onChangeHandler}/>
                        </FormItem>
                        <FormItem label="State">
                            <Input
                                name='state'
                                value={addProperty.location?.state}
                                onChange={onChangeHandler}/>
                        </FormItem>
                        <FormItem label="Zip code">
                            <Input
                                name='zipCode'
                                defaultValue={addProperty.location?.zipCode}
                                onChange={onChangeHandler}/>
                        </FormItem>
                    </div>
                    <div>
                        <Label>Detailed address</Label>
                        <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                          1110 Pennsylvania Avenue NW, Washington, DC 20230
                        </span>
                        <div className="mt-4">
                            <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                                <div className="rounded-xl overflow-hidden">
                                    {
                                        isLoaded ?
                                            <MapPicker
                                                zoom={10}
                                                defaultLocation={defaultLocation}
                                                style={{height: '700px'}}
                                                onChangeLocation={handleChangeLocation}
                                                apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY as string}/> :
                                            <LoadingSpinner align='center' size={20}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        </CommonLayout>
    );
};

export default PageAddListing2;
