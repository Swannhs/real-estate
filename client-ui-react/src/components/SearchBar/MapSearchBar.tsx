import React, {useRef} from "react";
import {StandaloneSearchBox} from "@react-google-maps/api";
import {useTranslation} from "react-i18next";

interface SearchBarProps {
    onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
}

const MapSearchBar: React.FC<SearchBarProps> = ({onPlacesChanged}) => {
    const {t} = useTranslation();
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

    const onSearchBoxLoaded = (ref: google.maps.places.SearchBox) => {
        searchBoxRef.current = ref;
    };

    const handlePlacesChanged = () => {
        if (searchBoxRef.current) {
            const places = searchBoxRef.current.getPlaces();
            onPlacesChanged(places || []);
        }
    };

    return (
        <StandaloneSearchBox
            onLoad={onSearchBoxLoaded}
            onPlacesChanged={handlePlacesChanged}
        >
            <input
                type="text"
                placeholder={t('map.find.your.address')}
                className="border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent mt-2 px-3 py-2 w-60 h-9 rounded-md shadow-md text-sm placeholder-gray-500 z-20"
            />
        </StandaloneSearchBox>
    );
};

export default MapSearchBar;
