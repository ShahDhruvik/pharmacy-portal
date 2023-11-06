// ALl your constants and enums. This includes pre-defined functions and other commonly used variables. ex: date-format functions, other standarad maintaining function
export const x = 10

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
  PROFILE_MOBILE = 'Mobile Number',
  PROFILE_EMAIL = 'Email Address',
  COMMUNICATION_MOBILE = 'Mobile Number',
  COMMUNICATION_EMAIL = 'Email Address',
  COMMUNICATION_PREFERENCE = 'Preference',
  INSURANCE_FIELD = 'Whats App Message',
  COUNTRY_FIELD = 'Country',
}