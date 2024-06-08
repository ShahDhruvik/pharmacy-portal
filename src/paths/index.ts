export const enum MAIN_PATH {
  AUTH = '/auth/*',
  DASHBOARD = '/*',
  CREATE_TASK = '/tasks/*',
  CHAT = '/chat/*',
  HELP = '/help/*',
  UNAUTHORIZED = '/unauthorized',
  CONTACT_US = '/contactUs/*',
}

export const enum COMMON_PATH {
  NOTFOUND = '*',
  DEFAULT = '/',
}

export const enum AUTH_PATH {
  LOGIN = '/log-in',
  LOGOUT = '/log-out',
}
