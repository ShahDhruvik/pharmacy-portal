import { apiRequest } from "@/middleware/axios-api-request";
import { FileEndPoints } from "@/utils/endPoints";

export const fileUpload = async (
    file: File | null,
    url?: string,
) => {
    if (file) {
        const newFormData = new FormData();
        newFormData.append("file", file);
        const res = await apiRequest(
            "POST",
            url ? url : FileEndPoints.uploadCommon,
            newFormData,
        );
        if (res && res.success) {
            return res.data;
        } else {
            return { file: "", name: "" };
        }
    } else {
        return { file: "", name: "" };
    }
};
export const fileUpdate = async (
    file: File | null,
    existFileName: string,
    url?: string
) => {
    if (file) {
        const newFormData = new FormData();
        newFormData.append("file", file);
        newFormData.append("oldFile", existFileName);
        const res = await apiRequest(
            "POST",
            url ? url : FileEndPoints.uploadCommon,
            newFormData
        );
        if (res && res.success) {
            return res.data;
        } else {
            return { file: existFileName, name: "" };
        }
    } else {
        return { file: existFileName, name: "" };
    }
};