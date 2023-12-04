import axiosService from "../utils/axios";

export const updateNoticeAdminApi= async (data: any) => {
    return await axiosService.post(`${import.meta.env.VITE_APP_API_URL}admin/v1/settings/notice`, data);
}

export const getAllUsersAdminApi = async () => {
    return await axiosService.get(`${import.meta.env.VITE_APP_API_URL}admin/v1/manage-user`);
}

export const updateUserAdminApi = async (data: any) => {
    return await axiosService.put(`${import.meta.env.VITE_APP_API_URL}admin/v1/manage-user`, data);
}

export const getPaymentSettingsAdminApi = async () => {
    return await axiosService.get(`${import.meta.env.VITE_APP_API_URL}admin/v1/settings/payment`);
}

export const updatePaymentSettingsAdminApi = async (data: any) => {
    return await axiosService.put(`${import.meta.env.VITE_APP_API_URL}admin/v1/settings/payment`, data);
}