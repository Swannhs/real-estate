import {SEARCH_ALERT_TYPES} from "../actionTypes";
import * as apis from "../../apis/SearchAlert";
import {SearchAlertType} from "../../containers/PropertyPage/SearchResult";
import {searchAlertResponseInterface} from "../reducers/searchAlertReducer";

export const getSearchAlertRequest = () => ({
    type: SEARCH_ALERT_TYPES.GET_SEARCH_ALERT_AUTH_REQUEST
});

export const getSearchAlertSuccess = (data: searchAlertResponseInterface) => ({
    type: SEARCH_ALERT_TYPES.GET_SEARCH_ALERT_AUTH_SUCCESS,
    payload: data
});

export const getSearchAlertFailure = (error: any) => ({
    type: SEARCH_ALERT_TYPES.GET_SEARCH_ALERT_AUTH_FAILURE,
    payload: error
});

export const addSearchAlertRequest = () => ({
    type: SEARCH_ALERT_TYPES.ADD_SEARCH_ALERT_REQUEST
});

export const addSearchAlertSuccess = (data: searchAlertResponseInterface) => ({
    type: SEARCH_ALERT_TYPES.ADD_SEARCH_ALERT_SUCCESS,
    payload: data
});

export const addSearchAlertFailure = (error: any) => ({
    type: SEARCH_ALERT_TYPES.ADD_SEARCH_ALERT_FAILURE,
    payload: error
});

export const searchAlertVerifyRequest = () => ({
    type: SEARCH_ALERT_TYPES.VALIDATE_SEARCH_ALERT_REQUEST
});

export const searchAlertVerifySuccess = (data: searchAlertResponseInterface) => ({
    type: SEARCH_ALERT_TYPES.VALIDATE_SEARCH_ALERT_SUCCESS,
    payload: data
});

export const searchAlertVerifyFailure = (error: any) => ({
    type: SEARCH_ALERT_TYPES.VALIDATE_SEARCH_ALERT_FAILURE,
    payload: error
});

export const getSearchAlertActions = () => {
    return (dispatch: any) => {
        dispatch(getSearchAlertRequest());
        return apis.getSearchAlertAuthApi()
            .then((response) => {
                dispatch(getSearchAlertSuccess(response.data));
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                dispatch(getSearchAlertFailure(error?.response));
                return Promise.reject(error?.response);
            });
    };
}

export const searchAlertActions = (data: SearchAlertType, lang: string) => {
    return (dispatch: any) => {
        dispatch(addSearchAlertRequest());
        return apis.searchAlertAuthApi(data, lang)
            .then((response) => {
                dispatch(addSearchAlertSuccess(response.data));
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                dispatch(addSearchAlertFailure(error?.response));
                return Promise.reject(error?.response);
            });
    };
}

export const searchAlertVerifyActions = (activeToken: string) => {
    return (dispatch: any) => {
        dispatch(searchAlertVerifyRequest());
        return apis.searchAlertVerifyAuthApi(activeToken)
            .then((response) => {
                dispatch(searchAlertVerifySuccess(response.data));
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                dispatch(searchAlertVerifyFailure(error));
                return Promise.reject(error?.response);
            });
    };
}