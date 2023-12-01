import React, {FC, useState} from "react";
import StayCardH from "../../components/StayCardH/StayCardH";
import GoogleMapReact from "google-map-react";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import TabFilters from "./TabFilters";
import PropertyCardCustom from "../../components/PropertyCardH/PropertyCardCustom";
import ContentLoader from "react-content-loader";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import SearchPagePagination from "../../shared/Pagination/SearchPagePagination";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import ModalCustom from "../../shared/Modal/ModalCustom";
import {SearchAlertType} from "../PropertyPage/SearchResult";
import {useSearchQuery} from "../../common/query";
import {StateInterface} from "../../redux/reducers/rootReducer";
import {useSearchedProperty} from "../../hooks/contextApi/SearchedPropertyContext";
import {useAuth} from "../../hooks/contextApi/AuthContext";
import {searchAlertAuthApi} from "../../apis/SearchAlert";
import {toast} from "react-toastify";

export interface SectionGridHasMapProps {
    history?: any;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({history}) => {
    const {isLoading, meta, data} = useSearchedProperty();
    const {isAuthenticated} = useAuth()
    const {language} = useSelector((state: StateInterface) => state.lang);
    const {t} = useTranslation();
    const query = useSearchQuery();
    const [currentHover, setCurrentHover] = useState<any>(-1);
    const [showFullMapFixed, setShowFullMapFixed] = useState(false);
    const [showSearchAlertModal, setShowSearchAlertModal] = useState<boolean>(false);
    const [showSavedSearchModal, setShowSavedSearchModal] = useState<boolean>(false);
    const [searchAlertId, setSearchAlertId] = useState<string>("1");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [mapCenter, setMapCenter] = useState({
        lat: 46.206410643703684,
        lng: 6.1405401640014645
    });

    const checkValidEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleShowAlertModal = () => {
        if (!isAuthenticated) {
            history.push("/login");
            return;
        }
        setShowSearchAlertModal(true);
    }

    const handleCloseAlertModal = () => {
        setShowSearchAlertModal(false);
    }

    const handleShowSavedSearchModal = () => {
        if (!checkValidEmail(email)) {
            setEmailError(true);
            return;
        }
        let alert: SearchAlertType = {} as SearchAlertType;

        if (query.get("loc")) {
            alert.addressLine1 = query.get("loc") as string;
        }
        if (query.get("cat")) {
            alert.estateTypes = query.get('cat') as string;
        }
        if (query.get("min")) {
            alert.priceStart = query.get("min") as unknown as number;
        }
        if (query.get("max")) {
            alert.priceEnd = query.get("max") as unknown as number;
        }
        if (query.get("pur")) {
            alert.estateAdsPurpose = query.get("pur") as string;
        }
        alert.searchAlertId = searchAlertId as unknown as number;
        alert.receiverEmail = email;

        fetchAddSearchAlert(alert, language);
    }

    const fetchAddSearchAlert = (data: SearchAlertType, lang: string) => {
        searchAlertAuthApi(data, lang)
            .then(() => {
                setShowSearchAlertModal(false);
                setShowSavedSearchModal(true);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            });
    }

    const handleCloseSavedSearchModal = () => {
        setShowSavedSearchModal(false);
    }

    const loadingItemLoop = () => {
        let result = [];
        for (let i = 0; i < 12; i++) {
            result.push(
                <StayCardH key={i} isLoading={true}/>
            );
        }
        return result;
    }

    const onMouseEnterHandler = (item: any) => {
        setCurrentHover((_: any) => item)
        setMapCenter({
            lat: parseFloat(item?.location?.lat as string),
            lng: parseFloat(item?.location?.lng as string)
        })
    }

    const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onSearchAlertIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchAlertId(event.target.value);
    }

    const renderListing = () => {
        if (isLoading) {
            return loadingItemLoop();
        } else {
            if (meta.total === 0) {
                return (
                    <div className='flex flex-col mt-auto'>
                        <div className='mt-10 md:mt-32 md:mx-9 px-5 shadow-2xl rounded-2xl py-10'>
                            <h1 className='text-2xl font-semibold'>
                                {t('no-search-result-found')}
                            </h1>
                            <ul className='list-disc list-inside pl-5 mt-5'>
                                <li>{t('change-the-search-criteria')}</li>
                                <li>{t('modify-filter')}</li>
                            </ul>
                        </div>
                    </div>
                )
            } else {
                return (
                    data?.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => onMouseEnterHandler(item)}
                            onMouseLeave={() => setCurrentHover((_: any) => -1)}
                        >
                            <PropertyCardCustom data={item} isLoading={isLoading}/>
                        </div>
                    ))
                )
            }
        }
    }

    const renderGoogleMap = () => {
        if (isLoading) {
            return (
                <ContentLoader className='h-screen w-full' viewBox="0 0 100% 100%">
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%"/>
                </ContentLoader>
            )
        } else if (meta?.total === 0) {
            return <React.Fragment/>
        } else {
            return (
                <GoogleMapReact
                    defaultZoom={13}    // TODO: Might required a discussion with Alan about this map zoom
                    center={mapCenter}
                    bootstrapURLKeys={{
                        key: import.meta.env.VITE_APP_GOOGLE_API_KEY as string,
                    }}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {data?.map((item, index: number) => {
                        if (item?.location?.lat === null || item?.location?.lng === null) {
                            return <React.Fragment/>
                        }
                        return (
                            <GoogleMapComponent
                                key={index}
                                isSelected={currentHover?.id === item.id}
                                lat={parseFloat(item?.location?.lat as string)}
                                lng={parseFloat(item?.location?.lng as string)}
                                listing={item}
                            />
                        )
                    })}
                </GoogleMapReact>
            )
        }
    }


    const renderSaveAlertSearchModal = () => (
        <div>
            <div
                className={`flex items-center justify-center px-10 py-2 text-sm rounded-full border focus:outline-none cursor-pointer`}
            >
                <ModalCustom
                    modalStyleClass="inline-block py-8 px-2 lg:w-1/3 w-full"
                    open={showSearchAlertModal}
                    onClose={handleCloseAlertModal}
                >
                    <div className="flex-grow overflow-y-auto">
                        <div
                            className="px-4 py-5 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                            <div className="relative flex flex-col space-y-4">
                                <div className='my-auto'>
                                    <h3 className="text-2xl font-semibold text-center tablet:text-sm">
                                        {t('subscription.search.title')}
                                    </h3>
                                    <p className='text-md text-center font-medium'>
                                        {t('subscription.search.intro')}
                                    </p>
                                </div>
                                <p className='text-xs text-center'>
                                    {t('subscription.search.description')}
                                </p>
                                {/*three radio buttons*/}
                                <div className='flex justify-around'>
                                    <div className='flex items-center'>
                                        <input
                                            onChange={onSearchAlertIdChangeHandler}
                                            defaultChecked={true}
                                            type="radio"
                                            name="searchAlertId"
                                            id="searchAlert1"
                                            value={1}
                                            className='mr-2'/>
                                        <label htmlFor="searchAlert1" className='text-sm font-semibold'>
                                            {t('subscription.search.daily')}
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <input
                                            onChange={onSearchAlertIdChangeHandler}
                                            type="radio"
                                            name="searchAlertId"
                                            id="searchAlert2"
                                            value={2}
                                            className='mr-2'/>
                                        <label htmlFor="searchAlert2" className='text-sm font-semibold'>
                                            {t('subscription.search.weekly')}
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <input
                                            onChange={onSearchAlertIdChangeHandler}
                                            type="radio"
                                            name="searchAlertId"
                                            id="searchAlert3"
                                            value={3}
                                            className='mr-2'/>
                                        <label htmlFor="searchAlert3" className='text-sm font-semibold'>
                                            {t('subscription.search.monthly')}
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="nc-Label text-md font-medium text-neutral-700 dark:text-neutral-300 "
                                        data-nc-id="Label">
                                        {t('subscription.search.enter.email')}
                                    </label>
                                    <input type="text"
                                           className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring 
                                           focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700
                                            dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900
                                             rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5 ${emailError && 'border-2 border-red-500'}`}
                                           name="email" onChange={onEmailChangeHandler}/>
                                    <span
                                        className={`text-xs text-red-500 absolute ${!emailError && 'hidden'}`}>
                                        {t('subscription.search.enter.valid.email')}
                                    </span>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <button
                                    onClick={handleShowSavedSearchModal}
                                    className='bg-blue-600 px-5 py-2 w-full text-white rounded-md hover:bg-indigo-700 focus:outline-none'>
                                    {t('subscription.search.save-search')}
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalCustom>
            </div>
        </div>
    )

    const renderSavedAlertModal = () => (
        <div>
            <div
                className={`flex items-center justify-center px-10 py-2 text-sm rounded-full border focus:outline-none cursor-pointer`}
            >
                <ModalCustom
                    modalStyleClass="inline-block py-8 px-2 lg:w-1/3 w-full"
                    open={showSavedSearchModal}
                    onClose={handleCloseSavedSearchModal}
                >
                    <div className="flex-grow">
                        <div
                            className="px-4 py-5 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                            <div className="relative flex flex-col space-y-2">
                                <div className='my-auto'>
                                    <h3 className="text-2xl font-semibold text-center tablet:text-sm">
                                        {t('subscription.search.is.saved')}
                                    </h3>
                                </div>
                                <p className='text-sm p-0 m-0'>
                                    {t('subscription.search.is.saved.description1')}
                                </p>
                                <p className='text-sm p-0 m-0'>
                                    {t('subscription.search.is.saved.description2')}
                                </p>
                                <p className='text-sm p-0 m-0'>
                                    {t('subscription.search.is.saved.description3')}
                                </p>
                            </div>
                            <div className='mt-5'>
                                <button
                                    onClick={handleCloseSavedSearchModal}
                                    className='bg-blue-600 px-5 py-2 w-full text-white rounded-md hover:bg-indigo-700 focus:outline-none'>
                                    {t('subscription.search.back.search')}
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalCustom>
            </div>
        </div>
    )

    const renderSearchAlertFunctionality = () => {
        if (isAuthenticated) {
            return (
                <>
                    {renderSaveAlertSearchModal()}
                    {renderSavedAlertModal()}
                </>
            )
        }
    }

    return (
        <div className="relative flex min-h-screen gap-x-3">
            {/* CARDSSSS */}
            <div className="min-h-screen tablet:w-[440px] tablet-landscape:w-[540px] xl:w-[780px] 2xl:w-[880px] lg:px-6">
                <div className="mb-8 lg:mb-11">
                    <TabFilters handleShowAlertModal={handleShowAlertModal}/>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    {renderListing()}
                </div>
                <div className="flex mt-16 justify-center items-center">
                    {
                        isLoading ? <ContentLoader/> :
                            <SearchPagePagination meta={meta}/>
                    }
                </div>
            </div>

            {!showFullMapFixed && (
                <div
                    className="flex md:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
                    onClick={() => setShowFullMapFixed(true)}>
                    <i className="text-lg las la-map"></i>
                    <span>{t('show-map')}</span>
                </div>
            )}

            <div className={`md:flex-grow md:static md:block ${
                showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
            }`}>
                {showFullMapFixed && (
                    <ButtonClose
                        onClick={() => setShowFullMapFixed(false)}
                        className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
                    />
                )}

                <div
                    className="fixed md:sticky top-0 md:top-[88px] left-0 w-full h-full md:h-[calc(100vh-88px)] rounded-md overflow-hidden tablet:w-[280px] tablet:ml-2 lg:w-[98%]">
                    {renderGoogleMap()}
                </div>
                {renderSearchAlertFunctionality()}
            </div>
        </div>
    );
};

export default SectionGridHasMap;
