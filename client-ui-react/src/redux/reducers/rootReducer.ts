import {combineReducers} from "redux";
import propertyReducer from "./propertyReducer";
import authReducer, {AuthInterface} from "./authReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import staticDataReducer from "./staticDataReducer";
import searchAlertReducer from "./searchAlertReducer";
import langReducer, {LanguageStateType} from "./langReducer";
import {settingsReducer, SettingsStateType} from "./settingsReducer";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export interface StateInterface {
    auth: AuthInterface;
    property: any;
    blog: any;
    user: any;
    static: any;
    alert: any;
    lang: LanguageStateType,
    settings: SettingsStateType
}

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
};

const authPersistConfig = {
    key: 'auth',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['isAuthenticated', 'token']
};

const propertyPersistConfig = {
    key: 'property',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const blogPersistConfig = {
    key: 'blog',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const userPersistConfig = {
    key: 'user',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const staticDataPersistConfig = {
    key: 'static',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const searchAlertPersistConfig = {
    key: 'searchAlert',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const langPersistConfig = {
    key: 'lang',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

const settingsPersistConfig = {
    key: 'settings',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
}

// @ts-ignore
const rootReducer = combineReducers<StateInterface>({
    auth: persistReducer(authPersistConfig, authReducer),
    property: persistReducer(propertyPersistConfig, propertyReducer),
    blog: persistReducer(blogPersistConfig, blogReducer),
    user: persistReducer(userPersistConfig, userReducer),
    static: persistReducer(staticDataPersistConfig, staticDataReducer),
    alert: persistReducer(searchAlertPersistConfig, searchAlertReducer),
    lang: persistReducer(langPersistConfig, langReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer)
});

export {rootPersistConfig, rootReducer};
