/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect } from 'react'
import ChatListItem from './chat-list-item'
import { useLoading } from '@/context/LoadingContext'
import { getOfficeChatConversation } from '@/lib/chat'
import { useToast } from '@/hooks/useToast'
import { ChatRoomType, useChat } from '@/context/ChatContext'
import { theme } from '@/context/ThemeProvider'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'

type Props = {}

function filterRecordsAndRemoveOrgUsers(
  data: ChatRoomType[],
  userIdToRemove: number,
): ChatRoomType[] {
  const usersWithoutSameOrgUserIds: ChatRoomType[] = []
  for (const chtRm of data) {
    const { orgUsers } = chtRm
    const allSame = orgUsers.every((user) => user.id === userIdToRemove)
    if (!allSame) {
      const filteredUser = chtRm?.orgUsers?.filter((x) => x.id !== userIdToRemove)
      const updatedChtRm: ChatRoomType = { ...chtRm, orgUsers: filteredUser }
      usersWithoutSameOrgUserIds.push(updatedChtRm)
    }
  }
  return usersWithoutSameOrgUserIds
}

const ChatList = (props: Props) => {
  const { currentUser, chatNotFound, setChatNotFound, setChatRooms, chatRooms, updateChatRooms } =
    useChat()
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const fetchChatList = async () => {
    const res = await getOfficeChatConversation(setLoading, showToast)
    if (res) {
      const dataWithOutSelf = filterRecordsAndRemoveOrgUsers(res, currentUser?.id)
      setChatRooms(dataWithOutSelf)
      setChatNotFound({ notFoundStatus: false, notFoundProps: { list: true } })
    } else {
      setChatRooms([])
      setChatNotFound({ notFoundStatus: true, notFoundProps: { list: true } })
    }
  }
  useEffect(() => {
    fetchChatList()
  }, [currentUser])
  useEffect(() => {
    fetchChatList()
  }, [updateChatRooms])
  //update Room in roomList
  useEffect(() => {
    const handleNewRoom = (data: any) => {
      console.log('count')
      const existingRoomIndex = chatRooms?.findIndex((room) => room?._id === data.response.data._id)
      if (existingRoomIndex !== -1 && data.response.success && data.response.data) {
        const previousRoom = chatRooms[existingRoomIndex]
        const updatePreviousRoom = {
          orgUsers: previousRoom.orgUsers,
          ...data.response.data,
        }
        const updatedRooms = [
          { ...updatePreviousRoom },
          ...chatRooms?.slice(0, existingRoomIndex),
          ...chatRooms?.slice(existingRoomIndex + 1),
        ]
        console.log(data.response.data, 'lll')
        console.log(updatedRooms, 'aasda')
        setChatRooms(updatedRooms)
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_LIST_UPDATE_MESSAGE_COUNT, handleNewRoom)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_LIST_UPDATE_MESSAGE_COUNT, handleNewRoom)
    }
  }, [socket, chatRooms])
  //Add new add rooms in roomList
  useEffect(() => {
    const handleNewRoom = (data: any) => {
      const existingRoomIndex = chatRooms?.find((room) => room?._id === data.response._id)
      if (!existingRoomIndex && data.response) {
        const updatedRooms = [{ ...data.response }, ...chatRooms]
        setChatRooms(updatedRooms)
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_ADD_ROOM_NOTIFY, handleNewRoom)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_ADD_ROOM_NOTIFY, handleNewRoom)
    }
  }, [socket, chatRooms])
  return (
    <List>
      {!loading.isLoading &&
        !chatNotFound.notFoundStatus &&
        chatRooms.map((ch) => {
          return <ChatListItem key={ch?._id} chatData={ch} />
        })}
      {loading.isLoading && loading.isIndependentLoader && (
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <CircularProgress size={15} thickness={10} sx={{ color: theme.palette.mBlue?.main }} />
          <p className='font-bold text-blue-main'>Initializing chat</p>
        </ListItem>
      )}
      {!loading.isLoading && chatNotFound.notFoundStatus && chatNotFound?.notFoundProps?.list && (
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <p className='font-bold text-blue-main'>Not chat yet available</p>
        </ListItem>
      )}
    </List>
  )
}

export default ChatList
