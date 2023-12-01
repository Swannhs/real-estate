import {ComponentType} from "react";

export interface LocationStates {
    "/"?: {};
    "/#"?: {};
    "/home-2"?: {};
    "/home-3"?: {};
    "/home-1-header-2"?: {};
    //
    "/listing-flights"?: {};
    //
    "/listing-stay"?: {};
    "/listing-stay-map"?: {};
    "/estate-details/:id": {},
    "/listing-stay-detail"?: {};
    //
    "/listing-experiences"?: {};
    "/listing-experiences-map"?: {};
    "/listing-experiences-detail"?: {};
    //
    "/listing-real-estate"?: {};
    "/listing-real-estate-map"?: {};
    "/listing-real-estate-detail"?: {};
    //
    "/listing-car"?: {};
    "/listing-car-map"?: {};
    "/listing-car-detail"?: {};
    //
    "/checkout"?: {};
    "/pay-done"?: {};
    //
    "/account"?: {};
    "/account-properties"?: {};
    "/account-password"?: {};
    "/wishlist"?: {};
    "/account-billing"?: {};
    "/account-blogs"?: {};
    //
    "/blog"?: {};
    "/blog/:slug"?: {};
    "/add-blog"?: {};
    "/blog/edit/:slug"?: {};
    "/blog-preview"?: {};
    //
    "/add/property": {},
    "/edit/property/:id": {},
    "/preview/property/:id": {};
    //
    "/author"?: {};
    "/search"?: {};
    "/about"?: {};
    "/contact"?: {};
    "/wish-list"?: {};
    "/login"?: {};
    "/signup"?: {};
    "/forgot-pass"?: {};
    "/reset-password"?: {};
    "/page404"?: {};
    "/subscription/:propertyId"?: {};
    "/privacypolicy"?: {};
    "/legalnotice"?: {};
    "/gtc"?: {};
    "/search-alert"?: {};
    "/search-alert/verify-email"?: {};
    "/admin/cookie-policy"?: {};
    "/admin/privacy-policy"?: {};
    "/admin/payment-settings"?: {};
    "/admin/manage-users"?: {};
    "/admin/payment-setting"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
    path: PathName;
    exact?: boolean;
    component: ComponentType<Object>;
}
