import { AUTH_PATH, COMMON_PATH, MAIN_PATH } from '../Paths'
import { HeaderLinkType } from '../types/common'
type PlantTree = {
  icon?: string
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

export const frequentlyAskedQuestions: PlantTree[] = [
  {
    que: 'What is treatment plan?',
    ans: 'We partner with reforestation organizations planting trees around the world',
  },
  {
    que: 'Secured private medicine delivery?',
    ans: `We've planted 25 million trees, thanks to initiators like you!`,
  },
  {
    que: 'Is treatment plan customized?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
  {
    que: 'What is our satisfaction guarantee?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
  {
    que: 'How oopchar is different from  others?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
  {
    que: 'Can I see sample treatment plan?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
  {
    que: 'How does follow up work on treatment?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
  {
    que: 'Can I see sample assessment?',
    ans: `Fly direct, reuse a water bottle, take a public transit and walk to save the
      environment`,
  },
]

export type FAQData = {
  id: number
  header: string
  text: string
}

export const faqs: FAQData[] = [
  {
    id: 1,
    header: 'Get Started with Chrome',
    text: `Because of its invasive nature, laser skin resurfacing is considered by many physicians as a surgical procedure even though it does not involve any incisions. Thus, to guarantee safety, laser skin resurfacing should be performed by a board-certified dermatologist or cosmetic surgeon.`,
  },
  {
    id: 2,
    header: 'Create Personalize Profile',
    text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. `,
  },
  {
    id: 3,
    header: 'Browse the web',
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,`,
  },
  {
    id: 4,
    header: 'Let Chrome do task for you',
    text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
  {
    id: 5,
    header: 'Delete your history & activity',
    text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
]

type Community = {
  heading: string
  para: string
  color: string
}

export const communityArr: Community[] = [
  {
    heading: 'Release Notes',
    para: 'Stay updated on new features, enhancements and bug fixes in Oopchar',
    color: '#32CD32',
  },
  {
    heading: 'Ideas',
    para: `If you have got an idea or suggestion on what you'd like to see in Oopchar, leave
    your thoughts here`,
    color: '#FF1493',
  },
  {
    heading: 'Ask the Community',
    para: `Have a question about Oopchar? Post here and a community member will be happy to
    help you.`,
    color: '#4682B4',
  },
]
