import {PROPERTY} from "../actionTypes";

interface Location {
    cityName?: string;
    zipCode?: string;
    countryName?: string;
    countryCode?: string;
    state?: string;
    latitude?: string;
    longitude?: string;
    roadNumber?: string;
}

interface EstateRules {
    isPetAllowed: boolean;
    isSmokingAllowed: boolean;
    isGeneralAmenitiesAllowed: boolean;
    isPartyOrganizingAllowed: boolean;
    isCookingAllowed: boolean;
}

interface FeaturedImage {
    featuredImageUrl: string;
    featuredImageFile: null | File;
}

interface GalleryImgs {
    galleryImgsUrls: string[];
    galleryImgsFile: File[];
}

interface SelectedDate {
    startDate: Date | null;
    endDate: Date | null;
}

interface GetProperties {
    loading: boolean;
    status: boolean;
    properties: any[];
    error: any | null;
}

interface UserProperties {
    loading: boolean;
    success: boolean;
    response: {
        content: any[];
    };
    error: any | null;
}

interface EditProperty {
    prevProperty: {
        location: Location;
        estateRules: EstateRules;
        featuredImage: FeaturedImage;
        galleryImgs: GalleryImgs;
        selectedDate: SelectedDate;
        estateAdditionalRules: any[];
        estateAmenities: any;
    };
}

interface SearchProperties {
    isLoading: boolean;
    response: any;
    error: any | null;
}

interface HomepageProperties {
    isLoading: boolean;
    success: boolean;
    data: any[];
    error: any | null;
}

interface HomepageFeatures {
    isLoading: boolean;
    success: boolean;
    data: any[];
    error: any | null;
}

interface WishlistProperties {
    isLoading: boolean;
    success: boolean;
    response: any;
    error: any | null;
}

interface AddWishlistProperties {
    isLoading: boolean;
    success: boolean;
    response: any;
    error: any | null;
}

interface RemoveWishlistProperties {
    isLoading: boolean;
    success: boolean;
    data: any[];
    error: any | null;
}

interface AddProperty {
    loading: boolean;
    location: Location;
    estateRules: EstateRules;
    featuredImage: FeaturedImage;
    galleryImgs: GalleryImgs;
    selectedDate: SelectedDate;
    estateAdditionalRules: any[];
    estateAmenities: any;
    currency: string;
    title: string;
    description: string;
    discount: string;
    estateGeneration: string;
    estateName: string;
    estatePurpose: string;
    estateType: string;
    floorSpace: string;
    maxGuest: number;
    numberOfBalconies: number;
    numberOfBathrooms: number;
    numberOfBedrooms: number;
    numberOfGarages: number;
    numberOfParkingSpace: number;
    pricePerSquareFit: string;
    status: boolean;
    response: any;
    error: any | null;
}

export interface EstateInterface {
    addProperty: AddProperty;
    getProperties: GetProperties;
    userProperties: UserProperties;
    editProperty: EditProperty;
    searchProperties: SearchProperties;
    homepageProperties: HomepageProperties;
    homepageFeatures: HomepageFeatures;
    wishListProperties: WishlistProperties;
    addWishListProperties: AddWishlistProperties;
    removeWishListProperties: RemoveWishlistProperties;
}


const initialState: EstateInterface | any = {
    addProperty: {
        loading: false,
        location: {
            cityName: '',
            zipCode: '',
            countryName: '',
            countryCode: '',
            state: '',
            latitude: "",
            longitude: '',
            roadNumber: ''
        },
        estateRules: {
            isPetAllowed: true,
            isSmokingAllowed: true,
            isGeneralAmenitiesAllowed: true,
            isPartyOrganizingAllowed: true,
            isCookingAllowed: true
        },
        featuredImage: {
            featuredImageUrl: '',
            featuredImageFile: null
        },
        galleryImgs: {
            galleryImgsUrls: [],
            galleryImgsFile: [],
        },
        selectedDate: {
            startDate: null,
            endDate: null
        },
        estateAdditionalRules: [],
        estateAmenities: {},
        currency: '',
        title: '',
        description: '',
        discount: '',
        estateGeneration: '',
        estateName: '',
        estatePurpose: '',
        estateType: '',
        floorSpace: '',
        maxGuest: 0,
        numberOfBalconies: 0,
        numberOfBathrooms: 0,
        numberOfBedrooms: 0,
        numberOfGarages: 0,
        numberOfParkingSpace: 0,
        pricePerSquareFit: '',

        status: false,
        response: {},
        error: null
    },
    getProperties: {
        loading: false,
        status: false,
        properties: [],
        error: null,
    },
    userProperties: {
        loading: false,
        success: false,
        response: {
            content: []
        },
        error: null
    },
    editProperty: {
        prevProperty: {
            location: {
                cityName: '',
                zipCode: '',
                countryName: '',
                countryCode: '',
                state: '',
            },
            estateRules: {
                isPetAllowed: true,
                isSmokingAllowed: true,
                isGeneralAmenitiesAllowed: true,
                isPartyOrganizingAllowed: true,
                isCookingAllowed: true
            },
            featuredImage: {
                featuredImageUrl: '',
                featuredImageFile: null
            },
            galleryImgs: {
                galleryImgsUrls: [],
                galleryImgsFile: [],
            },
            selectedDate: {
                startDate: null,
                endDate: null
            },
            estateAdditionalRules: [],
            estateAmenities: {}
        }
    },
    searchProperties: {
        isLoading: true,
        response: {},
        error: null
    },
    homepageProperties: {
        isLoading: true,
        success: false,
        data: [],
        error: null
    },
    homepageFeatures: {
        isLoading: true,
        success: false,
        data: [],
        error: null
    },
    wishListProperties: {
        isLoading: true,
        success: false,
        response: {},
        error: null
    },
    addWishListProperties: {
        isLoading: true,
        success: false,
        response: {},
        error: null
    },
    removeWishListProperties: {
        isLoading: true,
        success: false,
        data: [],
        error: null
    }
}

export default function propertyReducer(state = initialState, action: any) {
    switch (action.type) {
        case PROPERTY.INSERT_PROPERTY_ELEMENT:
            return {
                ...state,
                addProperty: {
                    ...action.payload,
                    error: null
                }
            }
        case PROPERTY.GET_HOME_PAGE_FEATURED_PROPERTIES_REQUEST:
            return {
                ...state,
                homepageFeatures: {
                    ...state.homepageFeatures,
                    isLoading: true,
                    error: null
                }
            }
        case PROPERTY.GET_HOME_PAGE_FEATURED_PROPERTIES_SUCCESS:
            return {
                ...state,
                homepageFeatures: {
                    ...state.homepageFeatures,
                    isLoading: false,
                    success: true,
                    data: action.payload,
                    error: null
                }
            }
        case PROPERTY.GET_HOME_PAGE_FEATURED_PROPERTIES_FAILURE:
            return {
                ...state,
                homepageFeatures: {
                    ...state.homepageFeatures,
                    isLoading: false,
                    success: false,
                    error: action.payload
                }
            }
        case PROPERTY.GET_HOME_PAGE_PROPERTIES_REQUEST:
            return {
                ...state,
                homepageProperties: {
                    ...state.homepageProperties,
                    isLoading: true
                }
            }
        case PROPERTY.GET_HOME_PAGE_PROPERTIES_SUCCESS:
            return {
                ...state,
                homepageProperties: {
                    ...state.homepageProperties,
                    isLoading: false,
                    success: action.success,
                    data: action.payload
                }
            }
        case PROPERTY.GET_HOME_PAGE_PROPERTIES_FAILURE:
            return {
                ...state,
                homepageProperties: {
                    ...state.homepageProperties,
                    isLoading: false,
                    success: false,
                    error: action.payload
                }
            }
        case PROPERTY.REMOVE_PROPERTY_ELEMENT:
            return {
                ...state,
                addProperty: {
                    loading: false,
                    location: {
                        cityName: '',
                        zipCode: '',
                        countryName: '',
                        countryCode: '',
                        state: '',
                    },
                    estateRules: {
                        isPetAllowed: true,
                        isSmokingAllowed: true,
                        isGeneralAmenitiesAllowed: true,
                        isPartyOrganizingAllowed: true,
                        isCookingAllowed: true
                    },
                    featuredImage: {
                        featuredImageUrl: '',
                        featuredImageFile: null
                    },
                    galleryImgs: {
                        galleryImgsUrls: [],
                        galleryImgsFile: [],
                    },
                    selectedDate: {
                        startDate: null,
                        endDate: null
                    },
                    estateAdditionalRules: [],
                    estateAmenities: {},
                    currency: '',
                    title: '',
                    description: '',
                    discount: '',
                    estateGeneration: '',
                    estateName: '',
                    estatePurpose: '',
                    estateType: '',
                    floorSpace: '',
                    maxGuest: 0,
                    numberOfBalconies: 0,
                    numberOfBathrooms: 0,
                    numberOfBedrooms: 0,
                    numberOfGarages: 0,
                    numberOfParkingSpace: 0,
                    pricePerSquareFit: '',
                    status: false,
                    response: {},
                    error: null
                }
            }
        case PROPERTY.INSERT_EDIT_PROPERTY_ELEMENT:
            return {
                ...state,
                editProperty: {
                    ...state.editProperty,
                    prevProperty: {
                        ...action.payload
                    }
                }
            }
        case PROPERTY.GET_PROPERTIES_REQUEST:
            return {
                ...state,
                getProperties: {
                    ...state.getProperties,
                    loading: true,
                    error: null
                }
            }
        case PROPERTY.GET_PROPERTIES_SUCCESS:
            return {
                ...state,
                getProperties: {
                    ...state.getProperties,
                    loading: false,
                    status: true,
                    properties: action.payload
                }
            }
        case PROPERTY.GET_PROPERTIES_FAILURE:
            return {
                ...state,
                getProperties: {
                    ...state.getProperties,
                    loading: false,
                    status: false,
                    error: action.payload
                }
            }
        case PROPERTY.ADD_PROPERTY_REQUEST:
            return {
                ...state,
                addProperty: {
                    ...state.addProperty,
                    loading: true
                }
            }
        case PROPERTY.ADD_PROPERTY_SUCCESS:
            return {
                ...state,
                addProperty: {
                    loading: false,
                    location: {
                        cityName: '',
                        zipCode: '',
                        countryName: '',
                        countryCode: '',
                        state: '',
                    },
                    estateRules: {
                        isPetAllowed: true,
                        isSmokingAllowed: true,
                        isGeneralAmenitiesAllowed: true,
                        isPartyOrganizingAllowed: true,
                        isCookingAllowed: true
                    },
                    featuredImage: {
                        featuredImageUrl: '',
                        featuredImageFile: null
                    },
                    galleryImgs: {
                        galleryImgsUrls: [],
                        galleryImgsFile: [],
                    },
                    selectedDate: {
                        startDate: null,
                        endDate: null
                    },
                    estateAdditionalRules: [],
                    estateAmenities: {},
                    currency: '',
                    title: '',
                    description: '',
                    discount: '',
                    estateGeneration: '',
                    estateName: '',
                    estatePurpose: '',
                    estateType: '',
                    floorSpace: '',
                    maxGuest: 0,
                    numberOfBalconies: 0,
                    numberOfBathrooms: 0,
                    numberOfBedrooms: 0,
                    numberOfGarages: 0,
                    numberOfParkingSpace: 0,
                    pricePerSquareFit: '',
                    status: true,
                    response: action.payload,
                    error: null
                }
            }
        case PROPERTY.ADD_PROPERTY_FAILURE:
            return {
                ...state,
                addProperty: {
                    ...state.addProperty,
                    loading: false,
                    status: false,
                    error: action.payload
                }
            }
        case PROPERTY.ADD_PROPERTY_SUCCESSFUL:
            return {
                ...state,
                addProperty: {
                    ...state.addProperty,
                    status: false
                }
            }
        case PROPERTY.GET_PROPERTIES_BY_USER_REQUEST:
            return {
                ...state,
                userProperties: {
                    loading: true,
                    status: false,
                    response: {},
                    error: null
                }
            }
        case PROPERTY.GET_PROPERTIES_BY_USER_SUCCESS:
            return {
                ...state,
                userProperties: {
                    loading: false,
                    status: true,
                    response: action.payload,
                    error: null
                }
            }
        case PROPERTY.GET_PROPERTIES_BY_USER_FAILURE:
            return {
                ...state,
                userProperties: {
                    loading: false,
                    status: false,
                    response: {},
                    error: action.payload
                }
            }
        case PROPERTY.GET_PROPERTIES_BY_USER_CLEAN:
            return {
                ...state,
                userProperties: {
                    loading: false,
                    response: {},
                    error: null
                }
            }
        case PROPERTY.SEARCH_PROPERTIES_REQUEST:
            return {
                ...state,
                searchProperties: {
                    isLoading: true,
                    response: {},
                    error: null
                }
            }
        case PROPERTY.SEARCH_PROPERTIES_SUCCESS:
            return {
                ...state,
                searchProperties: {
                    isLoading: false,
                    response: action.payload,
                    error: null
                }
            }
        case PROPERTY.SEARCH_PROPERTIES_FAILURE:
            return {
                ...state,
                searchProperties: {
                    isLoading: false,
                    response: {},
                    error: action.payload
                }
            }
        case PROPERTY.GET_WISH_LIST_PROPERTIES_REQUEST:
            return {
                ...state,
                wishListProperties: {
                    isLoading: true,
                    success: false,
                    data: [],
                    error: null
                }
            }
        case PROPERTY.GET_WISH_LIST_PROPERTIES_SUCCESS:
            return {
                ...state,
                wishListProperties: {
                    isLoading: false,
                    success: true,
                    data: action.payload,
                    error: null
                }
            }
        case PROPERTY.GET_WISH_LIST_PROPERTIES_FAILURE:
            return {
                ...state,
                wishListProperties: {
                    isLoading: false,
                    success: false,
                    data: [],
                    error: action.payload
                }
            }
        case PROPERTY.GET_WISH_LIST_PROPERTIES_BY_USER_REQUEST:
            return {
                ...state,
                wishListProperties: {
                    isLoading: true,
                    success: false,
                    data: [],
                    error: null
                }
            }
        case PROPERTY.GET_WISH_LIST_PROPERTIES_BY_USER_SUCCESS:
            return {
                ...state,
                wishListProperties: {
                    isLoading: false,
                    success: true,
                    data: action.payload,
                    error: null
                }
            }
        case PROPERTY.GET_WISH_LIST_PROPERTIES_BY_USER_FAILURE:
            return {
                ...state,
                wishListProperties: {
                    isLoading: false,
                    success: false,
                    data: [],
                    error: action.payload
                }
            }
        case PROPERTY.ADD_WISH_LIST_PROPERTY_BY_USER_REQUEST:
            return {
                ...state,
                addWishListProperties: {
                    isLoading: true,
                    success: false,
                    response: {},
                    error: null
                }
            }
        case PROPERTY.ADD_WISH_LIST_PROPERTY_BY_USER_SUCCESS:
            return {
                ...state,
                addWishListProperties: {
                    isLoading: false,
                    success: true,
                    response: action.payload,
                    error: null
                }
            }
        case PROPERTY.ADD_WISH_LIST_PROPERTY_BY_USER_FAILURE:
            return {
                ...state,
                removeWishListProperties: {
                    isLoading: false,
                    success: false,
                    response: {},
                    error: action.payload
                }
            }
        case PROPERTY.DELETE_WISH_LIST_PROPERTY_BY_USER_REQUEST:
            return {
                ...state,
                removeWishListProperties: {
                    isLoading: true,
                    success: false,
                    response: {},
                    error: null
                }
            }
        case PROPERTY.DELETE_WISH_LIST_PROPERTY_BY_USER_SUCCESS:
            return {
                ...state,
                removeWishListProperties: {
                    isLoading: false,
                    success: true,
                    response: action.payload,
                    error: null
                }
            }
        default:
            return state;
    }
}
