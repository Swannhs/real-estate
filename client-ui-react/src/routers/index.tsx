import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Page} from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "./../shared/Footer/Footer";
import PageHome2 from "../containers/PageHome/PageHome2";
import SearchResult from "../containers/PropertyPage/SearchResult";
import PropertyDetails from "../containers/ListingDetailPage/PropertyDeatails";
import AccountPage from "../containers/AccountPage/AccountPage";
import AccountPass from "../containers/AccountPage/AccountPass";
import BlogsListPage from "../containers/AccountPage/BlogsListPage";
import AccountProperties from "../containers/AccountPage/AccountProperties";
import BlogPage from "../containers/BlogPage/BlogPage";
import BlogSingle from "../containers/BlogPage/BlogSingle";
import AddBlogPage from "../containers/BlogPage/AddBlogPage/AddBlogPage";
import BlogPreviewPage from "../containers/BlogPage/BlogPreviewPage";
import EditBlogPage from "../containers/BlogPage/EditBlogPage";
import AddAndEditProperty from "../containers/PropertyPage/AddAndEditProperty";
import PageSubscription from "../containers/PageSubcription/PageSubscription";
import PageLogin from "../containers/PageLogin/PageLogin";
import PageSignUp from "../containers/PageSignUp/PageSignUp";
import PageContact from "../containers/PageContact/PageContact";
import useWindowSize from "../hooks/useWindowResize";
import SiteHeader from "../containers/SiteHeader";
import Page404 from "../containers/Page404/Page404";
import FooterNav from "../components/FooterNav";
import HeroSearchForm2MobileFactory from "../components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import CheckOutPage from "../containers/CheckOutPage/CheckOutPage";
import GeneralTermsAndConditions from "../containers/NoticePage/GeneralTermsAndConditions";
import PrivacyPolicy from "../containers/NoticePage/PrivacyPolicy";
import LegalNotice from "../containers/NoticePage/LegalNotice";
import AuthWishListPage from "../containers/AccountPage/AuthWishListPage";
import SearchAlertPage from "../containers/AccountPage/SearchAlertPage";
import SearchAlertEmailVerify from "../containers/SearchAlert/SearchAlertEmailVerify";
import {useState} from "react";
import {useAuth} from "../hooks/contextApi/AuthContext";
import PageForgotPassword from "../containers/PageForgotPassword/PageForgotPassword";
import PageChangePassword from "../containers/PageForgotPassword/PageChangePassword";
import PropertyPreview from "../containers/ListingDetailPage/PropertyPreview";
import PublicWishListPage from "../containers/PageWishList/PublicWishListPage";
import PrivacyPolicySetting from "../containers/SuperUserPage/PrivacyPolicySetting";
import CookiePolicySetting from "../containers/SuperUserPage/CookiePolicySetting";
import ManageUser from "../containers/SuperUserPage/ManageUser";
import PaymentSetting from "../containers/SuperUserPage/PaymentSetting";


const privatePages: Page[] = [
    // {path: "/author", component: AuthorPage},
    {path: "/account", component: AccountPage},
    {path: "/account-password", component: AccountPass},
    {path: "/account-properties", component: AccountProperties},
    {path: "/wishlist", component: AuthWishListPage},
    // {path: "/account-billing", component: AccountBilling},  // TODO: Will be added later
    {path: "/account-blogs", component: BlogsListPage},
    //
    {path: "/add-blog", component: AddBlogPage, exact: true},
    {path: "/blog/edit/:slug", component: EditBlogPage, exact: true},
    {path: "/blog-preview", component: BlogPreviewPage, exact: true},
    //
    {path: "/add/property", component: AddAndEditProperty, exact: true},
    {path: "/edit/property/:id", component: AddAndEditProperty, exact: true},
    {path: "/preview/property/:id", component: PropertyPreview, exact: true},
];

const paymentPages: Page[] = [
    {path: "/checkout", component: CheckOutPage},
    {path: "/subscription/:propertyId", component: PageSubscription},
];

const publicPages: Page[] = [
    {path: "/", exact: true, component: PageHome2},
    {path: "/search", component: SearchResult},
    {path: "/estate-details/:id", component: PropertyDetails},
    //
    {path: "/blog", component: BlogPage, exact: true},
    {path: "/blog/:slug", component: BlogSingle, exact: true},
    //
    {path: "/search-alert", exact: true, component: SearchAlertPage},
    {path: "/search-alert/verify-email", component: SearchAlertEmailVerify},
    //
    {path: "/contact", component: PageContact},
    {path: "/wish-list", component: PublicWishListPage},
    // {path: "/about", component: PageAbout},  // TODO: Will be added later
    {path: "/signup", component: PageSignUp},
    {path: "/login", component: PageLogin},
    {path: "/forgot-pass", component: PageForgotPassword},
    {path: "/reset-password", component: PageChangePassword},
    {path: "/gtc", component: GeneralTermsAndConditions},
    {path: "/privacypolicy", component: PrivacyPolicy},
    {path: "/legalnotice", component: LegalNotice},
];

const superUserPages: Page[] = [
    {path: "/admin/privacy-policy", component: PrivacyPolicySetting},
    {path: "/admin/cookie-policy", component: CookiePolicySetting},
    {path: "/admin/manage-users", component: ManageUser},
    {path: "/admin/payment-setting", component: PaymentSetting},
];

const Routes = () => {
    const {isAuthenticated, isSuperUser} = useAuth();
    const [isPaymentEnable, setIsPaymentEnable] = useState<boolean>(true);
    const WIN_WIDTH = useWindowSize().width || window.innerWidth;

    const renderRoutes = () => {
        let pages = [];

        if (isAuthenticated) {
            if (isPaymentEnable) {
                pages.push(...privatePages, ...publicPages, ...paymentPages);
            } else {
                pages.push(...privatePages, ...publicPages);
            }
            if (isSuperUser) {
                pages.push(...superUserPages);
            }
        } else {
            pages.push(...publicPages);
        }

        return pages.map((page, index) => <Route key={index} path={page.path} exact={page.exact}
                                                 component={page.component}/>);
    }

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <SiteHeader/>
            <HeroSearchForm2MobileFactory/>

            <Switch>
                {renderRoutes()}
                <Route component={Page404}/>
            </Switch>

            {WIN_WIDTH < 768 && <FooterNav/>}
            <Footer/>
        </BrowserRouter>
    );
};

export default Routes;
