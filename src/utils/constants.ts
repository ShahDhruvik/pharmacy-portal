import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

// ALl your constants and enums. This includes pre-defined functions and other commonly used variables. ex: date-format functions, other standarad maintaining function
export const x = 10

export const currencySymbol = '₹'

export const BlogPosts: Record<string, { title: string; description: string }> = {
  'first-blog-post': {
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.',
  },
  'second-blog-post': {
    title: 'Second Blog Post',
    description: 'Hello React Router v6',
  },
}

//SERVER
export const uuid = localStorage.getItem('uuid')
export const CONST_API_URL = 'https://api-dev.oopchar.com/api'
export const CONST_APP_IMAGE_URL = 'https://oopchar-editor-dev-1.s3.ap-south-1.amazonaws.com/'
export const CONST_PRACTICE_URL = `https://practice-dev.oopchar.com/`
export const CONST_OOPCHAR_IN_PERSON_CONSULTATION_URL = `https://dev.oopchar.com/book-in-person?sourceUuid=${uuid}`
export const CONST_ABHA_URL = `https://abha.oopchar.com/`
export const SITE_KEY = `6Ld_4aEpAAAAAMV7S6jHzrwAxEtb7sJ61MeNr00f`
export const MARKETING_EMAIL = 'marketing@oopchar.com'

//LOCAL
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

export const enum ASSESST_AREA {
  AUTH = 'AUTH',
  FAQ = 'FAQ',
  QNA = 'QNA',
  SLIDER = 'SLIDER',
}

export const enum FORMTYPE {
  SIGNUP = 'SIGNUP',
  SIGNIN = 'SIGNIN',
  OTP = 'OTP',
  GUEST = 'GUEST',
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

export const enum PROF_HEADER {
  PROFILE = 'Profile',
  COMMUNICATION = 'Communication',
  INSURANCE = 'Insurance info',
  COUNTRY = 'Country',
}

export const enum PROF_FIELDS {
  PROFILE_MOBILE = 'Profile Mobile Number',
  PROFILE_EMAIL = 'Profile Email Address',
  COMMUNICATION_MOBILE = 'Mobile Number',
  COMMUNICATION_EMAIL = 'Email Address',
  COMMUNICATION_PREFERENCE = 'Preference',
  INSURANCE_FIELD = 'Whats App Message',
  COUNTRY_FIELD = 'Country',
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

export enum AppointmentStatusEnum {
  Upcoming = 'Upcoming',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum MarketingReferenceEnum {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  GoogleSearch = 'GoogleSearch',
  GoogleAdds = 'GoogleAdds',
  Oopchar = 'Oopchar',
  ClientWebsite = 'ClientWebsite',
  MobileAppAndroid = 'MobileAppAndroid',
  MobileAppIOS = 'MobileAppIOS',
  PatientPortal = 'PatientPortal',
  PracticePortal = 'PracticePortal',
  Default = 'Default',
}
