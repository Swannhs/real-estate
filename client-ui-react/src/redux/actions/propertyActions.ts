import {PROPERTY} from "../actionTypes";
import * as apis from "../../apis/Property";
import {setCookie} from "typescript-cookie";
import {
    getWishListPropertiesByUserApi,
    removePropertyFromWishListApi
} from "../../apis/Wishlist";

export const removePropertyElement = () => ({
    type: PROPERTY.REMOVE_PROPERTY_ELEMENT
})

export const addPropertyRequest = () => ({
    type: PROPERTY.ADD_PROPERTY_REQUEST,
});

export const addPropertySuccess = (item: any) => ({
    type: PROPERTY.ADD_PROPERTY_SUCCESS,
    payload: item,
});

export const addPropertyFailure = (error: any) => ({
    type: PROPERTY.ADD_PROPERTY_FAILURE,
    payload: error,
    error: true,
});

export const getHomePagePropertiesRequest = () => ({
    type: PROPERTY.GET_HOME_PAGE_PROPERTIES_REQUEST,
});

export const getHomePagePropertiesSuccess = (items: any, success: boolean) => ({
    type: PROPERTY.GET_HOME_PAGE_PROPERTIES_SUCCESS,
    payload: items,
    success: success
});

export const getHomePagePropertiesFailure = (error: any) => ({
    type: PROPERTY.GET_HOME_PAGE_PROPERTIES_FAILURE,
    payload: error,
});

export const getPropertiesRequest = () => ({
    type: PROPERTY.GET_PROPERTIES_REQUEST,
});

export const getPropertiesSuccess = (items: any) => ({
    type: PROPERTY.GET_PROPERTIES_SUCCESS,
    payload: items,
});

export const getPropertiesFailure = (error: any) => ({
    type: PROPERTY.GET_PROPERTIES_FAILURE,
    payload: error,
});

export const getPropertiesByUserRequest = () => ({
    type: PROPERTY.GET_PROPERTIES_BY_USER_REQUEST
});

export const getPropertiesByUserSuccess = (data: any) => ({
    type: PROPERTY.GET_PROPERTIES_BY_USER_SUCCESS,
    payload: data
});

export const getPropertiesByUserFailure = (error: any) => ({
    type: PROPERTY.GET_PROPERTIES_BY_USER_FAILURE,
    payload: error
});

export const getPropertiesByUserClean = () => ({
    type: PROPERTY.GET_PROPERTIES_BY_USER_CLEAN
});

export const searchPropertiesRequest = () => ({
    type: PROPERTY.SEARCH_PROPERTIES_REQUEST,
});

export const searchPropertiesSuccess = (items: any) => ({
    type: PROPERTY.SEARCH_PROPERTIES_SUCCESS,
    payload: items,
});

export const searchPropertiesFailure = (error: any) => ({
    type: PROPERTY.SEARCH_PROPERTIES_FAILURE,
    payload: error,
});

export const getHomepageFeaturedPropertiesRequest = () => ({
    type: PROPERTY.GET_HOME_PAGE_FEATURED_PROPERTIES_REQUEST,
});

export const getHomepageFeaturedPropertiesSuccess = (items: any) => ({
    type: PROPERTY.GET_HOME_PAGE_FEATURED_PROPERTIES_SUCCESS,
    payload: items,
});

export const getHomepageFeaturedPropertiesFailure = (error: any) => ({
    type: PROPERTY.GET_HOME_PAGE_FEATURED_PROPERTIES_FAILURE,
    payload: error,
});

export const getWishlistPropertiesRequest = () => ({
    type: PROPERTY.GET_WISH_LIST_PROPERTIES_REQUEST,
});

export const getWishlistPropertiesSuccess = (items: any) => ({
    type: PROPERTY.GET_WISH_LIST_PROPERTIES_SUCCESS,
    payload: items,
});

export const getWishListPropertiesByUserRequest = () => ({
    type: PROPERTY.GET_WISH_LIST_PROPERTIES_BY_USER_REQUEST
});

export const getWishListPropertiesByUserSuccess = (data: any) => ({
    type: PROPERTY.GET_WISH_LIST_PROPERTIES_BY_USER_SUCCESS,
    payload: data
});

export const getWishListPropertiesByUserFailure = (error: any) => ({
    type: PROPERTY.GET_WISH_LIST_PROPERTIES_BY_USER_FAILURE,
    payload: error
});

export const getWishlistPropertiesFailure = (error: any) => ({
    type: PROPERTY.GET_WISH_LIST_PROPERTIES_FAILURE,
    payload: error,
});

export const addPropertyToWishListRequest = () => ({
    type: PROPERTY.ADD_WISH_LIST_PROPERTY_BY_USER_REQUEST,
});

export const addPropertyToWishListSuccess = (item: any) => ({
    type: PROPERTY.ADD_WISH_LIST_PROPERTY_BY_USER_SUCCESS,
    payload: item,
});

export const addPropertyToWishListFailure = (error: any) => ({
    type: PROPERTY.ADD_WISH_LIST_PROPERTY_BY_USER_FAILURE,
    payload: error,
});

export const deleteWishListPropertyByUserRequest = () => ({
    type: PROPERTY.DELETE_WISH_LIST_PROPERTY_BY_USER_REQUEST,
});

export const deleteWishListPropertyByUserSuccess = (item: any) => ({
    type: PROPERTY.DELETE_WISH_LIST_PROPERTY_BY_USER_SUCCESS,
    payload: item,
});

export const deleteWishListPropertyByUserFailure = (error: any) => ({
    type: PROPERTY.DELETE_WISH_LIST_PROPERTY_BY_USER_FAILURE,
    payload: error.response
});

export const propertyRemoveActions = () => {
    return (dispatch: any) => {
        dispatch(removePropertyElement());
    }
}

export const getHomePropertiesActions = () => {
    return async (dispatch: any) => {
        dispatch(getHomePagePropertiesRequest());
        return await apis.getRecentPropertiesApi()
            .then((response: any) => {
                dispatch(getHomePagePropertiesSuccess(response.data.data, response.data.success));
            })
            .catch((error: any) => {
                dispatch(getHomePagePropertiesFailure(error.response?.data));
            });
    }
}

export const addPropertyActions = (data: any) => {
    return async (dispatch: any) => {
        dispatch(addPropertyRequest());
        return await apis.postPropertyApi(data)
            .then((response: any) => {
                if (response.status === 201) {
                    dispatch(addPropertySuccess(response.data));
                } else {
                    dispatch(addPropertyFailure(response.data));
                }
            })
            .catch((error: any) => {
                dispatch(addPropertyFailure(error.response));
            });
    }
}


export const getPropertiesByUserActions = (page: number, size: number) => {
    return (dispatch: any) => {
        dispatch(getPropertiesByUserRequest());
        return apis.getPropertyByUserApi(page, size)
            .then((response: any) => {
                dispatch(getPropertiesByUserSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getPropertiesByUserFailure(error.response));
            })
    }
}

export const searchPropertiesActions = (searchParams: any) => {
    return (dispatch: any) => {
        dispatch(searchPropertiesRequest());
        return apis.searchPropertyPublicApi(searchParams)
            .then((response: any) => {
                if (response.status === 200) {
                    dispatch(searchPropertiesSuccess(response.data));
                } else {
                    dispatch(searchPropertiesFailure(response.data));
                }
            })
            .catch((error: any) => {
                dispatch(searchPropertiesFailure(error.response.data));
            });
    }
}

export const getHomePageFeaturedPropertiesActions = () => {
    return (dispatch: any) => {
        dispatch(getHomepageFeaturedPropertiesRequest());
        return apis.getHomePageFeaturedPropertiesApi()
            .then((response: any) => {
                dispatch(getHomepageFeaturedPropertiesSuccess(response.data?.data));
            })
            .catch((error: any) => {
                dispatch(getHomepageFeaturedPropertiesFailure(error.response));
            });
    }
}



export const getWishListPropertiesByUserActions = () => {
    return (dispatch: any) => {
        dispatch(getWishListPropertiesByUserRequest());
        return getWishListPropertiesByUserApi()
            .then((response: any) => {
                const likedProperties: any[] = [];
                response.data?.data?.estates?.forEach((item: any) => {
                    likedProperties.push(item.id);
                });
                setCookie('likedProperties', JSON.stringify([]), {path: '/'});
                setCookie('likedProperties', JSON.stringify(likedProperties), {path: '/'});
                dispatch(getWishListPropertiesByUserSuccess(response.data?.data?.estates));
            })
            .catch((error: any) => {
                dispatch(getWishListPropertiesByUserFailure(error.response));
            });
    }
}


export const deleteWishListPropertyActions = (propertyId: string) => {
    return (dispatch: any) => {
        return removePropertyFromWishListApi(propertyId)
            .then((response: any) => {
                dispatch(deleteWishListPropertyByUserSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(deleteWishListPropertyByUserFailure(error.response));
            });
    }
}