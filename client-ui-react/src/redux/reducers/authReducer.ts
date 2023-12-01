import {AUTH} from '../actionTypes';

export interface UserInterface {
    exp: number;
    ipAddress: string;
    iss: string;
    role: string[];
    sub: string;
    username: string;
}

export interface AuthInterface {
    isAuthenticated: boolean;
    login: {
        isLoading: boolean;
        error: any;
    }
    register: {
        isLoading: boolean;
        error: any;
    },
    user: UserInterface | {};
    token: {
        accessToken: string;
        refreshToken: string;
    },
    cookie?: boolean;
    registrationStatus: boolean;
}

const initialState: AuthInterface = {
    isAuthenticated: false,
    login: {
        isLoading: false,
        error: null,
    },
    register: {
        isLoading: false,
        error: null,
    },
    user: {},
    token: {
        accessToken: '',
        refreshToken: '',
    },
    cookie: false,
    registrationStatus: false,
}

export default function authReducer(state: AuthInterface = initialState, action: any) {
    switch (action.type) {
        case AUTH.LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    isLoading: true,
                    error: null,
                }
            }
        case AUTH.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                login: {
                    isLoading: false,
                    error: null,
                }
            }
        case AUTH.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                token: {
                    accessToken: '',
                    refreshToken: '',
                },
                login: {
                    isLoading: false,
                    error: action.payload
                }
            }
        case AUTH.REGISTER_REQUEST:
            return {
                ...state,
                register: {
                    isLoading: true,
                    error: null,
                }
            }
        case AUTH.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                registrationStatus: true,
                register: {
                    isLoading: false,
                    error: null,
                }
            }
        case AUTH.REGISTER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                registrationStatus: false,
                register: {
                    isLoading: false,
                    error: action.payload
                }
            }
        case AUTH.REFRESH_TOKEN_REQUEST:
            return {
                ...state,
            }
        case AUTH.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload,
            }
        case AUTH.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case AUTH.LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                user: {},
                token: {
                    accessToken: '',
                    refreshToken: '',
                },
                registrationStatus: false,
                login: {
                    isLoading: false,
                    error: null,
                },
                register: {
                    isLoading: false,
                    error: null,
                }
            }
        case AUTH.COOKIE_ACCEPTED:
            return {
                ...state,
                cookie: true,
            }
        default:
            return state;
    }
}
