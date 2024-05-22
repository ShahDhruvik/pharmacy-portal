/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChatAreaType,
  ChatContextType,
  ChatPatientRoomData,
  MessageData,
  defaultChatControls,
  useChat,
} from '@/context/ChatContext'
import ChatMessageHeader from './chat-message-header'
import ChatMessageSpace from './chat-message-space'
import ChatMessageInput from './chat-message-input'
import { Badge, Button, Divider, IconButton } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import { useLoading } from '@/context/LoadingContext'
import { getOneOfficeChatConversation } from '@/lib/chat'
import { useToast } from '@/hooks/useToast'
import { useEffect } from 'react'
import { chatPatientHistory } from '@/socket/socket-functions'
import { PracticePatientChatUserTypeEnum } from '@/utils/constants'
import socket from '@/socket/socket'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SOCKET_STRING } from '@/socket/socket-string'
import ChatBoxActionConfirmation from './chat-box-confirmation'
type Props = {}

const ChatMessageArea = (props: Props) => {
  const { chatNotFound, handleCloseDrawer, setChatArea, setChatRooms } = useChat()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const {
    currentUser,
    chatRoom,
    setChatRoom,
    setCount,
    setMessageLoading,
    setScrollButton,
    isScroll,
    setIsScroll,
    chatElement,
    setChatElement,
    atTop,
    setAtTop,
    setCurrentPage,
    currentPage,
    scrollButton,
    count,
    messageId,
    isConfirmPopUp,
    initialScroll,
    setInitialScroll,
    setHandleControls,
  } = useChat()
  // bottom scroll function
  const bottomScroll = (chatBody: HTMLElement) => {
    setTimeout(() => {
      chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: 'smooth',
      })
      setCount(0)
    }, 0)
  }
  //Handle bottom scroll in chat Main Element
  const waitForChatElement = async () => {
    const maxAttempts = 10
    let attempts = 0
    const findElement = () => {
      const element = document.getElementById('chat')
      if (element) {
        setChatElement(element)
        setIsScroll((prev) => !prev)
      } else {
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(findElement, 100)
        } else {
          return
        }
      }
    }
    findElement()
  }
  // handle message scroll at last message
  const waitForElement = async (mId: string) => {
    const maxAttempts = 10
    let attempts = 0
    const findElement = () => {
      const element = document.getElementById(mId)
      if (element) {
        console.log('element found ', element, attempts)
        element.scrollIntoView({
          behavior: 'auto',
          block: 'end',
          inline: 'nearest',
        })
      } else {
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(findElement, 100)
        } else {
          waitForChatElement()
        }
      }
    }
    findElement()
  }
  // //last 100 message infinite scroll
  const updateCurrentRoom = async () => {
    if (chatRoom && chatRoom?.dataLength && chatRoom?.dataLength < chatRoom?.total) {
      setMessageLoading(true)
      const res = await getOneOfficeChatConversation(
        setLoading,
        chatRoom?._id,
        currentPage,
        showToast,
      )
      if (res) {
        const { message } = res as any
        let roomDataLength = 0
        let messageData: any[] = []
        if (chatRoom) {
          if (chatRoom?.dataLength) {
            roomDataLength = chatRoom.dataLength
          }
        }
        if (chatRoom) {
          if (chatRoom?.message) {
            const prevLastMessage = chatRoom?.message[0]
            const nextFirstMessage = message[message.length - 1]
            if (prevLastMessage && nextFirstMessage) {
              const prevDate = new Date(prevLastMessage.messageDate)
              const nextDate = new Date(nextFirstMessage.messageDate)
              if (
                prevDate.getDate() === nextDate.getDate() &&
                prevDate.getMonth() === nextDate.getMonth() &&
                prevDate.getFullYear() === nextDate.getFullYear()
              ) {
                const concatMessage = chatRoom.message.find(
                  (x) => x.messageDate === prevLastMessage.messageDate,
                )
                const filterMessage = chatRoom.message.filter(
                  (x) => x.messageDate !== prevLastMessage.messageDate,
                )
                const concatNextMessage = message.find(
                  (x: MessageData) => x.messageDate === nextFirstMessage.messageDate,
                )
                const filterNextMessage = message.filter(
                  (x: MessageData) => x.messageDate !== nextFirstMessage.messageDate,
                )

                const updateConcatMessage: MessageData = {
                  messageDate: (concatMessage as MessageData).messageDate,
                  records: [
                    ...concatNextMessage.records,
                    ...(concatMessage as MessageData).records,
                  ],
                }
                messageData = [...filterNextMessage, updateConcatMessage, ...filterMessage]
              } else {
                messageData = [...message, ...chatRoom.message]
              }
            } else {
              messageData = [...message, ...chatRoom.message]
            }
          }
        } else {
          messageData = [...message]
        }
        const messageLength = message.reduce(
          (acc: any, msgData: any) => acc + msgData.records.length,
          0,
        )
        const roomFinalStore = {
          ...chatRoom,
          message: messageData,
          dataLength: roomDataLength + messageLength,
        }
        setChatRoom(roomFinalStore)
        setMessageLoading(false)
      }
    }
  }
  //Chat Element
  useEffect(() => {
    if (chatElement) {
      setTimeout(() => {
        bottomScroll(chatElement)
      }, 100)
    }
  }, [chatElement, isScroll])

  useEffect(() => {
    if (initialScroll) {
      waitForElement(messageId)
      setInitialScroll(false) // Set the initial scroll flag to false
    } else {
      updateCurrentRoom()
    }
  }, [currentPage])
  //Btn scroll
  useEffect(() => {
    const chatContainer = document.getElementById('chat')
    const handleScroll = () => {
      if (chatContainer) {
        const scrollPosition = Math.round(chatContainer.scrollTop + chatContainer.clientHeight)
        const scrollHeight = chatContainer.scrollHeight
        const difference = scrollHeight - scrollPosition
        const atBottom = difference <= 20
        setScrollButton(!atBottom)
        if (atBottom) {
          setCount(0)
        }
      }
    }
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [chatRoom?.message])
  //New message
  useEffect(() => {
    const handleNewMessage = (record: any) => {
      console.log('PRACTICE_OFFICE_NEW_MESSAGE')
      const todayMessages = chatRoom?.message.find((x) => {
        const givenDate = new Date(x.messageDate)
        const currentDate = new Date()
        return (
          givenDate.getDate() === currentDate.getDate() &&
          givenDate.getMonth() === currentDate.getMonth() &&
          givenDate.getFullYear() === currentDate.getFullYear()
        )
      })
      const notTodayMessages = chatRoom?.message.filter((x) => {
        const givenDate = new Date(x.messageDate)
        const currentDate = new Date()
        return !(
          givenDate.getDate() === currentDate.getDate() &&
          givenDate.getMonth() === currentDate.getMonth() &&
          givenDate.getFullYear() === currentDate.getFullYear()
        )
      })
      if (todayMessages) {
        setChatRoom({
          ...chatRoom,
          message: [
            ...(notTodayMessages as MessageData[]),
            {
              ...todayMessages,
              records: [
                ...todayMessages.records,
                {
                  ...record,
                },
              ],
            },
          ],
        } as ChatPatientRoomData)
      } else {
        if (notTodayMessages) {
          setChatRoom({
            ...chatRoom,
            message: [
              ...notTodayMessages,
              {
                messageDate: new Date().toISOString(),
                records: [
                  {
                    ...record,
                  },
                ],
              },
            ],
          } as ChatPatientRoomData)
        } else {
          setChatRoom({
            ...chatRoom,
            message: [
              {
                messageDate: new Date().toISOString(),
                records: [
                  {
                    ...record,
                  },
                ],
              },
            ],
          } as ChatPatientRoomData)
        }
      }
      chatPatientHistory({
        practiceOfficeChatConversationId: record?.practiceOfficeChatConversationId,
        lastSeen: new Date().toISOString(),
        practiceOfficeLastSeenMessageId: record?._id,
        orgUserId: String(currentUser?.internalId),
      })
      const chatContainer = document.getElementById('chat')
      const isScrollable =
        (chatContainer?.scrollHeight as number) > (chatContainer?.clientHeight as number)
      if (isScrollable) {
        if (record.sentBy === String(currentUser?.internalId)) {
          waitForElement(record?._id)
          // setScrollButton(false)
          // setCount(0)
          // bottomScroll(chatContainer as HTMLElement)
        } else {
          setCount((count) => count + 1)
          setScrollButton(true)
        }
      } else {
        setCount(0)
        setScrollButton(false)
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_NEW_MESSAGE, handleNewMessage)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_NEW_MESSAGE, handleNewMessage)
    }
  }, [socket, chatRoom])
  // handle infinite scroll
  useEffect(() => {
    const chatContainer = document.getElementById('chat')
    const handleScroll = () => {
      if (chatContainer) {
        const scrollPosition = Math.round(chatContainer.scrollTop)
        const isAtTop = scrollPosition === 0
        if (isAtTop) {
          setCurrentPage((prev) => prev + 1)
        }
      }
    }
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll)
      }
    }
  })
  //handle deleted message
  //Delete
  useEffect(() => {
    const handleDelete = (data: any) => {
      console.log('PRACTICE_OFFICE_DELETED_MESSAGE')
      if (chatRoom && data && !data.isActive && data.isDeleted) {
        const mesDateFromBk = new Date(data.createdAt)
        const dateThatHasMessage = chatRoom?.message
          ?.map((mesD) => {
            const mesDate = new Date(mesD.messageDate)
            if (
              mesDate.getDate() === mesDateFromBk.getDate() &&
              mesDate.getMonth() === mesDateFromBk.getMonth() &&
              mesDate.getFullYear() === mesDateFromBk.getFullYear()
            ) {
              const updateMessagesToDelete = mesD.records.filter((delM) => delM._id !== data?._id)
              if (updateMessagesToDelete.length > 0) {
                return { ...mesD, records: updateMessagesToDelete }
              }
            } else {
              return mesD
            }
          })
          .filter(Boolean)
        if (dateThatHasMessage)
          setChatRoom({
            ...chatRoom,
            message: dateThatHasMessage as MessageData[],
          })
      } else {
        console.log('something wrong message delete functionality.')
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_DELETED_MESSAGE, handleDelete)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_DELETED_MESSAGE, handleDelete)
    }
  }, [socket, chatRoom])
  //Update
  useEffect(() => {
    const handleUpdate = (data: any) => {
      console.log('PRACTICE_OFFICE_UPDATED_MESSAGE')
      if (chatRoom && data && data.isActive && !data.isDeleted) {
        const mesDateFromBk = new Date(data.createdAt)
        const dateThatHasMessage = chatRoom?.message?.map((mesD) => {
          const mesDate = new Date(mesD.messageDate)
          if (
            mesDate.getDate() === mesDateFromBk.getDate() &&
            mesDate.getMonth() === mesDateFromBk.getMonth() &&
            mesDate.getFullYear() === mesDateFromBk.getFullYear()
          ) {
            const updateMessagesToDelete = mesD.records.map((delM) => {
              if (delM._id === data?._id) {
                return { ...delM, message: data.message }
              } else {
                return delM
              }
            })
            if (updateMessagesToDelete.length > 0) {
              return { ...mesD, records: updateMessagesToDelete }
            }
          } else {
            return mesD
          }
        })
        setChatRoom({
          ...chatRoom,
          message: dateThatHasMessage as MessageData[],
        })
      } else {
        console.log('something wrong message delete functionality.')
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATED_MESSAGE, handleUpdate)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_UPDATED_MESSAGE, handleUpdate)
    }
  }, [socket, chatRoom])
  //clear message
  useEffect(() => {
    const handleUpdate = (data: any) => {
      console.log('PRACTICE_OFFICE_CLEARED_MESSAGES')
      if (chatRoom) {
        setChatRoom({
          ...chatRoom,
          message: [],
        })
      } else {
        console.log('something wrong message delete functionality.')
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_CLEARED_MESSAGES, handleUpdate)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_CLEARED_MESSAGES, handleUpdate)
    }
  }, [socket, chatRoom])
  useEffect(() => {
    const handleInitialJoin = () => {
      console.log('handleInitialJoin')
      const id = localStorage.getItem('lasVisitedChatConversationId')
      if (socket.connected && id !== null) {
        socket.emit(SOCKET_STRING.PRACTICE_OFFICE_JOIN_ROOM, id)
      }
    }
    socket.on('connect', handleInitialJoin)
    return () => {
      socket.off('connect', handleInitialJoin)
    }
  }, [socket])

  return (
    <>
      <div
        className={`flex justify-between bg-white-main items-center sticky top-0 px-1 py-1 z-50`}
        id='header'
      >
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            height: 20,
          }}
          onClick={() => {
            setChatArea(ChatAreaType.List)
            setChatRooms([])
            setChatRoom(undefined)
            setHandleControls(defaultChatControls)
            localStorage.removeItem('lasVisitedChatConversationId')
          }}
          disableRipple
        >
          Back
        </Button>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            height: 20,
          }}
          disableRipple
          onClick={() => {
            handleCloseDrawer()
            setChatArea(ChatAreaType.List)
            setChatRooms([])
            setChatRoom(undefined)
            setHandleControls(defaultChatControls)
            localStorage.removeItem('lasVisitedChatConversationId')
          }}
        >
          Done
        </Button>
      </div>
      {/* <Divider /> */}
      {!chatNotFound?.notFoundStatus && chatRoom && (
        <>
          <ChatMessageHeader />
          <ChatMessageSpace />
          {chatRoom.isConfirmed && <ChatMessageInput />}
          {scrollButton && (
            <div className='w-max absolute bottom-[75px] right-2 bg-darkBlue-main rounded-md self-end shadow-box-out'>
              <IconButton
                onClick={() => {
                  waitForChatElement()
                }}
              >
                <Badge badgeContent={count} color='primary' max={99}>
                  <KeyboardArrowDownIcon sx={{ color: theme.palette.mWhite?.main }} />
                </Badge>
              </IconButton>
            </div>
          )}
        </>
      )}
      {chatNotFound?.notFoundStatus && chatNotFound.notFoundProps?.room && !chatRoom && (
        <p className='p-2 text-lg font-bold'>Chat not available</p>
      )}
      {isConfirmPopUp && <ChatBoxActionConfirmation />}
    </>
  )
}

export default ChatMessageArea
