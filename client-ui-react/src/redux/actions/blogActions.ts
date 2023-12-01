import {BLOG} from "../actionTypes";
import * as apis from '../../apis/Blog';
import {getPostByUsernameApi} from "../../apis/User";

export const addBlogRequest = () => ({
    type: BLOG.ADD_BLOG_REQUEST,
});

export const addBlogSuccess = (data: any) => ({
    type: BLOG.ADD_BLOG_SUCCESS,
    payload: data,
});

export const addBlogFailure = (error: any) => ({
    type: BLOG.ADD_BLOG_FAILURE,
    payload: error,
});

export const getBlogsRequest = () => ({
    type: BLOG.GET_BLOG_REQUEST,
});

export const getBlogsSuccess = (response: any) => ({
    type: BLOG.GET_BLOG_SUCCESS,
    payload: response,
});

export const getBlogsFailure = (error: any) => ({
    type: BLOG.GET_BLOG_FAILURE,
    payload: error,
});

export const getAdsRequest = () => ({
    type: BLOG.GET_ADS_BLOG_REQUEST,
});

export const getAdsSuccess = (data: any) => ({
    type: BLOG.GET_ADS_BLOG_SUCCESS,
    payload: data,
});

export const getAdsFailure = (error: any) => ({
    type: BLOG.GET_ADS_BLOG_FAILURE,
    payload: error,
});

export const getBlogsClean = () => ({
    type: BLOG.GET_BLOG_CLEAN
});

export const getBlogByUsernameRequest = () => ({
    type: BLOG.GET_BLOG_BY_USERNAME_REQUEST
});

export const getBlogByUsernameSuccess = (data: any) => ({
    type: BLOG.GET_BLOG_BY_USERNAME_SUCCESS,
    payload: data
});

export const getBlogByUsernameFailure = (error: any) => ({
    type: BLOG.GET_BLOG_BY_USERNAME_FAILURE,
    payload: error.datalist
})

export const getHomeBlogRequest = () => ({
    type: BLOG.GET_HOMEPAGE_BLOG_REQUEST
});

export const getHomeBlogSuccess = (data: any) => ({
    type: BLOG.GET_HOMEPAGE_BLOG_SUCCESS,
    payload: data
});

export const getHomeBlogFailure = (error: any) => ({
    type: BLOG.GET_HOMEPAGE_BLOG_FAILURE,
    payload: error
});

export const addBlogActions = (data: any) => {
    return (dispatch: any) => {
        dispatch(addBlogRequest());
        return apis.addPostApi(data)
            .then((response: any) => {
                dispatch(addBlogSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(addBlogFailure(error.response.data));
            });
    }
}

export const getBlogsActions = (pages: number, size: number) => {
    return (dispatch: any) => {
        dispatch(getBlogsRequest());
        return apis.getPublicBlogApi(pages, size)
            .then((response: any) => {
                dispatch(getBlogsSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getBlogsFailure(error.response.data));
            });
    }
}

export const getBlogsByUsernameActions = (username: string) => {
    return (dispatch: any) => {
        dispatch(getBlogByUsernameRequest());
        return getPostByUsernameApi(username)
            .then((response: any) => {
                dispatch(getBlogByUsernameSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getBlogByUsernameFailure(error));
            });
    }
}

export const getAdsBlogActions = () => {
    return (dispatch: any) => {
        dispatch(getAdsRequest());
        return apis.getAdsBlogApi()
            .then((response: any) => {
                dispatch(getAdsSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getAdsFailure(error.response.data));
            });
    }
}

export const getHomepageBlogActions = () => {
    return (dispatch: any) => {
        dispatch(getHomeBlogRequest());
        return apis.getHomepageBlogsApi()
            .then((response: any) => {
                dispatch(getHomeBlogSuccess(response.data));
            })
            .catch((error: any) => {
                dispatch(getHomeBlogFailure(error.response.data));
            });
    }
}