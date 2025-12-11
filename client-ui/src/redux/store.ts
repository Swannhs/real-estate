import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "@/redux/rootReducer";

// Define the shape of your root state object
interface RootState {
}

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});

export default store;