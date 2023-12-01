import React, {createContext, useContext, useMemo} from "react";
import {getStaticAllDataApi} from "../../apis/StaticData";
import {toast} from "react-toastify";
import {
    StaticDataInterface
} from "../../types";

const initialStaticDataContext: StaticDataInterface = {
    isLoading: false,
    success: false,
    estateType: [],
    purpose: [],
    estateFeatures: [],
    available: [],
    currency: [],
    advertising: [],
}

const StaticDataContext = createContext<StaticDataInterface>(initialStaticDataContext);

export const StaticDataContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [staticData, setStaticData] = React.useState<StaticDataInterface>(initialStaticDataContext);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fetchStaticData = React.useCallback(() => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        getStaticAllDataApi()
            .then((response: any) => {
                setStaticData((prevData) => ({
                    isLoading: false,
                    estateType: response.data.data.estate_type,
                    purpose: response.data.data.estate_advertise_purpose,
                    estateFeatures: response.data.data.estateFeatures,
                    available: response.data.data.estate_availability_policy,
                    currency: response.data.data.currency,
                    advertising: response.data.data.advertiser,
                    success: true,
                }));
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isLoading]);

    React.useEffect(() => {
        fetchStaticData();
    }, []);

    const value = useMemo(() => {
        return {
            ...staticData,
            isLoading
        }
    }, [staticData])

    return (
        <StaticDataContext.Provider value={value}>
            {children}
        </StaticDataContext.Provider>
    )
}

export const useStaticData = () => {
    return useContext(StaticDataContext);
}