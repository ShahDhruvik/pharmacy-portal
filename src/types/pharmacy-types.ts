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