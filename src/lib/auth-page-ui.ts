import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { LoadingContextType } from "../types/common";
import { DashboardContent } from "../utils/endPoints";
import { CONST_API_URL, VITE_APP_API_URL } from "../utils/envVariables";

export const getAllImage = async (
    setLoading: LoadingContextType["setLoading"],
    formData: any,
    loadingProps?: LoadingContextType["loading"]["loadingProps"]
) => {
    try {
        setLoading({ isLoading: true, loadingProps: { none: true } })
        const res = await axios.post((CONST_API_URL || VITE_APP_API_URL) + DashboardContent.get_main_image, formData)
        if (res.data.success) {
            return res.data.data
        } else {
            return null
        }
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            // toast('error', error.response.data.message)
        } else {
            //   toast('error', error.response.statusText)
        }
        return null
    } finally {
        setLoading({ isLoading: false, loadingProps: { none: true } })
    }

}
export const getAllFaqs = async (
    setLoading: LoadingContextType["setLoading"],
    formData: any,
    loadingProps?: LoadingContextType["loading"]["loadingProps"]
) => {
    try {
        setLoading({ isLoading: true, loadingProps: { none: true } })
        const res = await axios.post((CONST_API_URL || VITE_APP_API_URL) + DashboardContent.get_faqs, formData)
        if (res.data.success) {
            return res.data.data
        } else {
            return null
        }
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            // toast('error', error.response.data.message)
        } else {
            //   toast('error', error.response.statusText)
        }
        return null
    } finally {
        setLoading({ isLoading: false, loadingProps: { none: true } })
    }

}

export const getAllFeature = async (
    setLoading: LoadingContextType["setLoading"],
    loadingProps?: LoadingContextType["loading"]["loadingProps"]
) => {
    try {
        setLoading({ isLoading: true, loadingProps: { none: true } })
        const res = await axios.post((CONST_API_URL || VITE_APP_API_URL) + DashboardContent.get_feature)
        if (res.data.success) {
            return res.data.data
        }
        return []
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            // toast('error', error.response.data.message)
        } else {
            // toast('error', error.response.statusText)
        }
        return []
    } finally {
        setLoading({ isLoading: false, loadingProps: { none: true } })
    }
}