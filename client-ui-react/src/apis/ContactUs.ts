import {ContactFormProps} from "../containers/ListingDetailPage/PropertyDeatails";
import axiosPublicService from "../utils/axiosPublic";

const NOTIFICATION_API_RESOURCE = '/notification';

export const contactUsApi = async (data: any, lang: string) => {
    return await axiosPublicService.post(`v1${NOTIFICATION_API_RESOURCE}/notify-service-owner`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': lang
        }
    });
}

export const contactAdvisorApi = async (data: ContactFormProps, lang: string) => {
    return await axiosPublicService.post(`v1${NOTIFICATION_API_RESOURCE}/notify-property-owner`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': lang
        }
    });
}

export const forgotPasswordApi = async (data: any) => {
    return await axiosPublicService.post(`v1${NOTIFICATION_API_RESOURCE}/notify-forgot-password`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}