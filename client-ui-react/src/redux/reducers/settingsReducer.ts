import {SETTINGS_TYPES} from "../actionTypes";

export interface SettingsStateType {
    settings: {
        isLoading: boolean,
        success: boolean,
        payment: boolean,
        error: any
    };
}

export const initialState: SettingsStateType = {
    settings: {
        isLoading: false,
        success: false,
        payment: false,
        error: null
    }
}

export const settingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SETTINGS_TYPES.GET_SETTINGS_REQUEST:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    isLoading: true
                }
            }
        case SETTINGS_TYPES.GET_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    isLoading: false,
                    success: true,
                    payment: action.payload.paymentAllowed
                }
            }
        case SETTINGS_TYPES.GET_SETTINGS_FAILURE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}