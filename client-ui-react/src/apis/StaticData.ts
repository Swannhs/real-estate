import axiosStaticDataService from "../utils/axiosStatic";

export const getStaticAllDataApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/all`);
}

export const getStaticCategoryDataApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/estate-category-types`);
}

export const getPricePackagesApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/estate/payment-package`);
}

export const getPricePackageByIdApi = async (id: string) => {
    return await axiosStaticDataService.get(`v1/static-data/estate/payment-package/${id}`);
}

export const getCookiesPolicyApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/cookie-policy`);
}

export const getPrivacyPolicyApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/privacy-policy`);
}

export const getAllNoticesApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/notices`);
}

export const getCitiesByZipcodeApi = async (zipcode: string) => {
    return await axiosStaticDataService.get(`v1/static-data/get-city-by-zipcode`, {
        params: {
            zipcode: zipcode
        }
    });
}

export const getLanguagesApi = async () => {
    return await axiosStaticDataService.get(`v1/static-data/languages`);
}
export const getIsPaymentEnable = async () => {
    return await axiosStaticDataService.get(`v1/static-data/paymenent`);
}