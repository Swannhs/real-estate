//
export interface PropertyDataType {
    id: string | number;
    location: any;
    countryName: string;
    estateAdvertisingTypeName: string;
    estateCategoryTypeName: string;
    estatePurpose: string;
    rooms: string;
    livingArea: string;
    estateAvailable: string;
    estatePriceType: string;
    estatePrice: string;
    estateAdditionalPrice: string;
    estateFloor: string;
    estateNumberOfFloor: string;
    estateLotArea: string;
    estateFloorSpace: string;
    estateRoomHeight: string;
    estateVolume: string;
    estateYearOfBuilding: string;
    estateYearOfRenovation: string;
    estateFeatures: string;
    estateContact: PropertyContactType;
    title: string;
    description?: string;
    images: string[];
    estateStickers?: PropertyStickerType[];
}

export interface PropertyFeaturedDataType {
    id: string | number;
    location: any;
    countryName: string;
    estateAdvertisingTypeName: string;
    estateCategoryTypeName: string;
    estatePurpose: string;
    rooms: string;
    livingArea: string;
    estateAvailable: string;
    estatePriceType: string;
    estatePrice: string;
    estateAdditionalPrice: string;
    estateFloor: string;
    estateNumberOfFloor: string;
    estateLotArea: string;
    estateFloorSpace: string;
    estateRoomHeight: string;
    estateVolume: string;
    estateYearOfBuilding: string;
    estateYearOfRenovation: string;
    estateFeatures: string;
    estateContact: PropertyContactType;
    title: string;
    description: string;
    images: string[];
    estateStickers?: PropertyStickerType[];
}

export interface PropertyStickerType {
    stickerName: string,
    stickerStyle: string | null
}

export interface PropertyContactType {
    id: number | string;
    name: string;
    email: string;
    phone: string;
    displayAsPublic?: boolean;
}

export interface PublicUserType {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    userType: string;
    profilePicture: string | null;
}

//
export interface PropertyEstateRulesType {
    isPetAllowed: Boolean | null;
    isSmokingAllowed: Boolean | null;
    isGeneralAmenitiesAllowed: Boolean | null;
    isPartyOrganizingAllowed: Boolean | null;
    isCookingAllowed: Boolean | null;
}

//
export interface PropertyAmenitiesType {
    hasWifi: Boolean | null;
    hasInternet: Boolean | null;
    hasTv: Boolean | null;
    hasAirConditioning: Boolean | null;
    hasFan: Boolean | null;
    hasPrivateEntrance: Boolean | null;
    hasDryer: Boolean | null;
    hasHeater: Boolean | null;
    hasWashingMachine: Boolean | null;
    haBabyCot: Boolean | null;
    hasFridge: Boolean | null;
    hasFireSiren: Boolean | null;
    hasFireExtinguisher: Boolean | null;
    hasAntiTheftKey: Boolean | null;
    hasBasement: Boolean | null;
    hasWheelChairAccessibility: Boolean | null;
}

//
interface LocationType {
    id: number;
    lat: string;
    lng: string;
    streetNo: string;
    zipCode: string;
    city: string;
    addressLine1: string;
    searchKeywords: string;
}

interface EstateAdvertisingType {
    id: number;
    estateAdvertisingTypeName: string;
    estateAdvertisingTypeNameDe: string;
    estateAdvertisingTypeNameFr: string;
    estateAdvertisingTypeNameIt: string;
    isActive: boolean;
}

interface Country {
    id: number;
    countryName: string;
    countryCode: string;
    alpha2: string;
    region: string;
    subRegion: string;
    active: boolean;
}

interface CreatedByType {
    id: number;
    userName: string;
    password: string;
    email: string;
    creationDate: string;
    isActive: boolean;
    lastUpdateDate: string;
    userTypeEnum: string;
    appUserDetails: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        phoneNumber: string;
        profilePicture_path: string;
        verifiedAccount: boolean;
        intro: string;
        facebookLink: string;
        twitterLink: string;
        youtubeLink: string;
        instagramLink: string;
        address: string;
        language: string;
        birthDate: string;
    };
    roles: {
        id: number;
        role: string;
        description: string | null;
    }[];
    searchCriteriaList: any[]; // Update with appropriate type if available
}

export interface EstateGallery {
    id: number;
    originalImageName?: string;
    compressedImageName?: string;
    blurredImageName?: string | null;
    creationDate: string;
    isFeaturedImage: boolean | null;
}

interface EstateFeature {
    id: number;
    featuresTitle: string;
    featuresTitleDe: string;
    featuresTitleFr: string;
    featuresTitleIt: string;
}

export interface PropertySingleDataType {
    id: string | number;
    location: LocationType;
    estateAdvertiser: EstateAdvertisingType;
    estateType: string;
    country: Country;
    estateAdvertisePurpose: string;
    rooms: number;
    livingArea: number;
    estateAvailabilityPolicy: string;
    estateWillBeAvailable: string | null;
    estateWillBeAvailableTo: string | null;
    estatePriceType: string;
    estatePrice: number;
    estateAdditionalPrice: number | null;
    estateFloor: string;
    estateNumberOfFloor: number | null;
    estateLotArea: number;
    estateFloorSpace: number;
    estateRoomHeight: number;
    estateVolume: number | null;
    estateYearOfBuilding: number;
    estateYearOfRenovation: number;
    videoUrl: string;
    title: string;
    description: string;
    contact: PropertyContactType;
    isActive: boolean;
    isPublished: boolean | null;
    isDeleted: boolean;
    createdBy: CreatedByType;
    estateGalleries: EstateGallery[];
    estateDocuments: any[]; // Update with appropriate type if available
    estateFeatures: EstateFeature[];
    creationDate: string;
    lastModified: string;
    estateStickers: any[]; // Update with appropriate type if available
}

//
export interface PropertyImageTypes {
    featuredImage: File | null,
    galleryImages: File[] | null
}
