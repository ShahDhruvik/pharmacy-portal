import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { AUTH_ENDPOINT } from '@/utils/endPoints'
// import { Dispatch, SetStateAction } from 'react'
import axiosInstance from '../../axiosInstance'

const loginUser = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      contactNo: formData,
    }
    const res = await axiosInstance.post(`${AUTH_ENDPOINT.PATIENT_LOGIN}`, data)

    if (res.data.success) {
      // toast('success', COMMON_MESSAGE.Login)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

const verifyOtp = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  //   setIsPass: Dispatch<SetStateAction<boolean>>,
  //   setUuid: Dispatch<SetStateAction<string | undefined>>,
  otp: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const data = {
      otp: otp,
    }
    const res = await axiosInstance.post(`${AUTH_ENDPOINT.PATIENT_VERIFY_OTP}`, data)
    if (res.data.success) {
      //   setIsPass(true)
      //   console.log(res.data.data.uuid)
      //   if (res.data.data) {
      //     setUuid(res.data.data.uuid)
      //   } else {
      //     setUuid(undefined)
      //   }
      toast('success', COMMON_MESSAGE.Login)
      return res
    } else {
      // toast('error', res.data.message);
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
    // toast("error", error.message);
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

const resendOtp = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      contactNo: formData,
    }
    const res = await axiosInstance.post(`${AUTH_ENDPOINT.PATIENT_VERIFY_RESEND_OTP}`, data)

    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Login)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export { loginUser, verifyOtp, resendOtp }
