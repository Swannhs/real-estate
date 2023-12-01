import {SearchAlertType} from "../containers/PropertyPage/SearchResult";
import axiosService from "../utils/axios";

const SEARCH_ALERT_API_RESOURCE = '/search-alert';

export const getSearchAlertAuthApi = async () => {
    return await axiosService.get(`v1${SEARCH_ALERT_API_RESOURCE}`, {
        headers: {
            'Accept': 'application/json',
        }
    });
}

export const searchAlertAuthApi = async (data: SearchAlertType, lang: string) => {
    return await axiosService.post(`v1${SEARCH_ALERT_API_RESOURCE}`, data, {
        headers: {
            'Accept': 'application/json',
            'Accept-Language': lang
        }
    });
}

// TODO: Required discussion for this endpoint
export const searchAlertVerifyAuthApi = async (activeToken: string) => {
    return await axiosService.post(`/public/v1/search-alert/verify-search-alert`, {
        activeSearchAlert: activeToken
    }, {
        headers: {
            'Accept': 'application/json',
        }
    });
}

export const deleteSearchAlertApi = async (id: string) => {
    return await axiosService.delete(`v1${SEARCH_ALERT_API_RESOURCE}/delete-search-alert`, {
        headers: {
            'Accept': 'application/json',
        },
        params: {
            criteriaId: id
        }
    });
}