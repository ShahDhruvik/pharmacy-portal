/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChatAreaType, ChatPatientRoomData, useChat } from '@/context/ChatContext'
import { theme } from '@/context/ThemeProvider'
import { getLastSeenTime } from '@/socket/chat-time-function'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { Button, Divider, IconButton } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ChatHeaderMenu from './chat-header-menu'
import { getNameAndOtherDetails } from '@/socket/socket-functions'

type Props = {}

const ChatMessageHeader = (props: Props) => {
  const {
    currentUser,
    setChatRoom,
    chatRoom,
    isTyping,
    anchorElMenuHeader,
    setAnchorElMenuHeader,
    currentOrg,
  } = useChat()
  const menuRef = useRef<HTMLInputElement | null>(null)
  const details = getNameAndOtherDetails(chatRoom as ChatPatientRoomData, currentUser?.internalId)
  console.log(details)
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
  //param
  const userName =
    (chatRoom?.orgUsers && chatRoom?.orgUsers.length > 0 ? chatRoom?.orgUsers[0]?.name : '') ?? ''
  const lastDate = chatRoom?.lastSeen ? new Date(chatRoom?.lastSeen?.lastSeen) : ''
  return (
    <>
      <div className=' p-2 flex justify-between'>
        <div>
          <p className='text-lg text-darkBlue-main font-semibold'>
            {`${details?.nameOfUser}`}
            <span className='text-base text-darkBlue-main font-normal'>{` [ ${currentOrg?.name} ]`}</span>
          </p>
          <div>
            <p>{chatRoom?._id === isTyping?.id && isTyping?.typing ? 'typing...' : ''}</p>
          </div>
          <div>
            <p className='text-xs'>
              {!(chatRoom?._id === isTyping.id && isTyping.typing) &&
                chatRoom?.lastSeen &&
                `${
                  chatRoom?.lastSeen?.isOnline ? 'Online' : `Last seen ${getLastSeenTime(lastDate)}`
                }`}
            </p>
          </div>
        </div>
        <div className='flex items-center' ref={menuRef}>
          <IconButton
            onClick={() => {
              if (Boolean(anchorElMenuHeader)) {
                setAnchorElMenuHeader(null)
              } else {
                setAnchorElMenuHeader(menuRef.current)
              }
            }}
          >
            <MoreHorizIcon sx={{ color: theme.palette.mDarkBlue?.main }} />
          </IconButton>
          <ChatHeaderMenu />
        </div>
      </div>
      <Divider />
    </>
  )
}

export default ChatMessageHeader
