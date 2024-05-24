import CustomBackDrop from '@/components/CustomBackdrop'
import { ChatAreaType, defaultChatControls, useChat } from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { theme } from '@/context/ThemeProvider'
import { useToast } from '@/hooks/useToast'
import { activeChatConversation, createOfficeChatConversation } from '@/lib/chat'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { Button, Paper, Typography } from '@mui/material'
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
    setChatArea,
    handleControls,
  } = useChat()
  const { setLoading } = useLoading()
  const showToast = useToast()
  return (
    <CustomBackDrop bgColor='rgba(0,0,0,0.4)'>
      <Paper elevation={5}>
        <div className=' flex flex-col items-center justify-center flex-1 px-3 py-3'>
          <p className='text-base text-center text-darkGray-main pb-5 '>
            Establish chat with the user by sending request.
          </p>
          <div className='flex gap-4'>
            <Button
              variant='contained'
              color='mPink'
              sx={{ color: '#ffffff', minWidth: 120 }}
              onClick={() => {
                setChatRooms([])
                setHandleControls({ ...defaultChatControls, search: handleControls.search })
                setUpdateChatRooms(!updateChatRooms)
                setCreatePopUp({ isOpen: false })
              }}
            >
              Cancel
            </Button>
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
                  setHandleControls({ ...defaultChatControls, search: handleControls.search })
                  setUpdateChatRooms(!updateChatRooms)
                  setCreatePopUp({ isOpen: false })
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Paper>
    </CustomBackDrop>
  )
}

export default ChatRequestArea
