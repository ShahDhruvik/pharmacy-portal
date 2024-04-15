// All the endpoints of API are defined here
const enum USER {
  create = '/user/create',
}

export const enum DEF_PATHS {
  auth = '/auth',
  main = '/main',
  common = '/common',
  patient = '/patient',
  practice = '/practice',
  provider = '/provider',
  chat = '/chat',
}
export const enum CHAT {
  listAll = DEF_PATHS.chat + DEF_PATHS.practice + "/office/chat-conversation",
  userAll = DEF_PATHS.main + DEF_PATHS.provider + "/search-provider",
  getOne = DEF_PATHS.chat + DEF_PATHS.practice + "/office/chat-conversation/",
  update = DEF_PATHS.chat + DEF_PATHS.practice + "/office/chat-conversation/update/",
  delete = DEF_PATHS.chat + DEF_PATHS.practice + "/office/chat-conversation/delete/",
  clear = DEF_PATHS.chat + DEF_PATHS.practice + "/office/chat-conversation/clear/",
  create = DEF_PATHS.chat + DEF_PATHS.practice + "/office/chat-conversation/create",
}

export const enum AUTH_ENDPOINT {
  PROVIDER_LOGIN = DEF_PATHS.auth + DEF_PATHS.provider + '/login',
  PROVIDER_VERIFY_OTP = DEF_PATHS.auth + DEF_PATHS.provider + '/check-otp-auth',
  PROVIDER_VERIFY_RESEND_OTP = DEF_PATHS.auth + DEF_PATHS.provider + '/resend-otp',
  PROVIDER_CHANGE_PASSWORD = DEF_PATHS.main + DEF_PATHS.provider + '/change-password',
  PROVIDER_RECAPTCHA = DEF_PATHS.auth + '/verifyRecaptcha',
}

export const enum PROFILE {
  GET = DEF_PATHS.main + DEF_PATHS.practice + '/practice-user-by-id',
}

export const enum DASHBOARD_CONTENT {
  GET_MAIN_IMG = DEF_PATHS.common + '/provider-care/portal-images-list',
  GET_FEATURE = DEF_PATHS.common + '/provider-care/portal-feature-list',
  GET_RIBBON = DEF_PATHS.common + '/provider-care/portal-ribbon-list',
}

export const enum DROPDOWN {
  drpRelation = DEF_PATHS.common + '/practice/relation-ddl',
  drpFamily = DEF_PATHS.main + DEF_PATHS.patient + '/family-account/dropdown',
  drpClinic = DEF_PATHS.main + DEF_PATHS.practice + '/patient/dropdown',
  drpCoverage = DEF_PATHS.main + DEF_PATHS.patient + '/coverage/dropdown',
  drpCoverageDetails = DEF_PATHS.main + DEF_PATHS.patient + '/coverage-details/dropdown',
  drpAssignedTo = DEF_PATHS.main + DEF_PATHS.practice + '/practice-user/dropdown',
  drpPractice = DEF_PATHS.main + DEF_PATHS.practice + '/dropdown',
  drpOrg = DEF_PATHS.main + '/organization/get-all-by-provider',
}

export const enum APPOINTMENT {
  GET = DEF_PATHS.main + DEF_PATHS.provider + '/provider-appointment',
  CANCEL = DEF_PATHS.main + DEF_PATHS.patient + '/appointment/cancel/',
}

export const enum INSURANCE_CALCULATOR {
  GET = DEF_PATHS.main + DEF_PATHS.patient + '/coverage/all-details',
  CREATE_COVERAGE = DEF_PATHS.main + DEF_PATHS.patient + '/coverage/create',
  EDIT_COVERAGE = DEF_PATHS.main + DEF_PATHS.patient + '/coverage/edit',
  CREATE_EXPENSE = DEF_PATHS.main + DEF_PATHS.patient + '/expense/create',
  EDIT_EXPENSE = DEF_PATHS.main + DEF_PATHS.patient + '/expense/edit/',
  DELETE_EXPENSE = DEF_PATHS.main + DEF_PATHS.patient + '/expense/delete/',
}

export const enum FAQ {
  GET = DEF_PATHS.common + '/patient/faq/list',
}

export const enum TASK {
  GET = DEF_PATHS.main + DEF_PATHS.practice + '/provider-task',
  CREATE_TASK = DEF_PATHS.main + DEF_PATHS.practice + '/task/create-provider',
  EDIT_TASK = DEF_PATHS.main + DEF_PATHS.practice + '/task/edit/',
}
