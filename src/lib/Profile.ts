import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { PROFILE } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

const getAllProfile = async (loading: LoadingState['setLoading'], toast: ShowToastFunction) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(PROFILE.GET)
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

export { getAllProfile }
