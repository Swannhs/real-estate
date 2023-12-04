import React from "react";
import {WishListDataInterface} from "../../types";
import {addPropertyToWishListApi, getWishListEstateIdsApi} from "../../apis/Wishlist";
import {useAuth} from "./AuthContext";
import {searchPropertyPublicApi} from "../../apis/Property";

const initialWishListContext: WishListDataInterface = {
    isLoading: false,
    success: false,
    estateIds: [],
    data: [],
    error: null,
}

export const WishListContext = React.createContext(initialWishListContext);

export const WishListProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {isAuthenticated} = useAuth();
    const [wishListData, setWishListData] = React.useState<WishListDataInterface>(initialWishListContext);

    const fetchWishListEstateIds = React.useCallback( async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        await addWishListEstateIds();

        let wishList: WishListDataInterface = {...initialWishListContext};
        await getWishListEstateIdsApi()
            .then((response) => {
                wishList.estateIds = response.data?.estateIds;
                setWishListData(wishList);
            })
            .catch((error) => {
                wishList.error = error?.response?.data;
            });
        await fetchWithList(wishList);
    }, [isLoading]);

    const fetchWithList = async (wishList: WishListDataInterface) => {
        await searchPropertyPublicApi({estateIds: wishList.estateIds})
            .then((response: any) => {
                wishList.isLoading = false;
                wishList.success = true;
                wishList.data = response.data?.data;
            })
            .catch((error: any) => {
                wishList.error = error?.response?.data;
            })
            .finally(() => {
                setIsLoading(false);
                setWishListData(wishList);
            });
    }

    const addWishListEstateIds = async () => {
        const likedProperties = localStorage.getItem('likedProperties');

        if (!likedProperties) {
            return;
        }

        try {
            const publicLikedEstateIds: number[] = JSON.parse(likedProperties);
            if (!publicLikedEstateIds.length) {
                return;
            }

            // Deduplicate the estate IDs before sending to API
            const uniqueEstateIds = [...new Set(publicLikedEstateIds)];
            const response = await addPropertyToWishListApi(uniqueEstateIds);

            if (response.status === 200) {
                // Clear local storage
                localStorage.removeItem('likedProperties');
                await fetchWishListEstateIds();
            }
        } catch (error) {
            setWishListData({...initialWishListContext, error: error});
        }
    };

    const fetchWishListPublicUser = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        let estateIds = JSON.parse(localStorage.getItem("likedProperties") as string);
        let wishList: WishListDataInterface = {...initialWishListContext, estateIds};
        await fetchWithList(wishList);
    }

    React.useEffect(() => {
        if (isAuthenticated) {
            fetchWishListEstateIds();
        } else {
            fetchWishListPublicUser();
        }
    }, [isAuthenticated]);

    const value = React.useMemo(() => {
        return {
            ...wishListData,
            setWishListData,
            refreshWishList: fetchWishListEstateIds,
            refreshWishListPublicUser: fetchWishListPublicUser,
        }
    }, [wishListData, fetchWishListEstateIds, fetchWishListPublicUser])

    return (
        <WishListContext.Provider value={value}>
            {children}
        </WishListContext.Provider>
    )
}

export const useWishListContext = () => React.useContext(WishListContext);