/* eslint-disable react-hooks/exhaustive-deps */
import CustomBackDrop from '@/components/CustomBackdrop'
import {
  ChatAreaType,
  ChatContextType,
  ChatPatientRoomData,
  defaultChatControls,
  useChat,
} from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { theme } from '@/context/ThemeProvider'
import { useToast } from '@/hooks/useToast'
import {
  deleteOfficeChatConversation,
  getOneOfficeChatConversation,
  updateOfficeChatConversation,
} from '@/lib/chat'
import socket from '@/socket/socket'
import { chatPatientHistory } from '@/socket/socket-functions'
import { SOCKET_STRING } from '@/socket/socket-string'
import { Button, IconButton, Paper } from '@mui/material'
import React, { useEffect } from 'react'

type Props = {}

const ChatAcceptRejectArea = (props: Props) => {
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const {
    setChatLoading,
    chatRoom,
    chatLoading,
    setChatArea,
    setMessageId,
    setInitialScroll,
    setChatRoom,
    currentUser,
    currentPage,
    setChatNotFound,
    setUpdateChatRooms,
    setChatRooms,
    setHandleControls,
  } = useChat()

  //Accept-RejectResponse
  useEffect(() => {
    const handleNewRoom = async (data: any) => {
      console.log('PRACTICE_OFFICE_UPDATE_ROOM_ACCEPT_OR_REJECT_RESPONSE')
      if (data.isAccepted) {
        setMessageId('')
        setInitialScroll(true)
        setChatLoading({ loading: true, loadingProps: { room: true } })
        const res = await getOneOfficeChatConversation(
          setLoading,
          chatRoom?._id as string,
          currentPage,
          showToast,
        )
        if (res) {
          const { message } = res as ChatPatientRoomData
          const messageLength = message?.reduce((acc, msgData) => acc + msgData?.records?.length, 0)
          setChatRoom({ ...res, dataLength: messageLength })
          console.log('room updated after tab click')
          setChatNotFound({
            notFoundStatus: false,
            notFoundProps: { room: true },
          })
        }
        setChatLoading({ loading: false, loadingProps: { room: true } })
      } else {
        setChatArea(ChatAreaType.List)
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_ACCEPT_OR_REJECT_RESPONSE, handleNewRoom)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_ACCEPT_OR_REJECT_RESPONSE, handleNewRoom)
    }
  }, [socket, setUpdateChatRooms])
  if (chatLoading.loading && chatLoading.loadingProps?.accept_reject) {
    return (
      <div className=' bg-white-main text-darkestGray-main px-2 flex-1 max-h-[68vh] min-h-[68vh] flex flex-col items-center justify-center gap-2   overflow-y-scroll chatScroll pb-1'>
        <p className='text-2xl'>Loading</p>
      </div>
    )
  } else {
    if (chatRoom?.createdBy !== currentUser.internalId) {
      return (
        <CustomBackDrop bgColor='rgba(0,0,0,0.4)'>
          <Paper elevation={5}>
            <div className=' bg-white-main text-darkestGray-main px-2 flex-1  flex flex-col items-center justify-center gap-2 pb-3 rounded-md'>
              <p className='text-base text-center text-darkGray-main pb-5'>
                Accept request to start conversation
              </p>
              <div className='flex justify-between gap-5'>
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
                      socket.emit(
                        SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_AFTER_ACCEPT_OR_REJECT,
                        {
                          orgUserIds: chatRoom?.orgUserIds,
                          orgUserInternalId: currentUser.internalId,
                          isAccepted: false,
                        },
                      )
                      setChatRooms([])
                      setHandleControls(defaultChatControls)
                      setChatArea(ChatAreaType.List)
                    }
                    setChatLoading({ loading: false, loadingProps: { accept_reject: false } })
                  }}
                  disabled={chatLoading.loading && chatLoading.loadingProps?.accept_reject}
                  sx={{
                    minWidth: '100px',
                  }}
                >
                  {chatLoading.loading && chatLoading.loadingProps?.accept_reject
                    ? 'Please wait'
                    : 'Cancel'}
                </Button>
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
                      socket.emit(
                        SOCKET_STRING.PRACTICE_OFFICE_UPDATE_ROOM_AFTER_ACCEPT_OR_REJECT,
                        {
                          orgUserIds: res?.orgUserIds,
                          orgUserInternalId: currentUser.internalId,
                          isAccepted: true,
                        },
                      )
                    } else {
                      setChatRooms([])
                      setHandleControls(defaultChatControls)
                      setChatArea(ChatAreaType.List)
                    }
                    setChatLoading({ loading: false, loadingProps: { accept_reject: false } })
                  }}
                  disabled={chatLoading.loading && chatLoading.loadingProps?.accept_reject}
                  sx={{
                    minWidth: '100px',
                  }}
                >
                  {chatLoading.loading && chatLoading.loadingProps?.accept_reject
                    ? 'Please wait'
                    : 'Confirm'}
                </Button>
              </div>
            </div>
          </Paper>
        </CustomBackDrop>
      )
    } else {
      return (
        <CustomBackDrop bgColor='rgba(0,0,0,0.4)'>
          <Paper elevation={2} sx={{ width: '90%' }}>
            <div className='rounded-md bg-white-main text-darkestGray-main px-2 flex-1  flex flex-col items-center justify-center gap-2 pb-1'>
              <p className='text-base text-center text-darkGray-main py-5'>
                The silence is palpable but lets wait for other party to accept your request..{' '}
              </p>
              <Button
                variant='contained'
                color='mPink'
                sx={{
                  // color: theme.palette.mMidBlue?.main,
                  minWidth: 'max-content',
                  alignSelf: 'end',
                  height: 20,
                  marginBottom: '10px',
                  marginRight: '5px',
                }}
                onClick={() => {
                  setChatArea(ChatAreaType.List)
                  setChatRooms([])
                  setChatRoom(undefined)
                }}
                disableRipple
              >
                Close
              </Button>
            </div>
          </Paper>
        </CustomBackDrop>
      )
    }
  }
}

export default ChatAcceptRejectArea
