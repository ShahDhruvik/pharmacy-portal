import { EnumValues } from '@/types/common'
import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

// ALl your constants and enums. This includes pre-defined functions and other commonly used variables. ex: date-format functions, other standarad maintaining function
export const x = 10

export const currencySymbol = '₹'

export enum Tables {
  Role = "Role",
  User = "User",
  Pharmacy = "Pharmacy",

}
export const tooltipLength = 20;

export enum Dropdowns {
  Role = "Role",
  Pharmacy = "Pharmacy",
  Country = "Country",
  State = "State",
  City = "City",
}
export const formatDateYYYYMMDD = (dateString: string): string => {
  if (typeof dateString === 'string') {
    try {
      const parsedDate = parseISO(dateString);
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      return formattedDate;
    } catch (error) {
      console.error("Invalid date format:", error);
      return "";
    }
  } else {
    return "";
  }
};
export const LimitPerPageOptions = [5, 10, 15, 20, 100]
export const limitPerPage = 10
export enum ResponseStatus {
  RS200 = 200,
  RS300 = 300,
  RS400 = 400,
  RS404 = 404,
  RS401 = 401,
  RS500 = 500,
}


//SERVER
export const uuid = localStorage.getItem('uuid')
export const CONST_API_URL = 'https://api-dev.oopchar.com/api'
export const CONST_APP_IMAGE_URL = 'https://oopchar-editor-dev-1.s3.ap-south-1.amazonaws.com/'
export const CONST_PRACTICE_URL = `https://practice-dev.oopchar.com/`
export const CONST_OOPCHAR_IN_PERSON_CONSULTATION_URL = `https://dev.oopchar.com/book-in-person?sourceUuid=${uuid}`
export const CONST_ABHA_URL = `https://abha-dev.triainahealth.com/`
export const SITE_KEY = `6Ld_4aEpAAAAAMV7S6jHzrwAxEtb7sJ61MeNr00f`
export const MARKETING_EMAIL = 'marketing@oopchar.com'
export const CONST_SOCKET_SERVER_URL = 'https://api-dev.oopchar.com'
export const CONST_FRONTEND_URL = 'https://provider-dev.oopchar.com/'

//LOCAL
// export const CONST_FRONTEND_URL = 'https://localhost:4002'
// export const CONST_API_URL = 'http://localhost:8000/api'
// export const CONST_APP_IMAGE_URL = 'https://oopchar-editor-dev-1.s3.ap-south-1.amazonaws.com/'
// export const CONST_OOPCHAR_URL = 'https://dev.oopchar.com/'

export const enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const enum CACHE_KEYS {
  POST = 'post',
  USER = 'user',
  TODO1 = 'todo1',
}


export const enum TOAST_TYPES {
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARN = 'Warning',
  INFO = 'Info',
}




export const enum ALIGN_DIALOG {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  MID_RIGHT = 'mid-right',
}

export const splitDescription = (description: string, length?: number) => {
  const maxCharac = length ? length : 15
  if (description.length > maxCharac) {
    return description.slice(0, maxCharac).concat('...')
  } else {
    return description
  }
}

export const enum DRAWERSTATE {
  NORMAL = 'NORMAL',
  EDIT = 'EDIT',
}

export const formatDate = (dateString: string) => {
  if (typeof dateString === 'string') {
    const parsedDate = parseISO(dateString)
    const formattedDate = format(parsedDate, "dd MMMM',' yyyy", { locale: enUS })
    return formattedDate
  } else {
    return ''
  }
}
