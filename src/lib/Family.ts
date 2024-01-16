import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { FAMILY } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

const createFamily = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNo: formData.contactNo,
      accRelation: formData.accRelation.label,
      profileEmail: formData.profileEmail,
      dob: formData.dob,
      gender: formData.gender,
    }
    const res = await axiosInstance.post(FAMILY.CREATE, data)

    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Success)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error: any) {
    console.log(error)
    toast('error', error?.response?.data?.message)
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const getAllFamily = async (loading: LoadingState['setLoading'], toast: ShowToastFunction) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(FAMILY.GET)
    if (res.data.success) {
      return res.data.data
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      // toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const editFamily = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
  id: string,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNo: formData.contactNo,
      accRelation: formData.accRelation.label,
      profileEmail: formData.profileEmail,
      dob: formData.dob,
      gender: formData.gender,
    }
    const res = await axiosInstance.put(`${FAMILY.EDIT}${id}`, data)
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Updated)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error: any) {
    console.log(error)
    toast('error', error?.response?.data?.message)
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const deleteFamily = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.put(`${FAMILY.DELETE}${id}`)
    return res.data.success
  } catch (error: any) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

export { createFamily, getAllFamily, editFamily, deleteFamily }
