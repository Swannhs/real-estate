import {LANGUAGE_TYPES} from '../actionTypes';
import {DEFAULT_LANG} from "../../types/LanguageType";

export interface LanguageStateType {
    language: string;
}

const initialState: LanguageStateType = {
    language: DEFAULT_LANG
}

export default function langReducer(state = initialState, action: any) {
    switch (action.type) {
        case LANGUAGE_TYPES.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}