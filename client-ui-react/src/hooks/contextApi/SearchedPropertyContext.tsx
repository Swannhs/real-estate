import React, {createContext, useContext, useMemo, useState} from "react";
import {PropertyDataType} from "../../types";

interface SearchPropertyInterface {
    isLoading: boolean;
    meta: {
        total: number;
        perPage: number;
        orderBy: string;
        totalPage: number;
        currentPage: number;
        nextPage: number;
        previousPage: number;
    };
    data: PropertyDataType[];
    error: any | null;
    setPropertyState?: React.Dispatch<React.SetStateAction<SearchPropertyInterface>>
}

export const initialPropertyState: SearchPropertyInterface = {
    isLoading: false,
    meta: {
        total: 0,
        perPage: 8,
        orderBy: "",
        totalPage: 0,
        currentPage: 1,
        nextPage: 2,
        previousPage: 1,
    },
    data: [],
    error: null,
}

const SearchedPropertyContext = createContext<SearchPropertyInterface>(initialPropertyState);

export const SearchedPropertyProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [propertyState, setPropertyState] = useState<SearchPropertyInterface>(initialPropertyState);

    const value = useMemo(() => {
        return {
            ...propertyState,
            setPropertyState
        }
    }, [propertyState])

    return (
        <SearchedPropertyContext.Provider value={value}>
            {children}
        </SearchedPropertyContext.Provider>
    )
}

export const useSearchedProperty = () => {
    return useContext(SearchedPropertyContext);
}