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
import socket from '@/socket/socket'
import { chatPatientHistory, getNameAndOtherDetails } from '@/socket/socket-functions'
import { SOCKET_STRING } from '@/socket/socket-string'
import { PracticePatientChatUserTypeEnum } from '@/utils/constants'
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
  } = useChat()
  const details = getNameAndOtherDetails(chatData, currentUser?.internalId)

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
  // const orgName =
  //   chatData?.orgUsers.length > 0 &&
  //   chatData?.orgUsers[0].name.trim().toLowerCase() !==
  //     chatData?.organization?.name.trim().toLowerCase()
  //     ? chatData?.organization?.name
  //     : ''
  return (
    <ListItemButton
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
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
            {details?.nameOfUser ?? ''}
          </p>
          {/* <p className='text-xs text-darkGray-main'>{orgName ?? ''}</p> */}
          {countCondition && <p className='text-base'>{chatData?.lastMessage?.message ?? '--'}</p>}
        </div>
      </div>
      {countCondition && (
        <div className='w-5 aspect-square bg-green-main text-white-main flex items-center justify-center rounded-full'>
          <p className='text-xs'>{chatData?.unseenCount ?? 0}</p>
        </div>
      )}
    </ListItemButton>
  )
}

export default ChatListItem
