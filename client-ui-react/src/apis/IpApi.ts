import axios from "axios";

export const getIpInfoApi = () => {
    return axios.get(`https://api.ipdata.co/?api-key=${import.meta.env.VITE_APP_IP_DATA_API_KEY}`);
}
