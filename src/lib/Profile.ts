import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { DROPDOWN, PROFILE } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'
import axios from 'axios'
import { VITE_APP_API_URL } from '@/utils/envVariables'
import { CONST_API_URL } from '@/utils/constants'

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
const getProfileAfterLogin = async (loading: LoadingState['setLoading'], toast: ShowToastFunction, accessToken: string, refreshToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': `Bearer ${refreshToken}`
      }
    }
    loading({ isLoading: false, isIndependentLoader: true, isPage: false })
    const res = await axios.post((VITE_APP_API_URL || CONST_API_URL) + PROFILE.GET, {}, config)
    if (res.data.success) {
      return res.data.data[0]
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
const getDrpOrg = async (loading: LoadingState['setLoading'], toast: ShowToastFunction, accessToken: string, refreshToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': `Bearer ${refreshToken}`
      }
    }
    loading({ isLoading: false, isIndependentLoader: true, isPage: false })
    let resp = []
    const res = await axios.post((VITE_APP_API_URL || CONST_API_URL) + DROPDOWN.drpOrg, {}, config)
    if (res.data.success) {
      resp = res.data.data
    }
    return resp
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
    return []
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}
export { getAllProfile, getProfileAfterLogin, getDrpOrg }
