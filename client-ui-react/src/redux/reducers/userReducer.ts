import {USER} from '../actionTypes';

export interface UserInfoInterface {
    loading: boolean;
    status: boolean;
    userDetails: {
        id: string;
        role: string | null;
        userName: string;
        userType: string | null;
        details: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            gender: string;
            profilePicture_path: string;
            intro: string;
            facebookLink: string;
            twitterLink: string;
            youtubeLink: string;
            instagramLink: string;
            address: string;
            language: string;
            birthDate: string;
        }
    };
    error: any;
}

const initialState: UserInfoInterface | any = {
    loading: false,
    status: false,
    userDetails: {
        id: '',
        role: null,
        userName: '',
        userType: null,
        details: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            profilePicture_path: '',
            intro: '',
            facebookLink: '',
            twitterLink: '',
            youtubeLink: '',
            instagramLink: '',
            address: '',
            language: '',
            birthDate: '',
        }
    },
    error: null
}

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case USER.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                status: false,
                userDetails: {},
                error: null
            }
        case USER.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                status: true,
                userDetails: action.payload,
                error: null
            }
        case USER.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                status: false,
                userDetails: {},
                error: action.payload
            }
        default:
            return state
    }
}
