import { SelectDDL } from "./common";

enum PharmacyModes {
    InPerson = 'In Person',
    HomeDelivery = 'Home Delivery',
    Hybrid = 'Hybrid',
}
enum PharmacyTypes {
    Allopathy = 'Allopathy',
    Ayurvedic = 'Ayurvedic',
    Homeopathy = 'Homeopathy',
    Natural = 'Natural',
    Hybrid = 'Hybrid',
}
export const pharmacyModesOptions: SelectDDL[] = Object.keys(PharmacyModes).map((x) => {
    return { _id: (PharmacyModes as Record<string, string>)[x], label: (PharmacyModes as Record<string, string>)[x] }
})
export const pharmacyTypesOptions: SelectDDL[] = Object.keys(PharmacyTypes).map((x) => {
    return { _id: (PharmacyTypes as Record<string, string>)[x], label: (PharmacyTypes as Record<string, string>)[x] }
})
export type PharmacyFormFields = {
    sqLogo: { document: File | null, url: string };
    rectLogo: { document: File | null, url: string };
    name: string;
    phone: string;
    mobile: string;
    email: string;
    website?: string;
    mode: SelectDDL;
    type: SelectDDL;
    addressLineOne: string;
    addressLineTwo?: string;
    countryId: SelectDDL;
    stateId: SelectDDL;
    cityId: SelectDDL;
    contactPerson: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    contactPersonMobile: string;
    tncAccept: boolean;
    source?: string;
    lat?: string;
    long?: string;
    fax?: string;
    pinCode?: string;
    license?: string;
    images: {
        document: File | null,
        url: string
    }[]
    operatingTiming: {
        day: string
        startTime: Date | null
        endTime: Date | null
        breaks: {
            idExist?: number
            startTime: Date | null
            endTime: Date | null
        }[]
        lunchTimeStart: Date | null
        lunchTimeEnd: Date | null
        offDay: boolean
    }[]

    breaksManage: {
        startTime: Date | null
        endTime: Date | null
    }[]
}

type UserType = {
    userType: string;
    userRole: string;
    userId: number;
    userName: string;
};

type Image = {
    id: number;
    organizationId: number;
    name: string;
    image: string;
    pharmacyId: number;
    internalId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string; // JSON string of UserType
    updatedBy: string | null;
    deletedBy: string | null;
    isActive: boolean;
    isDeleted: boolean;
};

type Timing = {
    id: number;
    organizationId: number;
    day: string;
    startTime: string;
    endTime: string;
    lunchTimeStart: string;
    lunchTimeEnd: string;
    offDay: boolean;
    pharmacyId: number;
    internalId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string; // JSON string of UserType
    updatedBy: string | null;
    deletedBy: string | null;
    isActive: boolean;
    isDeleted: boolean;
};

type Country = {
    name: string;
    shortName: string;
    isActive: boolean;
    isDeleted: boolean;
    id: string;
};

type State = {
    name: string;
    shortName: string;
    isActive: boolean;
    isDeleted: boolean;
    id: string;
};

type City = {
    name: string;
    shortName: string;
    isActive: boolean;
    isDeleted: boolean;
    id: string;
};

export type Pharmacy = {
    isNewRecord: boolean;
    id: number;
    organizationId: number;
    name: string;
    sqLogo: string;
    rectLogo: string;
    phone: string;
    email: string;
    mobile: string;
    lat: number;
    long: number;
    fax: string;
    website: string;
    type: string;
    mode: string;
    addressLineOne: string;
    addressLineTwo: string;
    countryId: string;
    stateId: string;
    cityId: string;
    pinCode: string;
    contactPerson: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    contactPersonMobile: string;
    tncAccept: boolean;
    internalId: string;
    license: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string; // JSON string of UserType
    updatedBy: string | null;
    deletedBy: string | null;
    isActive: boolean;
    isDeleted: boolean;
    PharmacyImages: Image[];
    PharmacyTimings: Timing[];
    PharmacyBreakTimes: any[]; // Assuming it's an array but not defined in the given JSON
    country: Country;
    state: State;
    city: City;
};