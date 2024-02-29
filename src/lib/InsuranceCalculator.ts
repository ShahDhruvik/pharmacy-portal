import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { INSURANCE_CALCULATOR } from '@/utils/endPoints'
import axiosInstance from '../../axiosInstance'

export const createCoverage = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    console.log(formData, 'form')
    const data = {
      accountId: Number(formData?.accountId),
      coverageType: formData?.coverageType?._id,
      // details: { ...formData?.coverageDetails, accountId: Number(formData?.accountId) },
      details: formData?.coverageDetails?.map((x: any) => {
        return {
          name: x?.name,
          amount: x?.amount,
          accountId: Number(formData?.accountId),
        }
      }),
    }
    const res = await axiosInstance.post(INSURANCE_CALCULATOR.CREATE_COVERAGE, data)

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

export const getAllDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  accountId: string,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    const res = await axiosInstance.post(INSURANCE_CALCULATOR.GET, { accountInternalId: accountId })
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

export const createExpense = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    console.log(formData, 'form')
    const data = {
      accountId: Number(formData?.accountId),
      practiceId: Number(formData?.clinic?._id),
      otherPracticeName: formData.clinicName,
      amount: formData?.amount,
      coverageId: Number(formData?.coverageId?._id),
      coverageDetailId: Number(formData?.coverageDetailId?._id),
    }
    const res = await axiosInstance.post(INSURANCE_CALCULATOR.CREATE_EXPENSE, data)

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

export const editCoverage = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    const a = formData.deleted
    const b = formData?.coverageDetails
    const notInB = a.filter((itemA: any) => !b.some((itemB: any) => itemA.id === itemB.id))
    const data = {
      accountId: Number(formData?.accountId),
      coverageType: formData?.coverageType?._id,
      id: formData?.id,
      details: formData?.coverageDetails?.map((x: any) => {
        return {
          name: x?.name,
          amount: x?.amount,
          accountId: Number(formData?.accountId),
          id: x?.id,
        }
      }),
      deleted: notInB.map((X: any) => X.id),
    }
    const res = await axiosInstance.put(INSURANCE_CALCULATOR.EDIT_COVERAGE, data)

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

export const editExpense = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
  id: any,
) => {
  try {
    loading({ isLoading: true, isCoverageLoader: true, isPage: false })
    console.log(formData, 'ff')

    const data = {
      accountId: Number(formData?.accountId),
      practiceId: Number(formData?.clinic?._id),
      coverageDetailId: Number(formData?.coverageDetailId?._id),
      coverageId: Number(formData?.coverageId),
      otherPracticeName: formData?.clinicName,
      amount: formData?.amount,
    }
    console.log(data, 'data')

    const res = await axiosInstance.put(`${INSURANCE_CALCULATOR.EDIT_EXPENSE}${id}`, data)

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
