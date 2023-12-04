import {BLOG} from "../actionTypes";

interface Preview {
    title: string;
    metaTitle: string;
    subUrl: string;
    thumbnail: null | File;
    thumbnailPreview?: string;
    shortDescription: string;
    blogBody: string;
    coverImage: null | File;
}

interface AddBlog {
    loading: boolean;
    status: boolean;
    error: any | null;
    preview: Preview;
    response: any;
}

interface GetBlogs {
    loading: boolean;
    status: boolean;
    response: any;
    error: any | null;
}

interface GetBlogByUsername {
    loading: boolean;
    data: any[];
    error: any | null;
}

interface GetAds {
    loading: boolean;
    data: any[];
    error: any | null;
}

interface GetHomePageBlogs {
    loading: boolean;
    status: boolean;
    response: any;
    error: any | null;
}

export interface BlogInterface {
    addBlog: AddBlog;
    getBlogs: GetBlogs;
    getBlogByUsername: GetBlogByUsername;
    getAds: GetAds;
    getHomePageBlogs: GetHomePageBlogs;
}

const initialState: BlogInterface | any = {
    addBlog: {
        loading: false,
        status: false,
        error: null,
        preview: {
            title: '',
            metaTitle: '',
            subUrl: '',
            thumbnail: null,
            thumbnailPreview: undefined,
            shortDescription: '',
            blogBody: '',
            coverImage: null,
        },
        response: {}
    },
    getBlogs: {
        loading: false,
        status: false,
        response: {},
        error: null
    },
    getBlogByUsername: {
        loading: false,
        data: [],
        error: null
    },
    getAds: {
        loading: false,
        data: [],
        error: null
    },
    getHomePageBlogs: {
        loading: false,
        status: false,
        response: {},
        error: null
    }
}

export default function blogReducer(state = initialState, action: any) {
    switch (action.type) {
        case BLOG.INSERT_BLOG_ELEMENT:
            return {
                ...state,
                addBlog: {
                    ...state.addBlog,
                    response: {},
                    preview: action.payload
                }
            }
        case BLOG.REMOVE_BLOG_ELEMENT:
            return {
                ...state,
                addBlog: {
                    loading: false,
                    status: false,
                    error: null,
                    preview: {
                        title: '',
                        metaTitle: '',
                        subUrl: '',
                        thumbnail: null,
                        thumbnailPreview: undefined,
                        shortDescription: '',
                        blogBody: '',
                        coverImage: null,
                    }
                }
            }
        case BLOG.ADD_BLOG_REQUEST:
            return {
                ...state,
                addBlog: {
                    ...state.addBlog,
                    loading: true,
                    preview: {
                        ...state.addBlog.preview,
                    }
                }
            }
        case BLOG.ADD_BLOG_SUCCESS:
            return {
                ...state,
                addBlog: {
                    loading: false,
                    status: true,
                    preview: {
                        title: '',
                        metaTitle: '',
                        subUrl: '',
                        thumbnail: null,
                        thumbnailPreview: undefined,
                        shortDescription: '',
                        blogBody: '',
                        coverImage: null,
                    },
                    response: action.payload,
                    error: null
                }
            }
        case BLOG.ADD_BLOG_FAILURE:
            return {
                ...state,
                addBlog: {
                    ...state.addBlog,
                    loading: false,
                    status: false,
                    error: action.payload,
                    preview: {
                        ...state.addBlog.preview
                    }
                }
            }
        case BLOG.REMOVE_ADD_BLOG_ERROR:
            return {
                ...state,
                addBlog: {
                    ...state.addBlog,
                    loading: false,
                    status: false,
                    error: null
                }
            }
        case BLOG.GET_ADS_BLOG_REQUEST:
            return {
                ...state,
                getAds: {
                    loading: true,
                    data: [],
                    error: null
                }
            }
        case BLOG.GET_ADS_BLOG_SUCCESS:
            return {
                ...state,
                getAds: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        case BLOG.GET_ADS_BLOG_FAILURE:
            return {
                ...state,
                getAds: {
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        case BLOG.GET_BLOG_REQUEST:
            return {
                ...state,
                getBlogs: {
                    status: false,
                    loading: true,
                    response: {},
                    error: null
                }
            }
        case BLOG.GET_BLOG_SUCCESS:
            return {
                ...state,
                getBlogs: {
                    loading: false,
                    status: true,
                    response: action.payload,
                    error: null
                }
            }
        case BLOG.GET_BLOG_FAILURE:
            return {
                ...state,
                getBlogs: {
                    loading: false,
                    status: false,
                    response: {},
                    error: action.payload
                }
            }
        case BLOG.GET_BLOG_CLEAN:
            return {
                ...state,
                getBlogs: {
                    loading: false,
                    status: false,
                    response: {},
                    error: null
                }
            }
        case BLOG.GET_BLOG_BY_USERNAME_REQUEST:
            return {
                ...state,
                getBlogByUsername: {
                    ...state.getBlogByUsername,
                    loading: true,
                    error: null
                }
            }
        case BLOG.GET_BLOG_BY_USERNAME_SUCCESS:
            return {
                ...state,
                getBlogByUsername: {
                    ...state.getBlogByUsername,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        case BLOG.GET_BLOG_BY_USERNAME_FAILURE:
            return {
                ...state,
                getBlogByUsername: {
                    ...state.getBlogByUsername,
                    loading: false,
                    error: action.payload
                }
            }
        case BLOG.GET_HOMEPAGE_BLOG_REQUEST:
            return {
                ...state,
                getHomePageBlogs: {
                    loading: true,
                    status: false,
                    error: null
                }
            }
        case BLOG.GET_HOMEPAGE_BLOG_SUCCESS:
            return {
                ...state,
                getHomePageBlogs: {
                    loading: false,
                    status: true,
                    response: action.payload,
                    error: null
                }
            }
        case BLOG.GET_HOMEPAGE_BLOG_FAILURE:
            return {
                ...state,
                getHomePageBlogs: {
                    loading: false,
                    status: false,
                    response: {},
                    error: action.payload
                }
            }
        default:
            return state;
    }
}
