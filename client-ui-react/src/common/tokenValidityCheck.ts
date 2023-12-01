import jwtDecode from "jwt-decode";
import {refreshTokenApi} from "../apis/Auth";

export interface tokenInterface {
    sub: string;
    exp: number;
    username: string;
    roles: string[];
    ipAddress: string;
    iss: string;
}

export const tokenValidityCheck = (token: string) => {
    return jwtDecode<tokenInterface>(token).exp * 1000 > Date.now();
}

export const updateAccessToken = async (token: string) => {
    try {
        const response = await refreshTokenApi(token);
        return response?.data;
    } catch (e) {
        throw e;
    }
}