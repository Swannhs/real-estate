import {NOTICES, STATIC} from "../actionTypes";
import * as apis from '../../apis/StaticData';

export const getStaticDataRequest = () => ({
    type: STATIC.GET_STATIC_REQUEST,
});

export const getStaticDataSuccess = (data: any) => ({
    type: STATIC.GET_STATIC_SUCCESS,
    payload: data,
});

export const getStaticDataFailure = (error: any) => ({
    type: STATIC.GET_STATIC_FAILURE,
    payload: error,
});

export const getStaticCategoryDataRequest = () => ({
    type: STATIC.GET_STATIC_CATEGORY_DATA_REQUEST,
});

export const getStaticCategoryDataSuccess = (data: any) => ({
    type: STATIC.GET_STATIC_CATEGORY_DATA_SUCCESS,
    payload: data,
});

export const getStaticCategoryDataFailure = (error: any) => ({
    type: STATIC.GET_STATIC_CATEGORY_DATA_FAILURE,
    payload: error,
});

export const getPricePackagesRequest = () => ({
    type: STATIC.GET_PRICE_PACKAGES_REQUEST,
});

export const getPricePackagesSuccess = (data: any) => ({
    type: STATIC.GET_PRICE_PACKAGES_SUCCESS,
    payload: data,
});

export const getPricePackagesFailure = (error: any) => ({
    type: STATIC.GET_PRICE_PACKAGES_FAILURE,
    payload: error,
});

export const getAllNoticesRequest = () => ({
    type: NOTICES.GET_ALL_NOTICES_REQUEST,
});

export const getAllNoticesSuccess = (data: any) => ({
    type: NOTICES.GET_ALL_NOTICES_SUCCESS,
    payload: data,
});

export const getAllNoticesFailure = (error: any) => ({
    type: NOTICES.GET_ALL_NOTICES_FAILURE,
    payload: error,
});

export const getCookiesPolicyRequest = () => ({
    type: STATIC.GET_COOKIE_POLICY_REQUEST,
});

export const getCookiesPolicySuccess = (data: any) => ({
    type: STATIC.GET_COOKIE_POLICY_SUCCESS,
    payload: data,
});

export const getCookiesPolicyFailure = (error: any) => ({
    type: STATIC.GET_COOKIE_POLICY_FAILURE,
    payload: error,
});

export const getStaticDataActions = () => {
    return (dispatch: any) => {
        dispatch(getStaticDataRequest());
        return apis.getStaticAllDataApi()
            .then((response: any) => {
                dispatch(getStaticDataSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getStaticDataFailure(error.response?.data));
            });
    }
}

export const getStaticCategoryDataActions = () => {
    return (dispatch: any) => {
        dispatch(getStaticCategoryDataRequest());
        return apis.getStaticCategoryDataApi()
            .then((response: any) => {
                dispatch(getStaticCategoryDataSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getStaticCategoryDataFailure(error.response?.data));
            });
    }
}

export const getPricePackagesActions = () => {
    return (dispatch: any) => {
        dispatch(getPricePackagesRequest());
        return apis.getPricePackagesApi()
            .then((response: any) => {
                dispatch(getPricePackagesSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getPricePackagesFailure(error?.response?.data));
            });
    }
}

export const getAllNoticesActions = () => {
    return (dispatch: any) => {
        dispatch(getAllNoticesRequest());
        return apis.getAllNoticesApi()
            .then((response: any) => {
                dispatch(getAllNoticesSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getAllNoticesFailure(error?.response?.data));
            });
    }
}

export const getCookiesPolicyActions = () => {
    return (dispatch: any) => {
        dispatch(getCookiesPolicyRequest());
        return apis.getCookiesPolicyApi()
            .then((response: any) => {
                dispatch(getCookiesPolicySuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getCookiesPolicyFailure(error?.response?.data));
            });
    }
}