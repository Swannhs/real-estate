import axiosService from "../utils/axios";
import axiosPublicService from "../utils/axiosPublic";

const BLOG_API_RESOURCE = '/blogs';

//------------------------- PUBLIC API -------------------------
export const getHomepageBlogsApi = async () => {
    return await axiosPublicService.get(`v1${BLOG_API_RESOURCE}/latest`);
}

export const getAdsBlogApi = async () => {
    return await axiosPublicService.get(`v1${BLOG_API_RESOURCE}/blogs-ads`, {
        headers: {
            "Accept": "application/json"
        }
    });
}

export const getPostApi = async (slug: string) => {
    return await axiosPublicService.get(`v1${BLOG_API_RESOURCE}/${slug}`, {
        headers: {
            "Accept": "application/json"
        }
    });
}

export const getPublicBlogApi = async (page: number, size: number) => {
    return await axiosPublicService.get(`v1${BLOG_API_RESOURCE}`, {
        headers: {
            "Accept": "application/json"
        },
        params: {
            page: page,
            size: size
        }
    });
}

//---------------------------- PRIVATE API ----------------------------
export const addPostApi = async (post: any) => {
    return await axiosService.post(`v1${BLOG_API_RESOURCE}}`, post, {
        headers: {
            "Accept": "application/json",
        }
    });
}

export const checkValidSlug = async (slug: string) => {
    return await axiosService.post(`v1${BLOG_API_RESOURCE}/validate/${slug}`, {}, {
        headers: {
            "Accept": "application/json",
        }
    })
}

export const updatePostByIdApi = async (blogId: string | number, updatePost: any) => {
    return await axiosService.put(`v1${BLOG_API_RESOURCE}/${blogId}`, updatePost, {
        headers: {
            "Accept": "application/json",
        }
    })
}

export const deleteBlogByIdApi = async (blogId: string | number) => {
    return await axiosService.delete(`v1${BLOG_API_RESOURCE}/${blogId}`, {
        headers: {
            "Accept": "application/json",
        }
    })
}
export const blogUploadFileApi = async (data: FormData) => {
    return await axiosService.post(`v1${BLOG_API_RESOURCE}/upload/image`, data, {
        headers: {
            "Accept": "application/json",
        }
    })
}