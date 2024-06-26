import { FileData, HandleControls, LoadingContextType } from '@/types/common'
import { apiRequest } from '@/middleware/axios-api-request'
import { RoleEndPoints } from '@/utils/endPoints'
import { RoleFormFields } from '@/types/role.types'
import { fileUpdate, fileUpload } from './common'
export const getRoles = async (
    handleControls: HandleControls,
) => {
    const res = await apiRequest('POST', RoleEndPoints.listAll, handleControls)
    if (res && res?.success) {
        return res?.data
    } else {
        return undefined
    }
}

export const createRole = async (
    formData: RoleFormFields,
) => {
    const reqData: any = [];
    for (const x of formData.data) {
        const { active, icon, ...rest } = x;
        const uploadedFile: FileData = await fileUpload(icon.file);
        reqData.push({
            ...rest,
            icon: uploadedFile.file,
            isActive: active,
        });
    }
    const res = await apiRequest(
        "POST",
        RoleEndPoints.create,
        { data: reqData },
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};

export const editRole = async (
    entityInternalId: string,
    existingFileName: string,
    formData: RoleFormFields,
) => {
    const { icon, data, active, ...rest } = formData
    const reqData = { ...rest }
    if (formData?.icon?.file !== null) {
        if (formData?.icon?.url === '') {
            (reqData as any)['icon'] = ''
        } else {
            const updateFile = await fileUpdate(formData?.icon?.file, existingFileName);
            (reqData as any)['icon'] = updateFile?.file

        }
    }
    const res = await apiRequest(
        "PUT",
        RoleEndPoints.edit + entityInternalId,
        reqData,
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const deleteRole = async (
    entityInternalId: string,
) => {

    const res = await apiRequest(
        "PUT",
        RoleEndPoints.delete + entityInternalId,
        {},
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const inactiveRole = async (
    entityInternalId: string,
    entityIsActive: boolean
) => {

    const res = await apiRequest(
        "PUT",
        RoleEndPoints.inActive + entityInternalId,
        { isActive: entityIsActive },
    );
    if (res && res.success) {
        return res.success;
    }
    return false;
};
export const dropdownRoles = async (
) => {
    const res = await apiRequest(
        "GET",
        RoleEndPoints.dropdown,
        {},
    );
    if (res && res.success) {
        return res.data;
    }
    return [];
};