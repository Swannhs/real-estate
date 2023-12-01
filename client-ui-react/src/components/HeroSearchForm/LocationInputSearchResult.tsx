import React, {FC, useEffect, useRef, useState} from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {SearchIcon} from "@heroicons/react/outline";
import Input from "../../shared/Input/Input";
import {useTranslation} from "react-i18next";
import {countries} from "countries-list";

interface Suggestion {
    description: string;
    place_id: string;
}

type SuggestionsArray = Suggestion[];

export interface LocationInputProps {
    defaultValue: string;
    onChange?: (value: string) => void;
    onSubmit: (value: string) => void;
    className?: string;
}

const LocationInputSearchResult: FC<LocationInputProps> = ({
                                                               defaultValue,
                                                               onSubmit,
                                                               onChange,
                                                               className = "nc-flex-1.5",
                                                           }) => {
    const {t} = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const COUNTRY_NAMES = Object.values(countries).map(country => country.name);

    const [address, setAddress] = useState(defaultValue);
    const [showPopover, setShowPopover] = useState(false);

    const [options, setOptions] = useState<SuggestionsArray>([]);

    const {
        ready,
        setValue,
        suggestions: {status, data},
    } = usePlacesAutocomplete();

    useEffect(() => {
        setAddress(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (eventClickOutsideDiv) {
            document.removeEventListener("click", eventClickOutsideDiv);
        }
        showPopover && document.addEventListener("click", eventClickOutsideDiv);
        return () => {
            document.removeEventListener("click", eventClickOutsideDiv);
        };
    }, [showPopover]);

    useEffect(() => {
        if (showPopover && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showPopover]);

    useEffect(() => {
        setOptions(data || []);
        if (ready) {
            setShowPopover(data?.length > 0);
        }
    }, [data]);

    const eventClickOutsideDiv = (event: MouseEvent) => {
        if (!containerRef.current) return;
        // CLICK IN_SIDE
        if (!showPopover || containerRef.current.contains(event.target as Node)) {
            return;
        }
        // CLICK OUT_SIDE
        setShowPopover(false);
    };

    const removeCountryFromDescription = (description: string) => {
        for (let country of COUNTRY_NAMES) {
            if (description === country) {
                // If the description matches a country name exactly, return it as is
                return description;
            } else if (description.endsWith(country)) {
                // Otherwise, remove the country name from the end of the description
                return description.replace(new RegExp(`,?\\s?${country}$`, 'i'), '').trim();
            }
        }
        return description;
    };

    const handleSelectLocation = (description: string) => {
        const addressWithoutCountry = removeCountryFromDescription(description);
        setAddress(addressWithoutCountry);
        onChange && onChange(addressWithoutCountry);
        setShowPopover(false);
    };

    const renderSearchValue = () =>
        options.map((item) => (
            <span
                onClick={() => handleSelectLocation(item.description)}
                key={item.place_id}
                className="flex px-2 sm:px-2 items-center space-x-1 sm:space-x-1 py-2 sm:py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block font-medium text-neutral-700 dark:text-neutral-200 line-clamp-1">
                {item.description}
              </span>
            </span>
        ));

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(address);
    }


    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div className="relative flex-1">
                <form className="mb-2 flex justify-between w-full" onSubmit={onSubmitHandler}>
                    {/*Search input*/}
                    <Input
                        className="w-full text-left"
                        placeholder={t("propertyDetails.property.location")}
                        autoFocus={showPopover}
                        value={address}
                        onChange={(e) => {
                            setAddress(e.currentTarget.value);
                            setValue(e.currentTarget.value);
                            onChange && onChange(e.currentTarget.value);
                        }}
                        ref={inputRef}
                        autoComplete={"off"}
                    />
                    {/*Search icon*/}
                    <button
                        className='absolute px-2 py-1 top-2 right-[1px]'
                    >
                        <SearchIcon className="w-6 h-6 text-gray-400r"/>
                    </button>
                </form>
                {showPopover && (
                    <div
                        className="absolute left-0 z-40 w-3/5 overflow-hidden bg-white dark:bg-neutral-800 top-full rounded-lg shadow-xl max-h-96 overflow-y-auto">
                        {renderSearchValue()}
                    </div>
                )}
            </div>

        </div>
    );
};

export default LocationInputSearchResult;
