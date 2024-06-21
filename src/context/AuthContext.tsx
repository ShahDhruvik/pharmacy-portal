/* eslint-disable react-refresh/only-export-components */
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
import { AuthParams } from '../types/common'

interface AuthContextType {
  authParams: AuthParams | undefined
  addStorage: (
    accessToken: string,
    refreshToken: string,
    from: string,
    selectedPharmacy: any,
  ) => void | undefined
  clearStorage: () => void | undefined
  setAuthParams: Dispatch<SetStateAction<AuthParams | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authParams, setAuthParams] = useState<AuthParams | undefined>({
    isAuth:
      localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null,
  })

  const addStorage = (
    accessToken: string,
    refreshToken: string,
    from: string,
    selectedPharmacy: any,
  ) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('selectedPharmacy', selectedPharmacy)
    localStorage.setItem('from', from)
    setAuthParams({ isAuth: true })
  }

  const clearStorage = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('from')
    setAuthParams(undefined)
  }
  return (
    <AuthContext.Provider value={{ authParams, addStorage, clearStorage, setAuthParams }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}
