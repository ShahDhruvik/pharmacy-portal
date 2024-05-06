/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CustomBackDrop from '@/components/CustomBackdrop'
import { ChatPatientRoomData, MessageData, useChat } from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { theme } from '@/context/ThemeProvider'
import { useToast } from '@/hooks/useToast'
import { clearOfficeChatConversation } from '@/lib/chat'
import socket from '@/socket/socket'
import { messageDelete, messageUpdate } from '@/socket/socket-functions'
import { SOCKET_STRING } from '@/socket/socket-string'
import { COMMON_MESSAGE, VALIDATION_MESSAGE } from '@/utils/commonMessages'
import { MessageActions } from '@/utils/constants'
import { Button, CircularProgress, Paper, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const ChatBoxActionConfirmation = (props: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { control, register, trigger, formState, watch } = useForm({
    defaultValues: {
      message: '',
    },
  })
  const { errors } = formState
  const mesW = watch('message')
  const {
    messageActionLoading,
    setIsConfirmPopUp,
    setParticularMessage,
    setMessageActionType,
    setMessageActionLoading,
    messageActionType,
    particularMessage,
    chatRoom,
    setChatRoom,
    currentUser,
    setChatLoading,
  } = useChat()
  const handleClose = () => {
    setIsConfirmPopUp(false)
    setParticularMessage(undefined)
    setMessageActionType(undefined)
  }
  //delete
  const deleteThisMessage = (messageId: string) => {
    setMessageActionLoading(true)
    messageDelete(
      messageId,
      currentUser?.internalId,
      chatRoom?.orgUserIds as string[],
      chatRoom?._id as string,
    )
  }
  //update
  const updateThisMessage = (messageId: string) => {
    setMessageActionLoading(true)
    messageUpdate(
      messageId,
      currentUser?.internalId,
      chatRoom?.orgUserIds as string[],
      chatRoom?._id as string,
      mesW,
    )
  }
  const handleConfirm = async () => {
    if (messageActionType === MessageActions.Delete) {
      deleteThisMessage((particularMessage as MessageData['records'][0])._id as string)
    }
    if (messageActionType === MessageActions.Edit) {
      const tig = await trigger('message')
      if (tig) {
        updateThisMessage((particularMessage as MessageData['records'][0])._id as string)
      }
    }
    if (messageActionType === MessageActions.ClearChatMessages) {
      setChatLoading({ loading: true, loadingProps: { room: true } })
      const res = await clearOfficeChatConversation(setLoading, chatRoom?._id as string, showToast)
      if (res) {
        setChatRoom({ ...chatRoom, message: [] } as ChatPatientRoomData)
      }
      socket.emit(SOCKET_STRING.PRACTICE_OFFICE_MESSAGES_CLEAR, {
        currentUserId: currentUser?.internalId,
        orgUserIds: chatRoom?.orgUserIds,
        practiceOfficeChatConversationId: chatRoom?._id,
      })
      setChatLoading({
        loading: false,
        loadingProps: { room: false },
      })
      handleMessageActionSuccess()
    }
  }
  //Handle close on message action success
  const handleMessageActionSuccess = () => {
    setMessageActionLoading(false)
    setIsConfirmPopUp(false)
    setMessageActionType(undefined)
    setParticularMessage(undefined)
  }
  //Delete
  useEffect(() => {
    const handleDelete = (data: any) => {
      if (chatRoom && data && !data.isActive && data.isDeleted) {
        const mesDateFromBk = new Date(data.createdAt)
        const dateThatHasMessage = chatRoom?.message
          ?.map((mesD) => {
            const mesDate = new Date(mesD.messageDate)
            if (
              mesDate.getDate() === mesDateFromBk.getDate() &&
              mesDate.getMonth() === mesDateFromBk.getMonth() &&
              mesDate.getFullYear() === mesDateFromBk.getFullYear()
            ) {
              const updateMessagesToDelete = mesD.records.filter((delM) => delM._id !== data?._id)
              if (updateMessagesToDelete.length > 0) {
                return { ...mesD, records: updateMessagesToDelete }
              }
            } else {
              return mesD
            }
          })
          .filter(Boolean)
        if (dateThatHasMessage)
          setChatRoom({
            ...chatRoom,
            message: dateThatHasMessage as MessageData[],
          })
        handleMessageActionSuccess()
      } else {
        handleMessageActionSuccess()
        console.log('something wrong message delete functionality.')
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_DELETED_MESSAGE, handleDelete)
  }, [socket, chatRoom])
  //Update
  useEffect(() => {
    const handleUpdate = (data: any) => {
      console.log('message update')
      if (chatRoom && data && data.isActive && !data.isDeleted) {
        const mesDateFromBk = new Date(data.createdAt)
        const dateThatHasMessage = chatRoom?.message?.map((mesD) => {
          const mesDate = new Date(mesD.messageDate)
          if (
            mesDate.getDate() === mesDateFromBk.getDate() &&
            mesDate.getMonth() === mesDateFromBk.getMonth() &&
            mesDate.getFullYear() === mesDateFromBk.getFullYear()
          ) {
            const updateMessagesToDelete = mesD.records.map((delM) => {
              if (delM._id === data?._id) {
                return { ...delM, message: data.message }
              } else {
                return delM
              }
            })
            if (updateMessagesToDelete.length > 0) {
              return { ...mesD, records: updateMessagesToDelete }
            }
          } else {
            return mesD
          }
        })
        setChatRoom({
          ...chatRoom,
          message: dateThatHasMessage as MessageData[],
        })
        handleMessageActionSuccess()
      } else {
        handleMessageActionSuccess()
        console.log('something wrong message delete functionality.')
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATED_MESSAGE, handleUpdate)
  }, [socket, chatRoom])
  return (
    <CustomBackDrop bgColor='#ffffff'>
      <div className='relative flex-1 flex flex-col items-center justify-center min-h-[560px]   border-l-[1px] border-darkestGray-main border-opacity-30 '>
        {messageActionLoading && (
          <CustomBackDrop bgColor='#ffffff'>
            <div className=' flex-1 flex flex-col items-center justify-center '>
              <CircularProgress
                sx={{ color: theme.palette.primary.main }}
                size={30}
                thickness={2}
              />
              <p className='text-darkestGray-main mt-2'>Performing chat room action for you!</p>
            </div>
          </CustomBackDrop>
        )}
        <Paper elevation={5} sx={{ p: 2 }}>
          <div className='flex flex-col items-center justify-center flex-1 px-3'>
            <p className='text-base text-center mb-5'>
              {messageActionType === MessageActions.Delete &&
                `Are you sure you want to delete this message?`}
              {messageActionType === MessageActions.Edit &&
                `Are you sure you want to edit this message?`}
              {messageActionType === MessageActions.ClearChatMessages &&
                `Are you sure you want to clear all messages?`}
            </p>
            {messageActionType === MessageActions.Edit && (
              <TextField
                inputProps={{
                  ...register('message', {
                    required: VALIDATION_MESSAGE.required,
                    onChange: () => {
                      trigger('message')
                    },
                  }),
                }}
                error={errors.message ? true : false}
                helperText={errors.message?.message ?? ''}
              />
            )}
            <div className='flex gap-4 my-4'>
              <Button color='mPink' sx={{ minWidth: '100px' }} onClick={handleClose}>
                Cancel
              </Button>
              <Button color='mPink' sx={{ minWidth: '100px' }} onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </CustomBackDrop>
  )
}

export default ChatBoxActionConfirmation
