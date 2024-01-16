import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { PROFILE } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

const getAllProfile = async (loading: LoadingState['setLoading'], toast: ShowToastFunction) => {
  try {
    loading({ isLoading: true, isPage: false, isIndependentLoader: true })
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
    loading({ isLoading: false, isPage: false, isIndependentLoader: false })
  }
}

const profileMobileNumberEditOtp = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: string,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const data = {
      contactNo: formData,
    }

    const res = await axiosInstance.put(`${PROFILE.PATIENT_PROFILE_PHONE_EDIT_OTP}`, data)

    if (res.data.success) {
      // toast('success', `Profile Mobile Number ${COMMON_MESSAGE.Success}`)
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
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const profileMobileNumberEdit = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })

    const data = {
      otp: formData.otp,
      contactNo: formData.contactNo,
    }
    const res = await axiosInstance.put(`${PROFILE.PATIENT_PROFILE_PHONE_EDIT}`, data)
    if (res.data.success) {
      toast('success', `Profile Mobile Number ${COMMON_MESSAGE.Updated}`)
      return res
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const profileEmailEditOtp = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: string,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const data = {
      profileEmail: formData,
    }

    const res = await axiosInstance.put(`${PROFILE.PATIENT_PROFILE_EMAIL_EDIT_OTP}`, data)

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
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const profileEmailEdit = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })

    const data = {
      otp: formData.otp,
      email: formData.profileEmail,
    }
    const res = await axiosInstance.put(`${PROFILE.PATIENT_PROFILE_EMAIl_EDIT}`, data)
    if (res.data.success) {
      toast('success', `Profile Email ${COMMON_MESSAGE.Updated}`)
      return res
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const profileCountryEdit = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })

    const data = {
      countryId: formData._id,
    }
    const res = await axiosInstance.put(`${PROFILE.PATIENT_PROFILE_COUNTRY_EDIT}`, data)
    if (res.data.success) {
      toast('success', `Profile Country ${COMMON_MESSAGE.Updated}`)
      return res
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const profileCommunicationEdit = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })

    const data = {
      communicationMobile: formData.communicationMobile,
      communicationEmail: formData.communicationEmail,
      communicationPreference: formData.communicationPreference,
    }
    const res = await axiosInstance.put(`${PROFILE.PATIENT_PROFILE_COMMUNICATION_EDIT}`, data)
    if (res.data.success) {
      return res
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isIndependentLoader: false, isPage: false })
  }
}

const getAllCountry = async (loading: LoadingState['setLoading'], toast: ShowToastFunction) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(PROFILE.COUNTRY)
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

export {
  getAllProfile,
  profileMobileNumberEditOtp,
  profileMobileNumberEdit,
  profileEmailEditOtp,
  profileEmailEdit,
  profileCountryEdit,
  profileCommunicationEdit,
  getAllCountry,
}
