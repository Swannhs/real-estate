import axios, {AxiosRequestConfig} from 'axios';

const axiosPublicService = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + 'public/',
});

axiosPublicService.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        config.headers = config.headers || {};
        config.headers['Accept-Language'] = localStorage.getItem('language') || 'en';
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosPublicService;