import { AUTH_PATH, COMMON_PATH, MAIN_PATH } from "../Paths";
import { HeaderLinkType } from "../types/common";
type PlantTree = {
  icon: string
  que: string
  ans: string
}

export const PlantTree: PlantTree[] = [
  {
    icon: 'ser',
    que: 'Who do we partner with?',
    ans: 'We partner with reforestation organizations planting trees around the world',
  },
  {
    icon: 'ser',
    que: 'How many trees has Oopchar planted?',
    ans: `We've planted 25 million trees, thanks to initiators like you!`,
  },
  {
    icon: 'ser',
    que: 'What are some other ways to be more sustainable?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
]


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

export const countryCodes = ['+1', '+91', '+44']