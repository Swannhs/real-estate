import {SETTINGS_TYPES} from "../actionTypes";
import {getIsPaymentEnable} from "../../apis/StaticData";

export const getSettingsRequest = () => ({
    type: SETTINGS_TYPES.GET_SETTINGS_REQUEST,
});

export const getSettingsSuccess = (settings: any) => ({
    type: SETTINGS_TYPES.GET_SETTINGS_SUCCESS,
    payload: settings,
});

export const getSettingsFailure = (error: any) => ({
    type: SETTINGS_TYPES.GET_SETTINGS_FAILURE,
    payload: error,
});

export const getSettingActions = () => {
    return (dispatch: any) => {
        dispatch(getSettingsRequest());
        getIsPaymentEnable()
            .then(response => {
                dispatch(getSettingsSuccess(response.data));
            })
            .catch(error => {
                dispatch(getSettingsFailure(error.response.data));
            });
    }
}