import {combineReducers} from "redux";
import counterReducer from "./slices/counter";
import estateAdvertiser from "@/redux/slices/estate-advertiser";

const rootReducer = combineReducers({
    counter: counterReducer,
    estateAdvertiser: estateAdvertiser
});

export {rootReducer};