import {AUTH} from "../actionTypes";
import * as apis from "../../apis/Auth";
import jwtDecode from "jwt-decode";

export const loginRequest = () => ({
    type: AUTH.LOGIN_REQUEST,
});

export const loginSuccess = (user: any, token: any) => ({
    type: AUTH.LOGIN_SUCCESS,
    payload: {
        user,
        token,
    }
});

export const loginFailure = (error: any) => ({
    type: AUTH.LOGIN_FAILURE,
    payload: error,
});

export const registerRequest = () => ({
    type: AUTH.REGISTER_REQUEST,
});

export const registerSuccess = (user: any, token: any) => ({
    type: AUTH.REGISTER_SUCCESS,
    payload: {
        user,
        token,
    }
});

export const logoutSuccess = () => ({
    type: AUTH.LOGOUT_SUCCESS
});

export const registerFailure = (error: any) => ({
    type: AUTH.REGISTER_FAILURE,
    payload: error,
});

export const refreshTokenRequest = () => ({
    type: AUTH.REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = (token: any) => ({
    type: AUTH.REFRESH_TOKEN_SUCCESS,
    payload: token,
});

export const refreshTokenFailure = (error: any) => ({
    type: AUTH.REFRESH_TOKEN_FAILURE,
    payload: error.response
});

export const loginActions = (username: string, password: string) => {
    return (dispatch: any) => {
        dispatch(loginRequest());
        return apis.loginApi(username, password)
            .then((response: any) => {
                if (response.status === 200) {
                    let token = {
                        accessToken: response.data.access_token,
                        refreshToken: response.data.refresh_token
                    }
                    dispatch(loginSuccess(jwtDecode(token.accessToken), token));
                }
            })
            .catch((error: any) => {
                dispatch(loginFailure(error.response.data));
            });
    }
};

export const registrationActions = (auth: any) => {
    return (dispatch: any) => {
        dispatch(registerRequest());
        return apis.registerApi(auth)
            .then((response: any) => {
                if (response.status === 201) {
                    let token = {
                        accessToken: response.data.access_token,
                        refreshToken: response.data.refresh_token
                    }
                    dispatch(registerSuccess(jwtDecode(token.accessToken), token));
                } else {
                    dispatch(registerFailure(response.data));
                }
            })
            .catch((error: any) => {
                dispatch(registerFailure(error.response.data));
            });
    }
}

export const refreshTokenActions = (refreshToken: string) => {
    return (dispatch: any) => {
        dispatch(refreshTokenRequest());
        return apis.refreshTokenApi(refreshToken)
            .then((response: any) => {
                let token = {
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token
                }
                dispatch(refreshTokenSuccess(token));
                return token.accessToken;
            })
            .catch((error: any) => {
                dispatch(refreshTokenFailure(error.response.data));
                dispatch(logoutActions());
                return false;
            });
    }
}

export const logoutActions = () => {
    return (dispatch: any) => {
        dispatch(logoutSuccess())
    }
}
