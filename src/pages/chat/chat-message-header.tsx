/* eslint-disable react-hooks/exhaustive-deps */
import { ChatAreaType, useChat } from '@/context/ChatContext'
import { theme } from '@/context/ThemeProvider'
import { getLastSeenTime } from '@/socket/chat-time-function'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { Button, Divider } from '@mui/material'
import React, { useEffect } from 'react'

type Props = {}

const ChatMessageHeader = (props: Props) => {
  const { currentUser, setChatRoom, chatRoom, isTyping } = useChat()
  //Last seen
  useEffect(() => {
    if (chatRoom) {
      const handleOnline = (data: any) => {
        setChatRoom({ ...chatRoom, lastSeen: data })
      }
      socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_LAST_SEEN, handleOnline)
    }
  }, [socket, chatRoom])
  //param
  const userName =
    (chatRoom?.orgUsers && chatRoom?.orgUsers.length > 0 ? chatRoom?.orgUsers[0]?.name : '') ?? ''
  const lastDate = chatRoom?.lastSeen ? new Date(chatRoom?.lastSeen?.lastSeen) : ''
  return (
    <>
      {/* <div className='pr-1 pl-2 pt-5 pb-1'>
        <p className='text-xl pl-3 font-semibold '>Practice Chat</p>
        <Divider
          sx={{ width: '90%', border: '1px solid', borderColor: theme.palette.mBlack?.main }}
        />
      </div> */}
      <div className='max-w-[80%] p-2'>
        <p className='text-lg text-darkBlue-main font-semibold'>{userName}</p>
        <div>
          <p>{chatRoom?._id === isTyping?.id && isTyping?.typing ? 'typing...' : ''}</p>
        </div>
        <div>
          <p>
            {!(chatRoom?._id === isTyping.id && isTyping.typing) &&
              chatRoom?.lastSeen &&
              `${
                chatRoom?.lastSeen?.isOnline ? 'Online' : `Last seen ${getLastSeenTime(lastDate)}`
              }`}
          </p>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default ChatMessageHeader
