import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios'
import { VITE_APP_API_URL } from '@/utils/envVariables'
import { CONST_API_URL } from '@/utils/constants'
import { CONST_FRONTEND_URL } from './src/utils/constants'
import { toast } from 'react-toastify'

//Cancel Token
const _cancelTokenQueue = new Map<string, CancelTokenSource>()

//Instance
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: VITE_APP_API_URL as string,
  baseURL: VITE_APP_API_URL || (CONST_API_URL as string),
  // timeout: 20000,
  timeoutErrorMessage: 'Timeout! something went wrong',
})

//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { cancelToken } = config
    if (cancelToken) {
      const cancelTokenKey = cancelToken?.toString()
      // Cancel previous request and delete from queue
      if (_cancelTokenQueue.has(cancelTokenKey as string)) {
        const source = _cancelTokenQueue.get(cancelTokenKey as string)
        source?.cancel('Request canceled by user')
        _cancelTokenQueue.delete(cancelTokenKey as string)
      }
      // Add current request to the queue
      const source = axios.CancelToken.source()
      config.cancelToken = source.token
      _cancelTokenQueue.set(cancelTokenKey, source)
    }
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    // if (!accessToken || !refreshToken) {
    //   window.location.href = `${VITE_APP_FRONTEND_URL}/auth/login`
    // } else {
    config.headers.Authorization = `Bearer ${accessToken}`
    config.headers['Refresh-Token'] = `Bearer ${refreshToken}`
    // }
    // change some global axios configurations
    // add accessToken header before sending api
    // const accessToken = sessionStorage.getItem("authToken");
    // config.headers.common.Authorization = `Bearer ${accessToken}`;

    // Set User Session
    // const session = sessionStorage.getItem("client-session");
    // config.headers.common["client-session"] = session;

    return config
  },
  (error: any) => Promise.reject(error),
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    // Canceling the token after the reponse
    const { cancelToken } = response.config
    if (cancelToken) {
      // delete request from queue
      const cancelTokenKey = cancelToken?.toString()
      _cancelTokenQueue.delete(cancelTokenKey as string)
    }
    if (response.headers['newtoken']) {
      localStorage.setItem('accessToken', response.headers['newtoken'])
    }
    return response
  },
  (error: any) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 500) {
      toast.error(`${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        draggable: false,
        progress: 0,
      })
      localStorage.clear()
      window.location.href = `/`
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
