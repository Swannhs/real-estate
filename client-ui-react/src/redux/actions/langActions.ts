import {LANGUAGE_TYPES} from '../actionTypes';

export const setLanguage = (language: string) => {
    return {
        type: LANGUAGE_TYPES.SET_LANGUAGE,
        payload: language
    }
}

export const setLanguageActions = (language: string) => {
    return (dispatch: any) => {
        dispatch(setLanguage(language));
    }
}