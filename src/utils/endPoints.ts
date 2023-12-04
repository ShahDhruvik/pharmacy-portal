// All the endpoints of API are defined here
const enum USER {
  create = '/user/create',
}

export const enum DEF_PATHS {
  auth = '/auth',
  main = '/main',
  common = '/common',
}

export const enum AUTH_ENDPOINT {
  PATIENT_LOGIN = DEF_PATHS.auth + '/patient/login',
  PATIENT_VERIFY_OTP = DEF_PATHS.auth + '/patient/check-otp-auth',
  PATIENT_VERIFY_RESEND_OTP = DEF_PATHS.auth + '/patient/resend-otp',
}

export const enum PROFILE {
  GET = DEF_PATHS.main + '/patient/profile',
  PATIENT_PROFILE_PHONE_EDIT_OTP = DEF_PATHS.main + '/patient/change-number-otp',
  PATIENT_PROFILE_PHONE_EDIT = DEF_PATHS.main + '/patient/change-number',
  PATIENT_PROFILE_EMAIL_EDIT_OTP = DEF_PATHS.main + '/patient/change-email-otp',
  PATIENT_PROFILE_EMAIl_EDIT = DEF_PATHS.main + '/patient/change-email',
  PATIENT_PROFILE_COUNTRY_EDIT = DEF_PATHS.main + '/patient/change-country',
  PATIENT_PROFILE_COMMUNICATION_EDIT = DEF_PATHS.main + '/patient/change-communication',
  COUNTRY = DEF_PATHS.common + '/patient/country-ddl',
}

export const enum FAMILY {
  GET = DEF_PATHS.main + '/patient/family-account',
  CREATE = DEF_PATHS.main + '/patient/family-account/create',
  EDIT = DEF_PATHS.main + '/patient/family-account/edit/',
  DELETE = DEF_PATHS.main + '/patient/family-account/delete/',
}

export const enum DASHBOARD_CONTENT {
  GET_MAIN_IMG = DEF_PATHS.common + '/self-care/portal-images-list',
  GET_FEATURE = DEF_PATHS.common + '/self-care/portal-feature-list',
}
