// All the common types are defined here
import { SetStateAction, Dispatch, ReactNode } from 'react'
import { ALIGN_DIALOG, DRAWERSTATE, Dropdowns, Tables, } from '@/utils/constants'
import { ToastOptions } from 'react-toastify'
// Other types regarding the individual entity will have separate file (ex: user.types.ts)
export type PaletteColor = {
  light?: string
  main: string
  dark?: string
  contrastText?: string
}
export type EnumValues<T extends Record<string, string | number>> = T[keyof T];
export type TablesOptions = EnumValues<typeof Tables>;
export type DropDownOptions = EnumValues<typeof Dropdowns>;
export type FileData = { file: string; name: string; originalName: string };

export type LoadingProps = {
  isLoading: boolean;
  loadingProps?: {
    none?: boolean
    btnLoading?: boolean
    table?: TablesOptions;
    dropdown?: DropDownOptions;
  };
};
export type LoadingContextType = {
  loading: LoadingProps;
  setLoading: Dispatch<SetStateAction<LoadingProps>>;
};
export type TabPropsType = {
  handleTabChange: (value: string) => void,
  tabList: {
    tabValue: string
    tabName: string,
    tabElement: ReactNode,
  }[]
}
export type HandleControls = {
  search: string;
  currentPage: number;
  limitPerPage: number;
  sortParam: string;
  sortOrder: string;
};
export type PageControls =
  | {
    from: number;
    currentPage: number;
    to: number;
    pages: number;
    total: number;
    numberOfRecords?: number
  }
  | undefined;
export type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

export type AuthParams = {
  isAuth: boolean
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
    isAppointmentLoader?: boolean
    isCoverageLoader?: boolean
    isPage: boolean
    pageProps?: { image: any; pageTxt: string }
  }
  setLoading: Dispatch<
    SetStateAction<{
      isLoading: boolean
      isIndependentLoader?: boolean
      isAppointmentLoader?: boolean
      isCoverageLoader?: boolean
      isPage: boolean
      pageProps?: { image: any; pageTxt: string }
    }>
  >
}


export type SelectDDL = { label: string; _id: string, data?: any }

export type DrawerState = DRAWERSTATE.EDIT | DRAWERSTATE.NORMAL


export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ShowToastFunction = (type: ToastType, message: string, options?: ToastOptions) => void
