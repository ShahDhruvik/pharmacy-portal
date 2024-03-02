import { LoadingState, ShowToastFunction } from '@/types/common'
import { APPOINTMENT } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'

export const getAllAppointments = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
) => {
  try {
    loading({ isLoading: true, isAppointmentLoader: true, isPage: false })
    const res = await axiosInstance.post(APPOINTMENT.GET)
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
    loading({ isLoading: false, isAppointmentLoader: false, isPage: false })
  }
}

export const cancelAppointment = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })

    const res = await axiosInstance.put(`${APPOINTMENT.CANCEL}${id}`)

    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Cancel)
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
