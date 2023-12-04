import {USER} from "../actionTypes";
import * as apis from '../../apis/User';

export const getUserInfoRequest = () => ({
    type: USER.GET_USER_INFO_REQUEST,
});

export const getUserInfoSuccess = (data: any) => ({
    type: USER.GET_USER_INFO_SUCCESS,
    payload: data,
});

export const getUserInfoFailure = (error: any) => ({
    type: USER.GET_USER_INFO_FAILURE,
    payload: error,
});

export const getUserInfoActions = () => {
    return (dispatch: any) => {
        dispatch(getUserInfoRequest());
        return apis.getUserInfoApi()
            .then((response: any) => {
                if (response.status === 200) {
                    dispatch(getUserInfoSuccess(response.data));
                } else {
                    dispatch(getUserInfoFailure(response.data));
                }
            })
            .catch((error: any) => {
                dispatch(getUserInfoFailure(error.response?.data));
            });
    }
}
