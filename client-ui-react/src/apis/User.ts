import axiosService from "../utils/axios";

export const getUserInfoApi = async () => {
    return await axiosService.get(`v1/users/account`, {});
}

export const updateUserInfoApi = async (username: string, data: any) => {
    return await axiosService.put(`v1/users/update-account`, data, {});
}
export const changePasswordApi = async (data: any) => {
    return await axiosService.post(`v1/users/change-password`, data, {});
}
export const getPostByUsernameApi = async (username: string) => {
    return await axiosService.get(`v1/users/${username}/blogs`, {});
}