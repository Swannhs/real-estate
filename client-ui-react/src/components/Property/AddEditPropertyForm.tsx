import React, {useState} from 'react';
import FormItem from "../../containers/PageAddListing1/FormItem";
import Select from "../../shared/Select/Select";
import {PropertySelectType} from "../HeroSearchForm/RealEstateSearchForm";
import MapSearchBar from "../SearchBar/MapSearchBar";
import MapPicker from "react-google-map-picker";
import GoogleMapLoader from "../../shared/Loader/GoogleMapLoader";
import Input from "../../shared/Input/Input";
import Checkbox from "../../shared/Checkbox/Checkbox";
import CurrencyInput from "react-currency-input-field";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import NcImage from "../../shared/NcImage/NcImage";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

export interface AddEditPropertyFormPropsType {
    editPage?: boolean;
    isSubmitting?: boolean;
    onSubmit?: (data: any) => void;
    isLoading?: boolean;
}

const PropertySchema = Yup.object().shape({
    test: Yup.string()
        .required('Advertising type is required')
        .min(6, 'Advertising type must be more than 5 characters'),
    estateAdvertisingTypeId: Yup.string()
        .required('Advertising type is required'),
    estatePurpose: Yup.string()
        .required('Property purpose is required'),
    estateCategoryId: Yup.string()
        .required('Property category is required'),
    location: Yup.object().shape({
        streetNo: Yup.string()
            .required('Street number is required'),
        city: Yup.string()
            .required('City is required'),
        zipCode: Yup.string()
            .required('ZIP code is required'),
    }),
    estateAvailable: Yup.string()
        .required('Availability is required'),
    rooms: Yup.number()
        .required('Number of rooms is required'),
    estatePrice: Yup.number()
        .required('Price is required'),
});

const AddEditPropertyForm = () => {
    const {t} = useTranslation();
    const ADD_PROPERTY_TYPE: PropertySelectType[] = [
        {
            name: t('search.type.rent.out'),
            value: "RENT",
            description: t('search.type.rent.desc'),
        },
        {
            name: t('Sell'),
            value: "SELL",
            description: t('search.type.buy.desc'),
        }
    ]
    const [test, setTest] = useState<string>('');
    const [errors, setErrors] = React.useState<Object>({
        test: undefined,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        PropertySchema.validate({ test })
            .then(() => {
                // Handle successful validation
                console.log("Form is valid!");
                // ... (Your code to handle successful form submission)
            })
            .catch(err => {
                // Handle validation errors
                setErrors({ test: err.message });
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update the test state with the new input value
        setTest(value);

        // Validate the input field
        PropertySchema.validateAt(name, { [name]: value })
            .then(() => {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: undefined,
                }));
            })
            .catch(err => {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: err.message,
                }));
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormItem label={t('Advertising Type')}>
                    <Input
                        name="test"
                        value={test}
                        onChange={handleInputChange}
                        placeholder={t('Enter advertising type')}
                    />
                    {/* 4. Display the validation error if present. */}
                    {/*{errors.test && <span style={{ color: 'red' }}>{errors.test}</span>}*/}
                </FormItem>
            </form>
        </>
    );
};

export default AddEditPropertyForm;