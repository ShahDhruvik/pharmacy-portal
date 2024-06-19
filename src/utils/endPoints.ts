// All the endpoints of API are defined here
const enum USER {
  create = '/user/create',
}

export const enum DefaultEndpoints {
  auth = '/auth',
  main = '/main',
  common = '/common',
  patient = '/patient',
  pharmacy = '/pharmacy',
  practice = '/practice',
  provider = '/provider',
  chat = '/chat',
}


export const enum DashboardContent {
  get_main_image = DefaultEndpoints.common +
  "/pharmacy-care" +
  "/portal-images-list",
  get_faqs = DefaultEndpoints.common +
  "/pharmacy-care" +
  "/faq/portal-list",
  get_feature = DefaultEndpoints.common +
  "/pharmacy-care" +
  "/portal-feature-list",
}
export const enum AuthEndPoints {
  login = DefaultEndpoints.auth +
  "/pharmacy" +
  "/login",
}
export const enum RoleEndPoints {
  create = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-role/create',
  delete = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-role/delete/',
  inActive = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-role/inActive/',
  edit = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-role/edit/',
  listAll = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-role',
  dropdown = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-role/dropdown',
}
export const enum UserEndPoints {
  create = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-user/create',
  delete = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-user/delete/',
  inActive = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-user/inActive/',
  edit = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-user/edit/',
  listAll = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-user',
  dropdown = DefaultEndpoints.main + DefaultEndpoints.pharmacy + '/pharmacy-user/dropdown',
}

export const enum FileEndPoints {
  uploadMain = DefaultEndpoints.main + "/upload",
  uploadCommon = DefaultEndpoints.common + "/upload",
  uploadCommonEditor = DefaultEndpoints.main + "/editor-upload",
}
