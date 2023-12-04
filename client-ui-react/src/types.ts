export interface EstateFeature {
    id: number;
    featuresTitle: string;
    featuresTitleDe: string | null;
    featuresTitleFr: string | null;
    featuresTitleIt: string | null;
}

export interface StaticDataType {
    id?: number;
    keyword?: string;
    descriptionEn?: string | null;
    descriptionDe?: string | null;
    descriptionFr?: string | null;
    descriptionIt?: string | null;
    isDeleted?: boolean;
}

export interface StaticDataInterface {
    isLoading: boolean;
    success: boolean;
    estateType: StaticDataType[];
    purpose: StaticDataType[];
    estateFeatures: EstateFeature[];
    available: StaticDataType[];
    currency: string[];
    advertising: StaticDataType[];
}

export interface AddPropertyPropsType {
    history?: any;
}

export interface locationType {
    lat: number | string,
    lng: number | string,
    streetNo: string,
    city: string,
    zipCode: string,
    addressLine1: string,
    searchKeywords: string
}

export interface estateContactType {
    id?: number | null;
    name: string,
    phone: string,
    email: string,
    displayAsPublic?: boolean;
}

export interface GalleryImageType {
    id: string,
    blurredImageName: string | null,
    compressedImageName: string | null,
    originalImageName: string | null,
    isFeaturedImage: boolean | null,
    creationDate: string | null,
}



export interface PropertyErrorsType {
    hasError: boolean,
    message: string
}

export interface EstateImageType {
    originalImageName: string,
    compressedImageName: string,
}

export interface PropertyDataType {
    id ?: number;
    location: locationType,
    estateAdvertiser?: string,
    estateType: string,
    estateAdvertisePurpose: string,
    countryId: number,
    rooms: number | undefined,
    livingArea: number | undefined,
    estateAvailabilityPolicy: string,
    estatePriceType: string,
    estatePrice: string | null | undefined,
    estateAdditionalPrice: number | undefined,
    estateFloor: string,
    estateNumberOfFloor: number | undefined,
    estateLotArea: number | undefined,
    estateFloorSpace: number | undefined,
    estateRoomHeight: number | undefined,
    estateYearOfBuilding: any,
    estateYearOfRenovation: any,
    estateGalleries: EstateImageType[];
    estateDocuments: string[];
    estateFeatures: EstateFeature[] | Array<number> | any;
    videoUrl: string,
    title: string,
    description: string,
    contact: estateContactType,
    estateWillBeAvailable: string | null,
    estateWillBeAvailableTo: string | null,
    estateStickers?: any[];
}

export interface searchAlertInterface {
    searchAlertId: number,
    receiverEmail: string,
    purpose: string,
    address: string,
    categoryId?: string | null,
    priceStart?: string | number,
    priceEnd?: string | number,
    orderBy?: string | number,
    roomStart?: string | number,
    roomEnd?: string | number,
    livingAreaStart?: string | number,
    livingAreaEnd?: string | number,
    lotAreaStart?: string | number,
    lotAreaEnd?: string | number,
    floorSpaceStart?: string | number,
    floorSpaceEnd?: string | number,
    estateYearOfBuildingStart?: string | number,
    features?: string | number
}

export interface wishListResponseInterface {
    estateIds: number[],
}

export interface WishListDataInterface {
    isLoading: boolean;
    success: boolean;
    data: any[];
    estateIds: number[];
    error: any | null;
    refreshWishList?: () => void;
    refreshWishListPublicUser?: () => void;
}

export interface CookiePolicyDataInterface {
    id: number | string;
    keyword: string;
    datatype: string;
    descriptionEn: string | null;
    descriptionDe: string | null;
    descriptionFr: string | null;
    descriptionIt: string | null;
    isDeleted: boolean;
}