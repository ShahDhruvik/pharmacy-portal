/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChatAreaType,
  ChatContextType,
  ChatPatientRoomData,
  ChatRoomType,
  useChat,
} from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { getOneOfficeChatConversation } from '@/lib/chat'
import { formatCreatedAt, formatMessageDate } from '@/socket/chat-time-function'
import socket from '@/socket/socket'
import { chatPatientHistory, getNameAndOtherDetails } from '@/socket/socket-functions'
import { SOCKET_STRING } from '@/socket/socket-string'
import { PracticePatientChatUserTypeEnum, formatDate } from '@/utils/constants'
import { Avatar, Badge, ListItemButton } from '@mui/material'
import clsx from 'clsx'
import React, { useEffect } from 'react'

type Props = {
  chatData: ChatRoomType
}

const ChatListItem = ({ chatData }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const {
    setChatArea,
    setChatNotFound,
    chatRooms,
    currentPage,
    setChatLoading,
    setChatRooms,
    setMessageId,
    setInitialScroll,
    chatRoom,
    setChatRoom,
    setCurrentPage,
    setCount,
    currentUser,
    setCreatePopUp,
    currentOrg,
  } = useChat()
  const details = getNameAndOtherDetails(chatData, currentUser?.internalId)
  console.log(details)
  const joinRoomEmit = (chatConversationId: string) => {
    localStorage.setItem('lasVisitedChatConversationId', chatConversationId)
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_JOIN_ROOM, chatConversationId)
  }
  const afterClickingRoom = (countCondition: boolean, x: ChatContextType['chatRooms'][0]) => {
    console.log('room called after fnc ::::')
    if (countCondition) {
      chatPatientHistory({
        practiceOfficeChatConversationId: x?._id,
        lastSeen: new Date().toISOString(),
        practiceOfficeLastSeenMessageId: x?.lastMessage?._id,
        orgUserId: String(currentUser?.internalId),
      })
      setMessageId(x?.lastSeenMessage ? x?.lastSeenMessage?._id : '')
    } else {
      setMessageId('')
    }

    setInitialScroll(true)
  }
  useEffect(() => {
    const handleRoomEntering = async (chatConversationId: string) => {
      console.log('PRACTICE_OFFICE_ENTERED_ROOM')
      setChatLoading({ loading: true, loadingProps: { room: true } })
      const res = await getOneOfficeChatConversation(
        setLoading,
        chatConversationId,
        currentPage,
        showToast,
      )
      if (res) {
        const { message } = res as ChatPatientRoomData
        const messageLength = message?.reduce((acc, msgData) => acc + msgData?.records?.length, 0)
        setChatRoom({ ...(res as ChatPatientRoomData), dataLength: messageLength })
        console.log('room updated after tab click')
        setChatNotFound({
          notFoundStatus: false,
          notFoundProps: { room: true },
        })
      } else {
        setChatNotFound({
          notFoundStatus: true,
          notFoundProps: { room: true },
        })
      }
      setChatLoading({ loading: false, loadingProps: { room: true } })
      setChatArea(ChatAreaType.Message)
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_ENTERED_ROOM, handleRoomEntering)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_ENTERED_ROOM, handleRoomEntering)
    }
  }, [socket, chatRoom])
  //Last seen
  useEffect(() => {
    const handleOnline = (data: any) => {
      if (chatRoom) {
        setChatRoom({ ...chatRoom, lastSeen: data })
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_LAST_SEEN, handleOnline)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_LAST_SEEN, handleOnline)
    }
  }, [socket, chatRoom])
  const countCondition = (chatData?.unseenCount as number) > 0 && chatData?._id !== chatRoom?._id
  const normalMessageCondition =
    (chatData?.unseenCount as number) === 0 && chatData?._id !== chatRoom?._id
  return (
    <ListItemButton
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
      }}
      divider
      onClick={() => {
        if (!details?.toBeRequested) {
          setCurrentPage(1)
          setCount(0)
          setChatRoom(undefined)
          setCreatePopUp({
            isOpen: true,
            internalId: currentUser?.internalId,
            chatConversationId: chatData?._id,
          })
        } else {
          console.log('room called Click fnc ::::')
          setCurrentPage(1)
          setCount(0)
          setChatRoom(undefined)
          joinRoomEmit(chatData?._id)
          afterClickingRoom(countCondition, chatData)
        }
      }}
    >
      <div
        className={clsx(
          'flex items-center gap-3',
          !chatData?.isConfirmed && 'min-w-[70%] max-w-[70%]',
          chatData?.isConfirmed && 'min-w-[80%] max-w-[80%]',
        )}
      >
        <Avatar src='/' alt={details?.nameOfUser ?? ''} />
        <div className='flex-col'>
          <p className='text-sm text-darkBlue-main flex gap-2 font-normal'>
            {`${details?.nameOfUser ?? ''} [ ${currentOrg?.name ?? ''} ] `}
          </p>
          {/* <p className='text-xs text-darkGray-main'>{currentOrg?.name ?? ''}</p> */}
          {countCondition && details?.toBeRequested && details?.isConfirmed && (
            <p className='text-base line-clamp-1'>{chatData?.lastMessage?.message ?? '--'}</p>
          )}
          {normalMessageCondition && details?.toBeRequested && details?.isConfirmed && (
            <p className='text-base line-clamp-1'>{chatData?.lastSeenMessage?.message ?? '--'}</p>
          )}
        </div>
      </div>
      {countCondition && details?.toBeRequested && details?.isConfirmed && (
        <div className='flex flex-col justify-between h-full'>
          <p className='text-sm text-darkBlue-main uppercase font-normal '>
            {chatData?.lastMessage?.createdAt
              ? formatCreatedAt(chatData?.lastMessage?.createdAt as string)
              : '--'}
          </p>
          <div className='w-5 aspect-square bg-green-main text-white-main flex items-center self-end justify-center rounded-full'>
            <p className='text-xs'>{chatData?.unseenCount ?? 0}</p>
          </div>
        </div>
      )}
      {normalMessageCondition && details?.toBeRequested && details?.isConfirmed && (
        <p className='text-sm text-darkBlue-main uppercase self-start font-normal '>
          {chatData?.lastSeenMessage?.createdAt
            ? formatCreatedAt(chatData?.lastSeenMessage?.createdAt as string)
            : '--'}
        </p>
      )}
      {!details?.toBeRequested && (
        <div className='p-1 bg-green-main text-white-main flex items-center justify-center rounded-md'>
          <p className='text-xs'>{details?.status}</p>
        </div>
      )}
      {details?.toBeRequested && !details?.isConfirmed && (
        <p
          className={`text-xs self-center ${
            details?.isChatCreatedByUser ? 'text-orange-main' : 'text-green-main'
          }`}
        >
          {details?.status}
        </p>
      )}
    </ListItemButton>
  )
}

export default ChatListItem
