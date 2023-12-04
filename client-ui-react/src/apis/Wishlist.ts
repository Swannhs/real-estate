import axiosService from "../utils/axios";

const API_V1_WISHLIST_BASE_PATH = "/wishlist";

// export const getWishlistPropertiesPublicApi = async (wishList: number[] | string[]) => {
//     return await axiosService.post(`${API_V1_PUBLIC_BASE_PATH}/wishlist`, {
//         estateIds: wishList
//     }, {
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
// }
export const getWishListPropertiesByUserApi = async () => {
    return await axiosService.get(`v1${API_V1_WISHLIST_BASE_PATH}`, {});
}
export const getWishListEstateIdsApi = async () => {
    return await axiosService.get(`v1${API_V1_WISHLIST_BASE_PATH}/ids`);
}
export const addPropertyToWishListApi = async (propertyIds: number[] | string[]) => {
    return await axiosService.post(`v1${API_V1_WISHLIST_BASE_PATH}`, {
        estateIds: propertyIds
    }, {})
}
export const removePropertyFromWishListApi = async (propertyId: number | string) => {
    return await axiosService.delete(`v1${API_V1_WISHLIST_BASE_PATH}/${propertyId}`, {});
}