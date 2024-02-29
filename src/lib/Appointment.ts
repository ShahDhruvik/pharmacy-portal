import { LoadingState, ShowToastFunction } from '@/types/common'
import { APPOINTMENT } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

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
