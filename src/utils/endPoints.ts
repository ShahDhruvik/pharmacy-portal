// All the endpoints of API are defined here
const enum USER {
  create = '/user/create',
}

export const enum DefaultEndpoints {
  auth = '/auth',
  main = '/main',
  common = '/common',
  patient = '/patient',
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


