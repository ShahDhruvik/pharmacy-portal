// All the endpoints of API are defined here
const enum USER {
  create = '/user/create',
}

export const enum DEF_PATHS {
  auth = '/auth',
  main = '/main',
  common = '/common',
  patient = '/patient',
}

export const enum AUTH_ENDPOINT {
  PATIENT_LOGIN = DEF_PATHS.auth + DEF_PATHS.patient + '/login',
  PATIENT_VERIFY_OTP = DEF_PATHS.auth + DEF_PATHS.patient + '/check-otp-auth',
  PATIENT_VERIFY_RESEND_OTP = DEF_PATHS.auth + DEF_PATHS.patient + '/resend-otp',
}

export const enum PROFILE {
  GET = DEF_PATHS.main + DEF_PATHS.patient + '/profile',
  PATIENT_PROFILE_PHONE_EDIT_OTP = DEF_PATHS.main + DEF_PATHS.patient + '/change-number-otp',
  PATIENT_PROFILE_PHONE_EDIT = DEF_PATHS.main + DEF_PATHS.patient + '/change-number',
  PATIENT_PROFILE_EMAIL_EDIT_OTP = DEF_PATHS.main + DEF_PATHS.patient + '/change-email-otp',
  PATIENT_PROFILE_EMAIl_EDIT = DEF_PATHS.main + DEF_PATHS.patient + '/change-email',
  PATIENT_PROFILE_COUNTRY_EDIT = DEF_PATHS.main + DEF_PATHS.patient + '/change-country',
  PATIENT_PROFILE_COMMUNICATION_EDIT = DEF_PATHS.main + DEF_PATHS.patient + '/change-communication',
  COUNTRY = DEF_PATHS.common + DEF_PATHS.patient + '/country-ddl',
}

export const enum FAMILY {
  GET = DEF_PATHS.main + DEF_PATHS.patient + '/family-account',
  CREATE = DEF_PATHS.main + DEF_PATHS.patient + '/family-account/create',
  EDIT = DEF_PATHS.main + DEF_PATHS.patient + '/family-account/edit/',
  DELETE = DEF_PATHS.main + DEF_PATHS.patient + '/family-account/delete/',
}

export const enum DASHBOARD_CONTENT {
  GET_MAIN_IMG = DEF_PATHS.common + '/self-care/portal-images-list',
  GET_FEATURE = DEF_PATHS.common + '/self-care/portal-feature-list',
}

export const enum DROPDOWN {
  drpRelation = DEF_PATHS.common + '/practice/relation-ddl',
}

export const enum APPOINTMENT {
  GET = DEF_PATHS.main + DEF_PATHS.patient + '/appointment',
}
