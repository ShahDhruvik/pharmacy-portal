import { FileData, HandleControls, LoadingContextType } from '@/types/common'
import { apiRequest } from '@/middleware/axios-api-request'
import { UserEndPoints } from '@/utils/endPoints'
import { UserFormFields } from '@/types/user.types'
import { fileUpdate, fileUpload } from './common'
export const getUsers = async (
    handleControls: HandleControls,
) => {
    const res = await apiRequest('POST', UserEndPoints.listAll, handleControls)
    if (res && res?.success) {
        return res?.data
    } else {
        return undefined
    }
}

export const createUser = async (
    formData: UserFormFields,
) => {
    const reqData: any = [];
    for (const x of formData.data) {
        const { active, icon, roleId, pharmacyIds, name, mobile, email, phone } = x;
        const uploadedFile: FileData = await fileUpload(icon.file);
        reqData.push({
            profilePic: uploadedFile.file,
            isActive: active,
            roleId: Number(roleId?._id),
            pharmacyIds: pharmacyIds?.map(x => { return x?._id }).join(','),
            name: name,
            phone,
            mobile,
            email
        });
    }
    const res = await apiRequest(
        "POST",
        UserEndPoints.create,
        { data: reqData },
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};

export const editUser = async (
    entityInternalId: string,
    existingFileName: string,
    formData: UserFormFields,
) => {
    const { icon, data, active, roleId, name, phone, email, mobile, pharmacyIds } = formData
    const reqData = {
        isActive: active,
        roleId: Number(roleId?._id),
        pharmacyIds: pharmacyIds?.length > 0 ? pharmacyIds?.map(x => { return x._id }).join(',') : '',
        name,
        phone,
        mobile,
        email
    }
    if (formData?.icon?.file !== null) {
        if (formData?.icon?.url === '') {
            (reqData as any)['profilePic'] = ''
        } else {
            const updateFile = await fileUpdate(formData?.icon?.file, existingFileName);
            (reqData as any)['profilePic'] = updateFile?.file

        }
    }
    const res = await apiRequest(
        "PUT",
        UserEndPoints.edit + entityInternalId,
        reqData,
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const deleteUser = async (
    entityInternalId: string,
) => {

    const res = await apiRequest(
        "PUT",
        UserEndPoints.delete + entityInternalId,
        {},
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const inactiveUser = async (
    entityInternalId: string,
    entityIsActive: boolean
) => {

    const res = await apiRequest(
        "PUT",
        UserEndPoints.inActive + entityInternalId,
        { isActive: entityIsActive },
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const dropdownUsers = async (
) => {
    const res = await apiRequest(
        "GET",
        UserEndPoints.dropdown,
        {},
    );
    if (res && res.success) {
        return res.data;
    }
    return [];
};