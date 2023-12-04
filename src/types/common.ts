// All the common types are defined here
import { SetStateAction, Dispatch } from 'react'
import { ALIGN_DIALOG, DRAWERSTATE, FORMTYPE, PROF_FIELDS, PROF_HEADER } from '../utils/constants'
import { ToastOptions } from 'react-toastify'
// Other types regarding the individual entity will have separate file (ex: user.types.ts)
export type PaletteColor = {
  light?: string
  main: string
  dark?: string
  contrastText?: string
}

export type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

export type AuthParams = {
  isAuth: boolean
  role: string
}

export type CacheType = {
  cacheData: Record<string, any>
  cacheExpDate: Record<string, string | undefined>
}

export type HeaderLinkType = {
  id: number
  name: string
  path: string
}

export type AlignDialogProp =
  | ALIGN_DIALOG.BOTTOM_LEFT
  | ALIGN_DIALOG.BOTTOM_RIGHT
  | ALIGN_DIALOG.TOP_LEFT
  | ALIGN_DIALOG.TOP_RIGHT
  | ALIGN_DIALOG.MID_RIGHT

export type LoadingState = {
  loading: {
    isLoading: boolean
    isIndependentLoader?: boolean
    isPage: boolean
    pageProps?: { image: any; pageTxt: string }
  }
  setLoading: Dispatch<
    SetStateAction<{
      isLoading: boolean
      isIndependentLoader?: boolean
      isPage: boolean
      pageProps?: { image: any; pageTxt: string }
    }>
  >
}

export type FormType = FORMTYPE.SIGNIN | FORMTYPE.SIGNUP | FORMTYPE.OTP | FORMTYPE.GUEST

export type FormTypeArray = Array<FormType>
export type SelectDDL = { label: string; _id: string }

export type DrawerState = DRAWERSTATE.EDIT | DRAWERSTATE.NORMAL
export type FieldProfState =
  | PROF_FIELDS.COMMUNICATION_EMAIL
  | PROF_FIELDS.COMMUNICATION_MOBILE
  | PROF_FIELDS.COMMUNICATION_PREFERENCE
  | PROF_FIELDS.INSURANCE_FIELD
  | PROF_FIELDS.COUNTRY_FIELD
  | PROF_FIELDS.PROFILE_EMAIL
  | PROF_FIELDS.PROFILE_MOBILE
export type HeadProfState =
  | PROF_HEADER.COMMUNICATION
  | PROF_HEADER.INSURANCE
  | PROF_HEADER.COUNTRY
  | PROF_HEADER.PROFILE

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ShowToastFunction = (type: ToastType, message: string, options?: ToastOptions) => void
