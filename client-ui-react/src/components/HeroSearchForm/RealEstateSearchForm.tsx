import React, {FC, useEffect, useState} from "react";
import LocationInput from "./LocationInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PriceRangeInput from "./PriceRangeInput";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {useStaticData} from "../../hooks/contextApi/StaticDataContext";

export interface RealEstateSearchFormProps {
    haveDefaultValue?: boolean;
}

export interface PriceRangeType {
    priceStart: number;
    priceEnd: number;
}

export interface PropertySelectType {
    name: string;
    description: string;
    value: string;
}

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({haveDefaultValue = false}) => {
    const {success, estateType, purpose} = useStaticData();
    let history = useHistory<any>();
    const [locationInputValue, setLocationInputValue] = useState("");
    const {t, i18n} = useTranslation();
    const selectedLang: string = i18n.language.charAt(0).toUpperCase()+i18n.language.slice(1);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedEstatePurpose, setSelectedEstatePurpose] = useState<string[]>([]);

    useEffect(() => {
        // if (success) {
        //     onTypeOfPropertyChange(estateType);
        // }
        if (haveDefaultValue) {
            setLocationInputValue('');
        }
    }, [success]);

    let priceRange: PriceRangeType = {
        priceStart: 0,
        priceEnd: 10000000,
    }

    const onTypeOfPropertyChange = (selectedTypes: string[]) => {
        setSelectedCategories(selectedTypes);
    }

    const onPurposeChange = (selectedPurpose: string[]) => {
        setSelectedEstatePurpose(selectedPurpose);
    }

    const onPriceChangeHandler = (price: any) => {
        priceRange = {
            priceStart: price[0],
            priceEnd: price[1],
        }
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        history.push({
            pathname: '/search',
            search: `?loc=${locationInputValue}&pur=${selectedEstatePurpose.join()}&cat=${selectedCategories.join()}&min=${priceRange.priceStart}&max=${priceRange.priceEnd}&page=1`,
        });
    }

    const renderForm = () => {
        return (
            <form onSubmit={onSubmitHandler}
                  className="w-full xl:mt-8 flex lg:flex-row lg:items-center rounded-3xl lg:rounded-full
                shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
                <LocationInput
                    defaultValue={locationInputValue}
                    onChange={(e) => setLocationInputValue(e)}
                    placeHolder={t('search.location')}
                    desc={t('search.locationDesc')}
                    resentSearchTitle={t('search.resentSearch')}
                    className="flex-[1.5]"
                />
                <PropertyTypeSelect
                    lang={selectedLang}
                    name={t('search.type')}
                    items={purpose}
                    defaultValue="RENT"
                    onChange={onPurposeChange}
                >
                    <span title={t('type')}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="24"
                             height="24"
                             viewBox="0 0 20 20" fill="currentColor"
                             className="nc-icon-field nc-icon-field-2 w-7 h-7"
                        >
                            <path fillRule="evenodd"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 6a2.5 2.5 0 00-4-3 2.5 2.5 0 00-4 3H3.25C2.56 6 2 6.56 2 7.25v.5C2 8.44 2.56 9 3.25 9h6V6h1.5v3h6C17.44 9 18 8.44 18 7.75v-.5C18 6.56 17.44 6 16.75 6H14zm-1-1.5a1 1 0 01-1 1h-1v-1a1 1 0 112 0zm-6 0a1 1 0 001 1h1v-1a1 1 0 00-2 0z"
                                  clipRule="evenodd"/>
                            <path
                                d="M9.25 10.5H3v4.75A2.75 2.75 0 005.75 18h3.5v-7.5zM10.75 18v-7.5H17v4.75A2.75 2.75 0 0114.25 18h-3.5z"/>
                        </svg>
                    </span>
                </PropertyTypeSelect>

                <PropertyTypeSelect
                    lang={selectedLang}
                    name={t('search.category')}
                    items={estateType}
                    onChange={onTypeOfPropertyChange}
                >
                    <span title={t('category')}>
                        <svg
                            className="nc-icon-field nc-icon-field-2"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
                            ></path>
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
                            ></path>
                        </svg>
                    </span>
                </PropertyTypeSelect>
                <PriceRangeInput priceRangeTitle={t('search.price.range.title')} fieldClassName=''
                                 onChange={onPriceChangeHandler}/>
            </form>
        );
    };

    return renderForm();
};

export default RealEstateSearchForm;
