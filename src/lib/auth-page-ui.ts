import axios from 'axios'
import { LoadingContextType, ShowToastFunction } from '../types/common'
import { AuthEndPoints, DashboardContent } from '../utils/endPoints'
import { CONST_API_URL, VITE_APP_API_URL } from '../utils/envVariables'

export const getAllImage = async (formData: any) => {
    try {
        const res = await axios.post(
            (CONST_API_URL || VITE_APP_API_URL) + DashboardContent.get_main_image,
            formData,
        )
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
    }
}
export const getAllFaqs = async (
    setLoading: LoadingContextType['setLoading'],
    loadingProps?: LoadingContextType['loading']['loadingProps'],
) => {
    try {
        setLoading({ isLoading: true, })
        const res = await axios.post((CONST_API_URL || VITE_APP_API_URL) + DashboardContent.get_faqs)
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
        setLoading({ isLoading: false, })
    }
}

export const getAllFeature = async () => {
    try {
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
    }
}

export const loginPharmacy = async (setLoading: LoadingContextType['setLoading'], formData: any, toast: ShowToastFunction, loadingProps: LoadingContextType['loading']['loadingProps']) => {
    try {
        setLoading({ isLoading: true, loadingProps: loadingProps })
        const res = await axios.post(
            (CONST_API_URL || VITE_APP_API_URL) + AuthEndPoints.login,
            formData,
        )
        if (res.data.success) {
            return res.data.data
        } else {
            return null
        }
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            toast('error', error.response.data.message)
        } else {
            toast('error', error.response.statusText)
        }
        return null
    } finally {
        setLoading({ isLoading: false })

    }
}