import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { TASK } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

export const createTask = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    const data = {
      title: formData?.title,
      description: formData?.description,
      assignedToId: formData?.assignedTo?._id,
      targetedDate: formData?.targetedDate,
      taskTabId: 1,
    }
    const res = await axiosInstance.post(TASK.CREATE_TASK, data)

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
    loading({ isLoading: false, isCoverageLoader: false, isPage: false })
  }
}

export const getAllTaskDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  type: number,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    const res = await axiosInstance.post(TASK.GET, { type: type })
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
    loading({ isLoading: false, isCoverageLoader: false, isPage: false })
  }
}

export const editTask = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    const data = {
      title: formData?.title,
      description: formData?.description,
      assignedTo: formData?.assignedTo,
      targetedDate: formData?.targetedDate,
    }
    const res = await axiosInstance.put(TASK.EDIT_TASK, data)

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
    loading({ isLoading: false, isCoverageLoader: false, isPage: false })
  }
}
