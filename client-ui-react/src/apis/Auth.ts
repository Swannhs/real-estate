import axios from "axios";
import {DEFAULT_LANG} from "../types/LanguageType";

const AUTH_API_RESOURCE = 'user/auth';

export const registerApi = async (auth: any) => {
    return await axios.post(`${import.meta.env.VITE_APP_API_URL}${AUTH_API_RESOURCE}/registration`, auth, {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem('language') || DEFAULT_LANG,
        }
    });
}

export const loginApi = async (username: string, password: string) => {
    return await axios.post(`${import.meta.env.VITE_APP_API_URL}${AUTH_API_RESOURCE}/accesstoken`, {}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': localStorage.getItem('language') || DEFAULT_LANG,
        },
        params: {
            'username': username,
            'password': password
        }
    });
}

export const refreshTokenApi = async (token: string) => {
    return await axios.post(`${import.meta.env.VITE_APP_API_URL}${AUTH_API_RESOURCE}/refreshtoken`, {}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': localStorage.getItem('language') || DEFAULT_LANG,
        },
        params: {
            'refreshToken': token
        }
    });
}

export const uploadProfilePictureApi = async (data: FormData) => {
    return await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/real-estate-service/v1/upload/single-file`, data, {
        headers: {
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem('language') || DEFAULT_LANG,
        }
    })
}

export const publicResetPasswordApi = async (data: any) => {
    return await axios.post(`${import.meta.env.VITE_APP_API_URL}${AUTH_API_RESOURCE}/reset-password`, data, {
        headers: {
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem('language') || DEFAULT_LANG,
        }
    });
}
