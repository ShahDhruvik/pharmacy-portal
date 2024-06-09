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
  DefaultEndpoints.practice +
  "/portal-images-list",
  get_faqs = DefaultEndpoints.common +
  DefaultEndpoints.practice +
  "/faq/portal-list",
  get_feature = DefaultEndpoints.common +
  DefaultEndpoints.practice +
  "/portal-feature-list",
}


