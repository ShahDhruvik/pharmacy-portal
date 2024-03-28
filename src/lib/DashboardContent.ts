import { LoadingState, ShowToastFunction } from '@/types/common'
import { DASHBOARD_CONTENT } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

export const getAllImage = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DASHBOARD_CONTENT.GET_MAIN_IMG, formData)
    if (res.data.success) {
      return res.data.data
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

export const getAllFeature = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DASHBOARD_CONTENT.GET_FEATURE)
    if (res.data.success) {
      return res.data.data
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

export const getAllRibbon = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DASHBOARD_CONTENT.GET_RIBBON)
    if (res.data.success) {
      return res.data.data
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}
