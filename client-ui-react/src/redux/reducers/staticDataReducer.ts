import {NOTICES, STATIC} from "../actionTypes";

interface AllStaticData {
    success: boolean;
    message: string;
    data: Record<string, any>;
    loading: boolean;
    error: any | null;
}

interface CategoryStaticData {
    success: boolean;
    data: any[];
    loading: boolean;
    error: any | null;
}

interface PricePackages {
    loading: boolean;
    success: boolean;
    data: any[];
    error: any | null;
}

interface Notices {
    loading: boolean;
    success: boolean;
    data: Record<string, any>;
    error: any | null;
}

interface CookiePolicy {
    loading: boolean;
    success: boolean;
    data: Record<string, any>;
    error: any | null;
}

export interface StaticDataTypeInterface {
    allStaticData: AllStaticData;
    categoryStaticData: CategoryStaticData;
    pricePackages: PricePackages;
    notices: Notices;
    cookiePolicy: CookiePolicy;
}

const initialState: StaticDataTypeInterface | any = {
    allStaticData: {
        success: false,
        message: '',
        data: {},
        loading: false,
        error: null,
    },
    categoryStaticData: {
        success: false,
        data: [],
        loading: false,
        error: null,
    },
    pricePackages: {
        loading: false,
        success: false,
        data: [],
        error: null
    },
    notices: {
        loading: false,
        success: false,
        data: {},
        error: null
    },
    cookiePolicy: {
        loading: false,
        success: false,
        data: {},
        error: null
    }
}

export default function staticDataReducer(state = initialState, action: any) {
    switch (action.type) {
        case STATIC.GET_STATIC_REQUEST:
            return {
                ...state,
                allStaticData: {
                    loading: true,
                    error: null,
                },
            }
        case STATIC.GET_STATIC_SUCCESS:
            return {
                ...state,
                allStaticData: {
                    success: true,
                    message: action.payload.message,
                    data: action.payload.data,
                    loading: false,
                    error: null
                }
            }
        case STATIC.GET_STATIC_FAILURE:
            return {
                allStaticData: {
                    ...state.allStaticData,
                    success: false,
                    message: action.payload.message,
                    data: {},
                    loading: false,
                    error: action.payload
                }
            }
        case STATIC.GET_STATIC_CATEGORY_DATA_REQUEST:
            return {
                ...state,
                categoryStaticData: {
                    ...state.categoryStaticData,
                    loading: true,
                    error: null,
                }
            }
        case STATIC.GET_STATIC_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                categoryStaticData: {
                    success: true,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            }
        case STATIC.GET_STATIC_CATEGORY_DATA_FAILURE:
            return {
                ...state,
                categoryStaticData: {
                    ...state.categoryStaticData,
                    success: false,
                    data: [],
                    loading: false,
                    error: action.payload
                }
            }
        case STATIC.GET_PRICE_PACKAGES_REQUEST:
            return {
                ...state,
                pricePackages: {
                    ...state.pricePackages,
                    loading: true,
                    error: null,
                }
            }
        case STATIC.GET_PRICE_PACKAGES_SUCCESS:
            return {
                ...state,
                pricePackages: {
                    success: true,
                    data: action.payload.data,
                    loading: false,
                    error: null
                }
            }
        case STATIC.GET_PRICE_PACKAGES_FAILURE:
            return {
                ...state,
                pricePackages: {
                    ...state.pricePackages,
                    success: false,
                    data: [],
                    loading: false,
                    error: action.payload
                }
            }
        case STATIC.GET_COOKIE_POLICY_REQUEST:
            return {
                ...state,
                cookiePolicy: {
                    ...state.cookiePolicy,
                    loading: true,
                }
            }
        case STATIC.GET_COOKIE_POLICY_SUCCESS:
            return {
                ...state,
                cookiePolicy: {
                    success: true,
                    data: action.payload.data,
                    loading: false,
                    error: null
                }
            }
        case STATIC.GET_COOKIE_POLICY_FAILURE:
            return {
                ...state,
                cookiePolicy: {
                    ...state.cookiePolicy,
                    success: false,
                    data: {},
                    loading: false,
                    error: action.payload
                }
            }
        case NOTICES.GET_ALL_NOTICES_REQUEST:
            return {
                ...state,
                notices: {
                    ...state.notices,
                    loading: true,
                    error: null,
                },
            }
        case NOTICES.GET_ALL_NOTICES_SUCCESS:
            return {
                ...state,
                notices: {
                    success: true,
                    data: action.payload.data,
                    loading: false,
                    error: null
                }
            }
        case NOTICES.GET_ALL_NOTICES_FAILURE:
            return {
                ...state,
                notices: {
                    ...state.notices,
                    success: false,
                    data: {},
                    loading: false,
                    error: action.payload
                }
            }
        default:
            return state
    }
}
