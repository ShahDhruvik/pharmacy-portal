/* eslint-disable react-hooks/exhaustive-deps */
import { ChatAreaType, ChatContextType, ChatPatientRoomData, useChat } from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import {
  deleteOfficeChatConversation,
  getOneOfficeChatConversation,
  updateOfficeChatConversation,
} from '@/lib/chat'
import socket from '@/socket/socket'
import { chatPatientHistory } from '@/socket/socket-functions'
import { SOCKET_STRING } from '@/socket/socket-string'
import { Button } from '@mui/material'
import React, { useEffect } from 'react'

type Props = {}

const ChatAcceptRejectArea = (props: Props) => {
  const {
    setChatLoading,
    chatRoom,
    chatLoading,
    setChatArea,
    setMessageId,
    setInitialScroll,
    setChatRoom,
    currentUser,
  } = useChat()
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  if (chatLoading.loading && chatLoading.loadingProps?.accept_reject) {
    return (
      <div className=' bg-white-main text-darkestGray-main px-2 flex-1 max-h-[68vh] min-h-[68vh] flex flex-col items-center justify-center gap-2   overflow-y-scroll chatScroll pb-1'>
        <p className='text-2xl'>Loading</p>
      </div>
    )
  } else {
    return (
      <div className=' bg-white-main text-darkestGray-main px-2 flex-1 max-h-[68vh] min-h-[68vh] flex flex-col items-center justify-center gap-2   overflow-y-scroll chatScroll pb-1'>
        <p className='text-2xl'>Accept request to start conversation</p>
        <div className='flex justify-between gap-5'>
          <Button
            color='mPink'
            onClick={async () => {
              setChatLoading({ loading: true, loadingProps: { accept_reject: true } })
              const res = await updateOfficeChatConversation(
                setLoading,
                chatRoom?._id as string,
                showToast,
              )
              if (res) {
                setMessageId('')
                setInitialScroll(true)
                setChatRoom(res)
                socket.emit(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_AFTER_ACCEPT_OR_REJECT, {
                  orgUserIds: res?.orgUserIds,
                  orgUserInternalId: currentUser.internalId,
                  isAccepted: true,
                })
              } else {
                setChatArea(ChatAreaType.List)
              }
              setChatLoading({ loading: false, loadingProps: { accept_reject: false } })
            }}
            disabled={chatLoading.loading && chatLoading.loadingProps?.accept_reject}
          >
            {chatLoading.loading && chatLoading.loadingProps?.accept_reject
              ? 'Please wait'
              : 'Accept'}
          </Button>
          <Button
            color='mPink'
            onClick={async () => {
              setChatLoading({ loading: true, loadingProps: { accept_reject: true } })
              const res = await deleteOfficeChatConversation(
                setLoading,
                chatRoom?._id as string,
                showToast,
              )
              if (res) {
                socket.emit(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_AFTER_ACCEPT_OR_REJECT, {
                  orgUserIds: chatRoom?.orgUserIds,
                  orgUserInternalId: currentUser.internalId,
                  isAccepted: false,
                })
                setChatArea(ChatAreaType.List)
              }
              setChatLoading({ loading: false, loadingProps: { accept_reject: false } })
            }}
            disabled={chatLoading.loading && chatLoading.loadingProps?.accept_reject}
          >
            {chatLoading.loading && chatLoading.loadingProps?.accept_reject
              ? 'Please wait'
              : 'Reject'}
          </Button>
        </div>
      </div>
    )
  }
}

export default ChatAcceptRejectArea
