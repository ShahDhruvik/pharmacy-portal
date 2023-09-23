import { AUTH_PATH, COMMON_PATH, MAIN_PATH } from "../Paths";
import { HeaderLinkType } from "../types/common";

export const headerLinks: HeaderLinkType[] = [
    {
        id: 0,
        name: 'What we treat?',
        path: COMMON_PATH.DEFAULT,
    },
    {
        id: 1,
        name: 'For Practice',
        path: MAIN_PATH.POST.split('/*')[0],
    },
    {
        id: 2,
        name: 'For Provider',
        path: MAIN_PATH.ABOUT.split('/*')[0],
    },
    {
        id: 3,
        name: 'Franchise',
        path: MAIN_PATH.USER.split('/*')[0],
    },
    {
        id: 4,
        name: 'Sign in',
        path: `${MAIN_PATH.AUTH.split('/*')[0]}${AUTH_PATH.LOGIN}`,
    },
]