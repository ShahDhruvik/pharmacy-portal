import { LoadingState, SelectDDL, ShowToastFunction } from '@/types/common'
import { DROPDOWN } from '@/utils/endPoints'
import { acDefaultValue } from '@/utils/form.validation'
import axiosInstance from '../../axiosInstance'

type DrpType = {
  id: string | number
  _id: string | number
  name: string
  displayName: string
}

export const dropdownRelation = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isMulti?: SelectDDL,
) => {
  try {
    loading({ isLoading: true, isPage: true })
    const res = await axiosInstance.post(DROPDOWN.drpRelation, {})
    if (res && res.data.success && res.data) {
      const { data } = res
      const drpValues: SelectDDL[] = [isMulti ? isMulti : acDefaultValue]
      ;(data.data as DrpType[]).map((x) => {
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
