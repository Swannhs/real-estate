import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-slider/assets/index.css";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import 'react-toastify/dist/ReactToastify.css';


import {Provider} from "react-redux";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./hooks/contextApi/AuthContext";
import {StaticDataContextProvider} from "./hooks/contextApi/StaticDataContext";
import {SearchedPropertyProvider} from "./hooks/contextApi/SearchedPropertyContext";
import {WishListProvider} from "./hooks/contextApi/WishListContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <AuthProvider>
            <StaticDataContextProvider>
                <SearchedPropertyProvider>
                    <WishListProvider>
                        <App/>
                    </WishListProvider>
                </SearchedPropertyProvider>
            </StaticDataContextProvider>
        </AuthProvider>
    </Provider>
);
reportWebVitals();
