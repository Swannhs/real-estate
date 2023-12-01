import axiosService from "../utils/axios";
import axiosPublicService from "../utils/axiosPublic";


//------------------------- PUBLIC API -------------------------

export const getRecentPropertiesApi = async () => {
    return await axiosPublicService.get(`v1/estates/recent-listing`);
}

export const getHomePageFeaturedPropertiesApi = async () => {
    return await axiosPublicService.get(`v1/estates/featured-listing`);
}

export const searchPropertyPublicApi = async (searchQuery: any) => {
    return await axiosPublicService.post(`v1/estates/search`, searchQuery, {});
}

export const getPropertyByIdApi = async (id: string) => {
    return await axiosPublicService.get(`v1/estates/${id}`, {});
}


//-------------------------- PRIVATE API -------------------------
export const postPropertyApi = async (property: any) => {
    return await axiosService.post(`v1/estates`, property, {});
}

export const getPropertyByUserApi = async (page: number, size: number) => {
    return await axiosService.get(`v1/users/estates`, {
        params: {
            page: page,
            size: size
        }
    })
}

export const deletePropertyByIdApi = async (propertyId: number | string) => {
    return await axiosService.delete(`v1/estates/${propertyId}`, {});
}

export const updatePropertyByIdApi = async (propertyId: number | string, property: any) => {
    return await axiosService.put(`v1/estates/${propertyId}`, property, {});
}

export const getEditablePropertyByIdApi = async (propertyId: number | string) => {
    return await axiosService.get(`v1/estates/${propertyId}`, {});
}

export const estateUploadFileApi = (data: FormData) => {
    return axiosService.post(`v1/estates/upload`, data, {});
}

export const getEstatesBySuperUserApi = async (page: number, size: number) => {
    return await axiosService.get(`v1/estates`, {
        params: {
            page: page,
            size: size
        }
    });
}

export const activateEstateFeatureApi = async (estateId: number | string, stickerId: number | string) => {
    return await axiosService.post(`v1/estates/active-sticker?estateId=${estateId}&sickerId=${stickerId}`, {});
}

export const removeEstateFeatureApi = async (estateId: number | string, stickerId: number | string) => {
    return await axiosService.post(`v1/estates/remove-sticker?estateId=${estateId}&sickerId=${stickerId}`, {});
}