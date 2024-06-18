import { HandleControls, LoadingContextType } from '@/types/common'
import { apiRequest } from '@/middleware/axios-api-request'
import { RoleEndPoints } from '@/utils/endPoints'
export const getRoles = async (
    handleControls: HandleControls,
) => {
    const res = await apiRequest('POST', RoleEndPoints.listAll, handleControls)
    if (res && res?.success) {
        return res?.data
    } else {
        return undefined
    }
}
