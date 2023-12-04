import React, {FC, useEffect} from "react";
import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import {Helmet} from "react-helmet";
import SectionGridHasMap from "../ListingStayPage/SectionGridHasMap";
import {useSearchQuery} from "../../common/query";
import {
    initialPropertyState,
    useSearchedProperty
} from "../../hooks/contextApi/SearchedPropertyContext";
import {searchPropertyPublicApi} from "../../apis/Property";
import {toast} from "react-toastify";
import {useLoadScript} from "@react-google-maps/api";

export interface ListingStayMapPageProps {
    className?: string;
    history?: any;
}

export interface FilterType {
    roomStart?: string;
    roomEnd?: string;
    livingAreaStart?: string;
    livingAreaEnd?: string;
    lotAreaStart?: string;
    lotAreaEnd?: string;
    floorSpaceStart?: string;
    floorSpaceEnd?: string;
    estateYearOfBuildingStart?: string;
    estateYearOfBuildingEnd?: string;
    estateFeatures?: string[];
    estateAdvertiser?: string[];
}

export interface SearchPropertyType {
    estateAdsPurpose?: string[];
    addressLine1?: string | null;
    estateTypes?: string[];
    priceStart?: string | null;
    priceEnd?: string | null;
    orderBy?: string | null;
    page?: string | null;
    filter: FilterType;
    searchKeywords?: string | null;
}

export interface SearchAlertType {
    searchAlertId?: number;
    receiverEmail?: string;
    estateAdsPurpose?: string;
    addressLine1?: string;
    estateTypes?: string;
    priceStart?: number;
    priceEnd?: number;
    searchKeywords?: string | null;
}

const SearchResult: FC<ListingStayMapPageProps> = ({className = "", history}) => {
    const {setPropertyState} = useSearchedProperty();
    // const {isLoading, response} = useSelector((state: any) => state.property.searchProperties);
    const query = useSearchQuery();
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY as string,
        libraries: ["places"],
    });

    useEffect(() => {
        let filter: FilterType = {};

        if (query.get('filter')) {
            if (query.get('roomStart')) {
                filter.roomStart = query.get('roomStart') as string;
            }
            if (query.get('roomEnd')) {
                filter.roomEnd = query.get('roomEnd') as string;
            }
            if (query.get('livingAreaStart')) {
                filter.livingAreaStart = query.get('livingAreaStart') as string;
            }
            if (query.get('livingAreaEnd')) {
                filter.livingAreaEnd = query.get('livingAreaEnd') as string;
            }
            if (query.get('lotAreaStart')) {
                filter.lotAreaStart = query.get('lotAreaStart') as string;
            }
            if (query.get('lotAreaEnd')) {
                filter.lotAreaEnd = query.get('lotAreaEnd') as string;
            }
            if (query.get('floorSpaceStart')) {
                filter.floorSpaceStart = query.get('floorSpaceStart') as string;
            }
            if (query.get('floorSpaceEnd')) {
                filter.floorSpaceEnd = query.get('floorSpaceEnd') as string;
            }
            if (query.get('estateAdvertiser')) {
                filter.estateAdvertiser = query.get('estateAdvertiser')?.split(',') as string[];
            }
            if (query.get('estateFeatures')) {
                filter.estateFeatures = query.get('estateFeatures')?.split(',') as string[];
            }
        }

        let params: SearchPropertyType = {
            filter: filter
        };
        if (query.get("loc")) {
            params.searchKeywords = query.get("loc");
        }
        if (query.get("cat")) {
            params.estateTypes = query.get('cat')?.split(",") as string[] || null;
        }
        if (query.get("min")) {
            params.priceStart = query.get("min");
        }
        if (query.get("max")) {
            params.priceEnd = query.get("max");
        }
        if (query.get("pur")) {
            params.estateAdsPurpose = query.get("pur")?.split(",") as string[] || null;
        }
        if (query.get("page")) {
            params.page = query.get("page");
        }
        fetchSearchResult(params);
    }, [window.location.href]);

    const fetchSearchResult = (params: SearchPropertyType) => {
        if (setPropertyState) {
            setPropertyState({
                ...initialPropertyState,
                isLoading: true
            })
        }
        searchPropertyPublicApi(params)
            .then((response) => {
                if (setPropertyState) {
                    setPropertyState(response.data);
                }
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
                if (setPropertyState) {
                    setPropertyState({
                        ...initialPropertyState,
                        isLoading: false,
                        error: error?.response?.data
                    })
                }
            });
    }

    return (
        <div
            className={`nc-ListingStayMapPage relative ${className}`}
            data-nc-id="ListingStayMapPage"
        >
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Search</title>
            </Helmet>
            <BgGlassmorphism/>

            <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none mt-5">
                {isLoaded && <SectionGridHasMap history={history}/>}
            </div>
        </div>
    );
};

export default SearchResult;
