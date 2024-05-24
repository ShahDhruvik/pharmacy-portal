import { LoadingState, SelectDDL, ShowToastFunction } from '@/types/common'
import { DROPDOWN, INSURANCE_CALCULATOR } from '@/utils/endPoints'
import { acDefaultValue } from '@/utils/form.validation'
import axiosInstance from '../../axiosInstance'

type DrpType = {
  id: string | number
  _id: string | number
  name: string
  displayName: string
  firstName: string
}

export const dropdownRelation = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpRelation, {})
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: SelectDDL[] = [isMulti ? isMulti : acDefaultValue]
        ; (data.data as DrpType[]).map((x) => {
          drpValues.push({ _id: String(x.id), label: x.displayName })
        })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownFamily = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpFamily, {})
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: any[] = []
        ; (data?.data as DrpType[]).map((x: any) => {
          drpValues?.push({
            _id: String(x?.account?.id),
            label: x?.account?.firstName,
            internalId: x?.account?.internalId,
          })
        })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownClinic = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  accountId: string,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpClinic, { accountInternalId: accountId })
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: SelectDDL[] = [isMulti ? isMulti : acDefaultValue]
        ; (data.data as DrpType[]).map((x) => {
          drpValues.push({ _id: String(x.id), label: x.name })
        })
      drpValues.push({ _id: String(-1), label: 'Other' })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownAddedCoverage = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  accountId: string,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpCoverage, { accountInternalId: accountId })
    if (res && res.data.success && res.data) {

      const { data } = res
      const drpValues: any[] = [isMulti ? isMulti : acDefaultValue]
        ; (data.data as any[]).map((x) => {
          drpValues.push({ _id: String(x.id), label: x.coverageType, internalId: x?.internalId })
        })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownSpentOn = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  coverageId: string,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpCoverageDetails, {
      coverageInternalId: coverageId,
    })
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: SelectDDL[] = [isMulti ? isMulti : acDefaultValue]
        ; (data.data as DrpType[]).map((x) => {
          drpValues.push({ _id: String(x.id), label: x.name })
        })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownAssignedTo = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: number,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpOrgUser, {
      organizationId: id,
    })
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: any[] = []
        ; (data?.data as DrpType[]).map((x: any) => {
          drpValues?.push({
            _id: x?.id,
            label: x?.name,
            internalId: x?.internalId,
          })
        })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownPractice = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpPractice, {})
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: any[] = []
        ; (data?.data as DrpType[]).map((x: any) => {
          drpValues?.push({
            _id: x?.id,
            label: x?.name,
            internalId: x?.internalId,
          })
        })
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const dropdownOrg = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isMulti?: SelectDDL,
  isDifferent?: boolean
) => {
  try {
    loading({ isLoading: true, isIndependentLoader: true, isPage: false })
    const res = await axiosInstance.post(DROPDOWN.drpOrg, {})
    if (res && res.data.success && res.data) {
      const { data } = res
      let drpValues: SelectDDL[] = [isMulti ? isMulti : acDefaultValue]
        ; (data.data as DrpType[]).map((x) => {
          drpValues.push({ _id: String(x.id), label: x.name })
        })
      // drpValues.push({ _id: String(-1), label: 'Other' })
      if (isDifferent) {
        drpValues = data.data?.map((x: any) => {
          return { _id: x?.id, label: x?.name, ...x }
        })
      }
      return drpValues
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      return []
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}
