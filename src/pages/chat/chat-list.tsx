/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ChatListItem from './chat-list-item'
import { useLoading } from '@/context/LoadingContext'
import { getOfficeChatConversation } from '@/lib/chat'
import { useToast } from '@/hooks/useToast'
import { ChatRoomType, defaultChatControls, useChat } from '@/context/ChatContext'
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
  const chatListRef = useRef<HTMLUListElement | null>(null)
  const {
    currentUser,
    chatNotFound,
    setUpdateChatRooms,
    setChatNotFound,
    setChatRooms,
    chatRooms,
    updateChatRooms,
    setPageControls,
    handleControls,
    setHandleControls,
    openChatDrawer,
    currentOrg,
    pageControls,
  } = useChat()
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const fetchChatList = async () => {
    const res = await getOfficeChatConversation(
      setLoading,
      showToast,
      handleControls,
      currentOrg?.id,
      currentUser?.internalId,
    )
    if (res) {
      const { records, ...rest } = res
      const allData = [...chatRooms, ...res.records]
      setPageControls({ ...rest, numberOfRecords: allData.length })
      setChatRooms(allData)
      setChatNotFound({ notFoundStatus: allData.length === 0, notFoundProps: { list: true } })
    } else {
      setPageControls(undefined)
      setChatRooms([])
      setChatNotFound({ notFoundStatus: true, notFoundProps: { list: true } })
    }
  }
  useEffect(() => {
    if (openChatDrawer) {
      fetchChatList()
    }
  }, [updateChatRooms, currentUser, handleControls])
  //update Room in roomList
  useEffect(() => {
    const handleNewRoom = (data: any) => {
      console.log('PRACTICE_OFFICE_LIST_UPDATE_MESSAGE_COUNT')
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
      } else {
        setChatRooms([])
        setHandleControls(defaultChatControls)
        setUpdateChatRooms(!updateChatRooms)
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_LIST_UPDATE_MESSAGE_COUNT, handleNewRoom)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_LIST_UPDATE_MESSAGE_COUNT, handleNewRoom)
    }
  }, [socket, chatRooms, updateChatRooms])
  //Add new add rooms in roomList
  useEffect(() => {
    const handleNewRoom = async (data: any) => {
      console.log('PRACTICE_OFFICE_ADD_ROOM_NOTIFY')
      setChatRooms([])
      setHandleControls(defaultChatControls)
      setUpdateChatRooms(!updateChatRooms)
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_ADD_ROOM_NOTIFY, handleNewRoom)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_ADD_ROOM_NOTIFY, handleNewRoom)
    }
  }, [socket, updateChatRooms])
  //Accept-RejectResponse
  useEffect(() => {
    const handleNewRoom = async (data: any) => {
      console.log('PRACTICE_OFFICE_UPDATE_ROOM_ACCEPT_OR_REJECT_RESPONSE')
      setChatRooms([])
      setHandleControls(defaultChatControls)
      setUpdateChatRooms(!updateChatRooms)
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_ACCEPT_OR_REJECT_RESPONSE, handleNewRoom)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_ACCEPT_OR_REJECT_RESPONSE, handleNewRoom)
    }
  }, [socket, updateChatRooms])
  //clear message
  useEffect(() => {
    const handleUpdate = (data: any) => {
      console.log('PRACTICE_OFFICE_CLEARED_MESSAGES')
      setChatRooms([])
      setHandleControls(defaultChatControls)
      setUpdateChatRooms(!updateChatRooms)
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_CLEARED_MESSAGES, handleUpdate)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_CLEARED_MESSAGES, handleUpdate)
    }
  }, [socket, updateChatRooms])
  return (
    <List
      ref={chatListRef}
      style={{ maxHeight: '410px', overflow: 'auto' }}
      onScrollCapture={() => {
        const chatContainer = chatListRef.current
        const scrollTop = Math.round((chatContainer as HTMLUListElement).scrollTop)
        const clientHeight = (chatContainer as HTMLUListElement).clientHeight
        const scrollHeight = (chatContainer as HTMLUListElement).scrollHeight
        const isAtBottom = scrollTop + clientHeight >= scrollHeight
        if (
          isAtBottom &&
          (pageControls?.numberOfRecords as number) < (pageControls?.total as number)
        ) {
          setHandleControls({
            ...handleControls,
            currentPage: (pageControls?.currentPage as number) + 1,
          })
        }
      }}
    >
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
          <CircularProgress size={15} thickness={6} sx={{ color: theme.palette.mDarkBlue?.main }} />
          <p className='font-normal text-darkBlue-main'>Lets get you started here !</p>
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
          <p className='text-darkGray-main text-base'>It's quiet around here, lets chat!</p>
        </ListItem>
      )}
    </List>
  )
}

export default ChatList
