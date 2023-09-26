export const enum MAIN_PATH {
  AUTH = '/auth/*',
  DASHBOARD = '/*',
  ABOUT = '/about/*',
  POST = '/posts/*',
  USER = '/user/*',
  UNAUTHORIZED = '/unauthorized',
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
  SERVICES = '/services',
  DISHANK = '/dishank',
  DISHANK1 = '/dishank/1',
}

export const enum POST_PATH {
  INDPOST = ':slug',
}
