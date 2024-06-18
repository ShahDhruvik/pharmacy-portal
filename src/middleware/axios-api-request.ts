import axiosInstance from '@/axiosInstance'
import { AxiosError, AxiosRequestConfig, Method } from 'axios'
import { checkStatus, responseWrapper } from './response-wrapper'

export const apiRequest = async (
    method: Method,
    url: AxiosRequestConfig['url'],
    data?: AxiosRequestConfig['data'],
) => {
    try {
        const res = await axiosInstance({
            method: method,
            url: url,
            ...(data && { data: data }),
        })
        checkStatus(res.status)
        return res.data
    } catch (error: AxiosError | any) {
        responseWrapper(error)
        return null
    }
}
