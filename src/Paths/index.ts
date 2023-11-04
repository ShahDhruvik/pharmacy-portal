export const enum MAIN_PATH {
  AUTH = '/auth/*',
  DASHBOARD = '/*',
  ABOUT = '/about/*',
  POST = '/posts/*',
  USER = '/user/*',
  UNAUTHORIZED = '/unauthorized',
  CONTACT_US = '/contactUs/*',
}

export const enum COMMON_PATH {
  NOTFOUND = '*',
  DEFAULT = '/',
}

export const enum ABOUT_PATH {
  CONTACT = '/contact',
}

export const enum AUTH_PATH {
  LOGIN = '/log-in',
  LOGOUT = '/log-out',
}

export const enum DASHBOARD_PATH {
  TREE = '/tree',
}

export const enum POST_PATH {
  INDPOST = ':slug',
}
