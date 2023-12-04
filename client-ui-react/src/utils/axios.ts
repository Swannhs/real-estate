import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {DEFAULT_LANG} from "../types/LanguageType";

const axiosService = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosService.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const authState = JSON.parse(localStorage.getItem('authState') || '{}');

        config.headers = config.headers || {};
        config.headers['Accept-Language'] = localStorage.getItem('language') || 'en';

        // Language
        let selectedLang = localStorage.getItem('language');
        let defaultLang = localStorage.getItem('defaultLanguage');

        if (selectedLang) {
            config.headers['Accept-Language'] = selectedLang;
        } else {
            config.headers['Accept-Language'] = defaultLang || DEFAULT_LANG;
        }

        if (authState.isAuthenticated) {
            config.headers.Authorization = `Bearer ${authState.token.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosService.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            error.response.data.message = "Login session expired";
            setTimeout(() => {
                //     Clear local storage
                localStorage.removeItem('authState');
                //     Redirect to login page
                window.location.href = "/login";
            }, 1000);
        }
        return Promise.reject(error);
    }
);

export default axiosService;