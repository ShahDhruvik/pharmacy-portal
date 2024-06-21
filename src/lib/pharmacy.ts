import { FileData, HandleControls, LoadingContextType } from '@/types/common'
import { apiRequest } from '@/middleware/axios-api-request'
import { PharmacyEndPoints } from '@/utils/endPoints'
import { PharmacyFormFields } from '@/types/pharmacy-types'
import { fileUpdate, fileUpload } from './common'
import { format } from 'date-fns'
export const getPharmacys = async (
    handleControls: HandleControls,
) => {
    const res = await apiRequest('POST', PharmacyEndPoints.listAll, handleControls)
    if (res && res?.success) {
        return res?.data
    } else {
        return undefined
    }
}

export const createPharmacy = async (
    formData: PharmacyFormFields,
) => {
    const formatDate24 = (dateString: Date) => {
        return format(dateString, 'HH:mm')
    }
    const formatDateInArray = (inputArray: PharmacyFormFields['operatingTiming']) => {
        return inputArray.map((item) => {
            const formattedBreaks = []
            for (const breakItem of item.breaks) {
                formattedBreaks.push({
                    startTime: formatDate24(breakItem.startTime as Date) || null,
                    endTime: formatDate24(breakItem.endTime as Date) || null,
                })
            }

            return {
                ...item,
                startTime: formatDate24(item.startTime as Date) || null,
                endTime: formatDate24(item.endTime as Date) || null,
                breaks: formattedBreaks,
                lunchTimeStart: item.lunchTimeStart
                    ? formatDate24(item.lunchTimeStart)
                    : undefined,
                lunchTimeEnd: item.lunchTimeEnd
                    ? formatDate24(item.lunchTimeEnd)
                    : undefined,
            }
        })
    }
    const data: any = {
        info: {
            name: formData?.name ?? '',
            phone: formData?.phone ?? '',
            mobile: formData?.mobile ?? '',
            lat: Number(formData?.lat) ?? 0,
            long: Number(formData?.long) ?? 0,
            source: '',
            sqLogo: formData?.sqLogo,
            rectLogo: formData?.rectLogo,
            email: formData?.email ?? '',
            fax: formData?.fax ?? '',
            website: formData?.website ?? '',
            mode: formData?.mode?._id,
            type: formData?.type?._id,
            addressLineOne: formData?.addressLineOne ?? '',
            addressLineTwo: formData?.addressLineTwo ?? '',
            countryId: formData?.countryId?._id,
            stateId: formData?.stateId?._id,
            cityId: formData?.cityId?._id,
            pinCode: formData?.pinCode ?? '',
            contactPerson: formData?.contactPerson ?? '',
            contactPersonEmail: formData?.contactPersonEmail ?? '',
            contactPersonPhone: formData?.contactPersonMobile ?? '',
            contactPersonMobile: formData?.contactPersonPhone ?? '',
            license: formData?.license ?? '',
            tncAccept: true,
        },
        operatingTiming: formatDateInArray(formData?.operatingTiming),
        images: [],
    }
    for (const x of formData.images) {
        const file = await fileUpload(x.document)
        if (file) {
            const { url, ...rest } = x
            const imgData = { name: file.originalName, image: file.file }
            data.images.push(imgData)
        }
    }
    if (formData.sqLogo !== null) {
        const file = await fileUpload(formData?.sqLogo?.document)
        data.info.sqLogo = file.file
    }
    if (formData.rectLogo !== null) {
        const file = await fileUpload(formData?.rectLogo?.document)
        data.info.rectLogo = file.file
    }
    const res = await apiRequest(
        "POST",
        PharmacyEndPoints.onBoarding,
        data,
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};

export const editPharmacy = async (
    entityInternalId: string,
    existingFileName: string,
    formData: PharmacyFormFields,
) => {
    // const { icon, data, active, ...rest } = formData
    // const reqData = { ...rest }
    // if (formData?.icon?.file !== null) {
    //     if (formData?.icon?.url === '') {
    //         (reqData as any)['icon'] = ''
    //     } else {
    //         const updateFile = await fileUpdate(formData?.icon?.file, existingFileName);
    //         (reqData as any)['icon'] = updateFile?.file

    //     }
    // }
    const res = await apiRequest(
        "PUT",
        PharmacyEndPoints.edit + entityInternalId,
        // reqData,
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const deletePharmacy = async (
    entityInternalId: string,
) => {

    const res = await apiRequest(
        "PUT",
        PharmacyEndPoints.delete + entityInternalId,
        {},
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const inactivePharmacy = async (
    entityInternalId: string,
    entityIsActive: boolean
) => {

    const res = await apiRequest(
        "PUT",
        PharmacyEndPoints.inActive + entityInternalId,
        { isActive: entityIsActive },
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const dropdownPharmacys = async (
) => {
    const res = await apiRequest(
        "POST",
        PharmacyEndPoints.dropdown,
        {},
    );
    if (res && res.success) {
        return res.data;
    }
    return [];
};