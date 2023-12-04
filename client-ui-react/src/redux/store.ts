import {rootReducer} from "./reducers/rootReducer";
import {createBrowserHistory} from "history";
import thunk from 'redux-thunk';
import {configureStore} from "@reduxjs/toolkit";

export const history = createBrowserHistory();

const initialState = {};
const middleware = [thunk];

let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: import.meta.env.DEV,
    preloadedState: initialState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
