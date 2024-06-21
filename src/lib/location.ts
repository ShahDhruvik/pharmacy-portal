import { apiRequest } from '@/middleware/axios-api-request'
import { SelectDDL } from '@/types/common'
import { LocationEndPoints } from '@/utils/endPoints'

export const dropDownCountry = async () => {
    const res = await apiRequest('POST', LocationEndPoints.country, {
        search: '',
        currentPage: 1,
        limitPerPage: 10000,
        sortParam: 'order',
        sortOrder: 'asc',
    })
    if (res && res.success && res.data) {
        const { data } = res
        const drpValues: SelectDDL[] = []
            ; (data?.records as any[]).map((x) => {
                drpValues.push({
                    _id: String(x.id),
                    label: x.name,
                    data: x,
                })
            })
        return drpValues
    } else {
        return []
    }
}

export const dropDownState = async (countryIds: string[]) => {
    const res = await apiRequest('POST', LocationEndPoints.state, {
        countryIds,
    })
    if (res && res.success && res.data) {
        const { data } = res
        const drpValues: SelectDDL[] = []
            ; (data?.records as any[]).map((x) => {
                drpValues.push({
                    _id: String(x.id),
                    label: x.name,
                    data: x,
                })
            })
        return drpValues
    } else {
        return []
    }
}

export const dropDownCity = async (stateIds: string[]) => {
    const res = await apiRequest('POST', LocationEndPoints.city, {
        stateIds,
    })
    if (res && res.success && res.data) {
        const { data } = res
        const drpValues: SelectDDL[] = []
            ; (data?.records as any[]).map((x) => {
                drpValues.push({
                    _id: String(x.id),
                    label: x.name,
                    data: x,
                })
            })
        return drpValues
    } else {
        return []
    }
}
