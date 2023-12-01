import {SEARCH_ALERT_TYPES} from "../actionTypes";

export interface searchAlertTimePeriodInterface {
    id: number | string;
    active: boolean;
    isDeleted: boolean;
    name: string;
    interval: number | string | null;
    nextTime: string | null;
}

export interface searchAlertDataInterface {
    id: number | string;
    addressLine1: string | null;
    estateAdsPurpose: string | null;
    estateTypes: string | null;
    priceStart: number | string;
    priceEnd: number | string;
    smtpTime: searchAlertTimePeriodInterface;
}

export interface searchAlertResponseInterface {
    success: boolean;
    data: searchAlertDataInterface[];
    message: string;
}

export interface searchAlertInterface {
    isLoading: boolean;
    getSearchAlerts: {
        isLoading: boolean;
        success: boolean;
        message: string;
        data: searchAlertDataInterface[] | any;
    },
    addSearchAlert: {
        success: boolean;
        message: string;
    },
    validateSearchAlert: {
        success: boolean;
        message: string;
    }
    success: boolean;
    error: any;
}

const initialState: searchAlertInterface | any = {
    isLoading: false,
    getSearchAlerts: {
        isLoading: false,
        success: false,
        message: '',
        data: []
    },
    addSearchAlert: {
        success: false,
        message: ''
    },
    validateSearchAlert: {
        success: false,
        message: ''
    },
    success: false,
    error: null
}

export default function searchAlertReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case SEARCH_ALERT_TYPES.ADD_SEARCH_ALERT_REQUEST:
            return {
                ...state,
                isLoading: true,
                addSearchAlert: {
                    success: false,
                    message: ''
                },
                success: false,
                error: null
            }
        case SEARCH_ALERT_TYPES.ADD_SEARCH_ALERT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addSearchAlert: action.payload,
                success: true,
                error: null
            }
        case SEARCH_ALERT_TYPES.ADD_SEARCH_ALERT_FAILURE:
            return {
                ...state,
                isLoading: false,
                addSearchAlert: {
                    success: false,
                    message: ''
                },
                success: false,
                error: action.payload
            }
        case SEARCH_ALERT_TYPES.VALIDATE_SEARCH_ALERT_REQUEST:
            return {
                ...state,
                isLoading: true,
                validateSearchAlert: {
                    success: false,
                    message: ''
                }
            }
        case SEARCH_ALERT_TYPES.VALIDATE_SEARCH_ALERT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                validateSearchAlert: action.payload,
                success: true,
                error: null
            }
        case SEARCH_ALERT_TYPES.VALIDATE_SEARCH_ALERT_FAILURE:
            return {
                ...state,
                isLoading: false,
                validateSearchAlert: {
                    success: false,
                    message: ''
                },
                success: false,
                error: action.payload
            }
        case SEARCH_ALERT_TYPES.GET_SEARCH_ALERT_AUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
                getSearchAlerts: {
                    success: false,
                    message: '',
                    data: []
                },
                success: false,
                error: null
            }
        case SEARCH_ALERT_TYPES.GET_SEARCH_ALERT_AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getSearchAlerts: action.payload,
                success: true,
                error: null
            }
        case SEARCH_ALERT_TYPES.GET_SEARCH_ALERT_AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
                getSearchAlerts: {
                    success: false,
                    message: '',
                    data: null
                }
            }
        default:
            return state;
    }
}