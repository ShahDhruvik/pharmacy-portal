import { LoadingState, ShowToastFunction } from '@/types/common'
import axiosInstance from '../../axiosInstance'
import { FAQ } from '@/utils/endPoints'
import Loader from '@/assets/images/loader.jpeg'

export const getAllFaqs = async (loading: LoadingState['setLoading'], toast: ShowToastFunction) => {
  try {
    loading({
      isLoading: true,
      isIndependentLoader: true,
      isPage: false,
    })
    const res = await axiosInstance.post(FAQ.GET)
    if (res.data.success) {
      return res.data.data
    }
  } catch (error: any) {
    console.log(error)
    return []
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}
