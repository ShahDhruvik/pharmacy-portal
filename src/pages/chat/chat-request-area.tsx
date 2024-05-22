import { defaultChatControls, useChat } from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { theme } from '@/context/ThemeProvider'
import { useToast } from '@/hooks/useToast'
import { activeChatConversation, createOfficeChatConversation } from '@/lib/chat'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { Button, Typography } from '@mui/material'
import React from 'react'

type Props = {}

const ChatRequestArea = (props: Props) => {
  const {
    setCreatePopUp,
    setUpdateChatRooms,
    currentUser,
    createPopUp,
    setChatRooms,
    setHandleControls,
    updateChatRooms,
  } = useChat()
  const { setLoading } = useLoading()
  const showToast = useToast()
  return (
    <div className='w-full h-max justify-self-center mt-20 px-2  bg-white-main flex flex-col  items-center justify-center gap-5 '>
      <Typography
        sx={{
          color: theme.palette.mPink?.main,
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {'Are you sure you want to establish chat with this user?'}
      </Typography>
      <div className='flex justify-evenly w-full'>
        <Button
          variant='contained'
          color='mPink'
          sx={{ color: '#ffffff', minWidth: 120 }}
          onClick={async () => {
            const res = await activeChatConversation(
              setLoading,
              createPopUp?.chatConversationId as string,
              showToast,
            )
            if (res?.success) {
              const emitData = {
                data: { ...res?.data },
                orgUserInternalId: currentUser?.internalId,
              }
              socket.emit(SOCKET_STRING.PRACTICE_OFFICE_ADD_ROOM, emitData)
              setChatRooms([])
              setHandleControls(defaultChatControls)
              setUpdateChatRooms(!updateChatRooms)
              setCreatePopUp({ isOpen: false })
            }
          }}
        >
          Yes
        </Button>
        <Button
          variant='contained'
          color='mPink'
          sx={{ color: '#ffffff', minWidth: 120 }}
          onClick={() => {
            setChatRooms([])
            setHandleControls(defaultChatControls)
            setUpdateChatRooms(!updateChatRooms)
            setCreatePopUp({ isOpen: false })
          }}
        >
          No
        </Button>
      </div>
    </div>
  )
}

export default ChatRequestArea
