/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { EnumValues } from '@/types/common'
import { MessageActions } from '@/utils/constants'
import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
export const enum ChatAreaType {
  List = 'List',
  Message = 'Message',
}
interface OrgUserData {
  id: number
  organizationId: number
  name: string
  resetPasswordToken: string
  resetPasswordTokenTime: string
  internalId: string
  email: string
  password: string
  phone: string
  mobile: string
  roleId: number
  practiceIds: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdBy: string
  updatedBy: string
  deletedBy: string | null
  defaultPassword: boolean
  isActive: boolean
  isDefault: boolean
  isDeleted: boolean
}
export type ChatRoomType = {
  _id: string
  organizationId: number
  orgUserIds: string[]
  name: string
  isActive: boolean
  isDeleted: boolean
  __v: number
  createdAt: string
  updatedAt: string
  orgUsers: OrgUserData[]
  unseenCount?: number
  lastMessage?: {
    _id: string
    practiceOfficeChatConversationId: string
    type: string
    message: string
    sentBy: string
    isActive: true
    isDeleted: false
    createdAt: string
    updatedAt: string
    __v: number
  }
  lastSeenMessage?: {
    _id: string
    chatConversationId: string
    type: string
    message: string
    sentBy: string
    isActive: true
    isDeleted: false
    createdAt: string
    updatedAt: string
    __v: number
  }
  message?: string
  isConfirmed: boolean
  createdBy: string
}
export type MessageData = {
  messageDate: string
  records: {
    _id?: string
    practiceOfficeChatConversationId: string
    type: string
    message: string
    sentBy: string
    isActive?: true
    isDeleted?: false
    createdAt?: string
    updatedAt?: string
    __v?: 0
  }[]
}
interface PracticeUserData {
  id: number
  internalId: string
  firstName: string
  lastName: string
  patientChat: ChatRoomType | null
}
export type ChatPatientRoomData = {
  _id: string
  orgUserIds: string[]
  name: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  unseenCount?: number
  message: MessageData[]
  orgUsers: OrgUserData[]
  isTyping?: boolean
  lastSeen: {
    _id: string
    userId: string
    lastSeen: string
    isOnline: boolean
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: 0
  }
  account: PracticeUserData[]
  lastSeenMessageId?: string
  __v: number
  total: number
  currentPage: number
  dataLength?: number
  createdBy: string
  isConfirmed: boolean
}
export interface ChatLoadingType {
  loading: boolean
  loadingProps?: { list?: boolean; room?: boolean; accept_reject?: boolean }
}
export interface ChatNotFoundType {
  notFoundStatus: boolean
  notFoundProps?: { list?: boolean; room?: boolean }
}
export type OfficeUser = {
  internalId: string
  id: number
  name: string
  email: string
  phone: string
  existChat: ChatRoomType | null
  notFound?: boolean
}
export type ChatAreaOptions = EnumValues<typeof ChatAreaType>
export interface ChatContextType {
  anchorElMenuHeader: HTMLDivElement | null
  setAnchorElMenuHeader: Dispatch<SetStateAction<HTMLDivElement | null>>
  chatLoading: ChatLoadingType
  setChatLoading: Dispatch<SetStateAction<ChatLoadingType>>
  chatNotFound: ChatNotFoundType
  setChatNotFound: Dispatch<SetStateAction<ChatNotFoundType>>
  openChatDrawer: boolean
  setOpenChatDrawer: Dispatch<SetStateAction<boolean>>
  chatArea: ChatAreaOptions
  setChatArea: Dispatch<SetStateAction<ChatAreaOptions>>
  isTyping: { id: string; typing: boolean }
  setIsTyping: Dispatch<SetStateAction<{ id: string; typing: boolean }>>
  currentUser: any
  setCurrentUser: Dispatch<SetStateAction<any>>
  handleCloseDrawer: () => void
  chatRooms: ChatRoomType[]
  setChatRooms: Dispatch<SetStateAction<ChatRoomType[]>>
  chatRoom: ChatPatientRoomData | undefined
  setChatRoom: Dispatch<SetStateAction<ChatPatientRoomData | undefined>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  messageId: string
  setMessageId: Dispatch<SetStateAction<string>>
  initialScroll: boolean
  setInitialScroll: Dispatch<SetStateAction<boolean>>
  messageLoading: boolean
  setMessageLoading: Dispatch<SetStateAction<boolean>>
  scrollButton: boolean
  setScrollButton: Dispatch<SetStateAction<boolean>>
  atTop: boolean
  setAtTop: Dispatch<SetStateAction<boolean>>
  isScroll: boolean
  setIsScroll: Dispatch<SetStateAction<boolean>>
  isConfirmPopUp: boolean
  setIsConfirmPopUp: Dispatch<SetStateAction<boolean>>
  messageActionLoading: boolean
  setMessageActionLoading: Dispatch<SetStateAction<boolean>>
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  chatElement: HTMLElement | null
  setChatElement: Dispatch<SetStateAction<HTMLElement | null>>
  messageActionType: MessageActions | undefined
  setMessageActionType: Dispatch<SetStateAction<MessageActions | undefined>>
  particularMessage: MessageData['records'][0] | undefined
  setParticularMessage: Dispatch<SetStateAction<MessageData['records'][0] | undefined>>
  notify: number
  setNotify: Dispatch<SetStateAction<number>>
  networkStatus: boolean
  setNetworkStatus: Dispatch<SetStateAction<boolean>>
  playTune: boolean
  setPlayTune: Dispatch<SetStateAction<boolean>>
  setChatOfficeUsers: Dispatch<SetStateAction<OfficeUser[]>>
  chatOfficeUsers: OfficeUser[]
  anchorElSearchInput: HTMLInputElement | null
  setAnchorElSearchInput: Dispatch<SetStateAction<HTMLInputElement | null>>
  updateChatRooms: boolean
  setUpdateChatRooms: Dispatch<SetStateAction<boolean>>
}
export const ChatContextInitialVal: ChatContextType = {
  anchorElMenuHeader: null,
  setAnchorElMenuHeader: () => {},
  chatLoading: { loading: false },
  chatOfficeUsers: [],
  setChatOfficeUsers: () => {},
  setChatLoading: () => {},
  openChatDrawer: false,
  setOpenChatDrawer: () => {},
  handleCloseDrawer: () => {},
  chatArea: ChatAreaType.List,
  setChatArea: () => {},
  currentUser:
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') as string)
      : undefined,
  setCurrentUser: () => {},
  chatRooms: [],
  setChatRooms: () => {},
  chatNotFound: { notFoundStatus: false },
  setChatNotFound: () => {},
  chatRoom: undefined,
  setChatRoom: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  count: 0,
  setCount: () => {},
  messageId: '',
  setMessageId: () => {},
  initialScroll: false,
  setInitialScroll: () => {},
  messageLoading: false,
  setMessageLoading: () => {},
  scrollButton: false,
  setScrollButton: () => {},
  atTop: false,
  setAtTop: () => {},
  isScroll: false,
  setIsScroll: () => {},
  isConfirmPopUp: false,
  setIsConfirmPopUp: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
  chatElement: null,
  setChatElement: () => {},
  messageActionType: undefined,
  setMessageActionType: () => {},
  messageActionLoading: false,
  setMessageActionLoading: () => {},
  particularMessage: undefined,
  setParticularMessage: () => {},
  setIsTyping: () => {},
  isTyping: { id: '', typing: false },
  notify: 0,
  setNotify: () => {},
  networkStatus: true,
  setNetworkStatus: () => {},
  playTune: false,
  setPlayTune: () => {},
  anchorElSearchInput: null,
  setAnchorElSearchInput: () => {},
  setUpdateChatRooms: () => {},
  updateChatRooms: false,
}
const ChatContext = createContext<ChatContextType>(ChatContextInitialVal)

export function ChatProvider({ children }: { children: ReactNode }) {
  //User state
  const [currentUser, setCurrentUser] = useState<ChatContextType['currentUser']>(
    ChatContextInitialVal['currentUser'],
  )
  const [updateChatRooms, setUpdateChatRooms] = useState<ChatContextType['updateChatRooms']>(
    ChatContextInitialVal['updateChatRooms'],
  )

  //Chat Rooms
  const [chatRooms, setChatRooms] = useState<ChatContextType['chatRooms']>(
    ChatContextInitialVal['chatRooms'],
  )
  //Chat Rooms
  const [chatRoom, setChatRoom] = useState<ChatContextType['chatRoom']>(
    ChatContextInitialVal['chatRoom'],
  )
  //Typing
  const [isTyping, setIsTyping] = useState<ChatContextType['isTyping']>(
    ChatContextInitialVal['isTyping'],
  )
  //Chat Not Found
  const [chatNotFound, setChatNotFound] = useState<ChatContextType['chatNotFound']>(
    ChatContextInitialVal['chatNotFound'],
  )
  const [openChatDrawer, setOpenChatDrawer] = useState<ChatContextType['openChatDrawer']>(
    ChatContextInitialVal['openChatDrawer'],
  )
  const [chatArea, setChatArea] = useState<ChatContextType['chatArea']>(
    ChatContextInitialVal['chatArea'],
  )
  const handleCloseDrawer: ChatContextType['handleCloseDrawer'] = () => {
    setOpenChatDrawer(false)
  }
  const [anchorElSearchInput, setAnchorElSearchInput] = useState<
    ChatContextType['anchorElSearchInput']
  >(ChatContextInitialVal['anchorElSearchInput'])

  //Active chat count
  const [count, setCount] = useState<ChatContextType['count']>(ChatContextInitialVal['count'])
  //Active scroll page
  const [currentPage, setCurrentPage] = useState<ChatContextType['currentPage']>(
    ChatContextInitialVal['currentPage'],
  )
  const [messageId, setMessageId] = useState<ChatContextType['messageId']>(
    ChatContextInitialVal['messageId'],
  )
  const [initialScroll, setInitialScroll] = useState<ChatContextType['initialScroll']>(
    ChatContextInitialVal['initialScroll'],
  )
  const [chatLoading, setChatLoading] = useState<ChatContextType['chatLoading']>(
    ChatContextInitialVal['chatLoading'],
  )
  //Message loading infinite scroll
  const [messageLoading, setMessageLoading] = useState<ChatContextType['messageLoading']>(
    ChatContextInitialVal['messageLoading'],
  )
  //Scroll Button in chat Area
  const [scrollButton, setScrollButton] = useState<ChatContextType['scrollButton']>(
    ChatContextInitialVal['scrollButton'],
  )
  //For At top page wise 100 message
  const [atTop, setAtTop] = useState<ChatContextType['atTop']>(ChatContextInitialVal['atTop'])
  //This is for dependency array to say now you can scroll
  const [isScroll, setIsScroll] = useState<ChatContextType['isScroll']>(
    ChatContextInitialVal['isScroll'],
  )
  //Chat area reference
  const [chatElement, setChatElement] = useState<ChatContextType['chatElement']>(
    ChatContextInitialVal['chatElement'],
  )
  const [isConfirmPopUp, setIsConfirmPopUp] = useState<ChatContextType['isConfirmPopUp']>(
    ChatContextInitialVal['isConfirmPopUp'],
  )

  //Menu popUp over each item
  const [menuOpen, setMenuOpen] = useState<ChatContextType['menuOpen']>(
    ChatContextInitialVal['menuOpen'],
  )
  //Message actions
  const [messageActionType, setMessageActionType] = useState<ChatContextType['messageActionType']>(
    ChatContextInitialVal['messageActionType'],
  )
  //Message actions
  const [messageActionLoading, setMessageActionLoading] = useState<
    ChatContextType['messageActionLoading']
  >(ChatContextInitialVal['messageActionLoading'])
  //Particular message state
  const [particularMessage, setParticularMessage] = useState<ChatContextType['particularMessage']>(
    ChatContextInitialVal['particularMessage'],
  )
  //Particular message state
  const [notify, setNotify] = useState<ChatContextType['notify']>(ChatContextInitialVal['notify'])
  //network status
  const [networkStatus, setNetworkStatus] = useState<ChatContextType['networkStatus']>(
    ChatContextInitialVal['networkStatus'],
  )
  const [playTune, setPlayTune] = useState<ChatContextType['playTune']>(
    ChatContextInitialVal['playTune'],
  )
  const [chatOfficeUsers, setChatOfficeUsers] = useState<ChatContextType['chatOfficeUsers']>(
    ChatContextInitialVal['chatOfficeUsers'],
  )
  const [anchorElMenuHeader, setAnchorElMenuHeader] = useState<
    ChatContextType['anchorElMenuHeader']
  >(ChatContextInitialVal['anchorElMenuHeader'])
  return (
    <ChatContext.Provider
      value={{
        setUpdateChatRooms,
        updateChatRooms,
        anchorElSearchInput,
        setAnchorElSearchInput,
        openChatDrawer,
        setOpenChatDrawer,
        handleCloseDrawer,
        chatArea,
        setChatArea,
        currentUser,
        setCurrentUser,
        chatRooms,
        setChatRooms,
        chatNotFound,
        setChatNotFound,
        chatRoom,
        setChatRoom,
        count,
        currentPage,
        setCount,
        setCurrentPage,
        messageId,
        setMessageId,
        initialScroll,
        setInitialScroll,
        chatLoading,
        setChatLoading,
        isTyping,
        setIsTyping,
        atTop,
        chatElement,
        isConfirmPopUp,
        isScroll,
        menuOpen,
        messageActionLoading,
        messageActionType,
        messageLoading,
        particularMessage,
        scrollButton,
        setAtTop,
        setChatElement,
        setIsConfirmPopUp,
        setIsScroll,
        setMenuOpen,
        setMessageActionLoading,
        setMessageActionType,
        setMessageLoading,
        setParticularMessage,
        setScrollButton,
        notify,
        setNotify,
        networkStatus,
        setNetworkStatus,
        playTune,
        setPlayTune,
        chatOfficeUsers,
        setChatOfficeUsers,
        anchorElMenuHeader,
        setAnchorElMenuHeader,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}
