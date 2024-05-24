/* eslint-disable react-hooks/exhaustive-deps */
import { ClickAwayListener, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import EditIcon from '@mui/icons-material/Edit'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { MessageData, useChat } from '@/context/ChatContext'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  MessageActions,
  PracticeOfficeMessageTypeEnum,
  PracticePatientChatUserTypeEnum,
} from '@/utils/constants'
import { useToast } from '@/hooks/useToast'
import { theme } from '@/context/ThemeProvider'
import { messageUpdate } from '@/socket/socket-functions'

type Props = {}

const ChatMessageInput = (props: Props) => {
  const showToast = useToast()
  const {
    chatRoom,
    setIsTyping,
    currentUser,
    setIsMessageEdit,
    setMessageActionType,
    setParticularMessage,
    isMessageEdit,
    messageActionType,
    particularMessage,
    setChatRoom,
  } = useChat()
  // Typing
  const handleTyping = () => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_TYPING, chatRoom?._id)
  }
  const handleStopTyping = () => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_STOP_TYPING, chatRoom?._id)
  }
  useEffect(() => {
    const handleRoomWhenTyping = (chatId: string) => {
      console.log('PRACTICE_OFFICE_TYPING_RESPONSE')
      setIsTyping({ id: chatId, typing: true })
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_TYPING_RESPONSE, handleRoomWhenTyping)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_TYPING_RESPONSE, handleRoomWhenTyping)
    }
  }, [setIsTyping, handleTyping])
  useEffect(() => {
    const handleRoomWhenStopTyping = (chatId: string) => {
      console.log('PRACTICE_OFFICE_STOP_TYPING_RESPONSE')
      setIsTyping({ id: chatId, typing: false })
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_STOP_TYPING_RESPONSE, handleRoomWhenStopTyping)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_STOP_TYPING_RESPONSE, handleRoomWhenStopTyping)
    }
  }, [setIsTyping, handleStopTyping])

  //Form
  const { control, handleSubmit, setValue, reset, formState, register, watch } = useForm<{
    message: string
  }>({
    defaultValues: {
      message: '',
    },
  })
  const mW = watch('message')
  const handleMessageActionSuccess = () => {
    // setMessageActionLoading(false);
    setIsMessageEdit({ id: '', edit: false })
    reset({ message: '' })
    setMessageActionType(undefined)
    setParticularMessage(undefined)
  }
  //update
  const updateThisMessage = (messageId: string, message: string) => {
    // setMessageActionLoading(true)
    messageUpdate(
      messageId,
      currentUser?.internalId,
      chatRoom?.orgUserIds as string[],
      chatRoom?._id as string,
      message,
    )
  }
  //Update
  useEffect(() => {
    const handleUpdate = (data: any) => {
      console.log('PRACTICE_OFFICE_UPDATED_MESSAGE')
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
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_UPDATED_MESSAGE, handleUpdate)
    }
  }, [socket, chatRoom])
  //onSubmit
  const onSubmitHandle: SubmitHandler<{ message: string }> = async (data: any) => {
    if (isMessageEdit?.edit) {
      updateThisMessage(isMessageEdit.id, data?.message)
    } else {
      if (chatRoom) {
        if (data.message !== '') {
          socket.emit(SOCKET_STRING.PRACTICE_OFFICE_READ_NEW_MESSAGE, {
            practiceOfficeChatConversationId: chatRoom?._id,
            createdAt: new Date().toISOString(),
            message: data.message,
            type: PracticeOfficeMessageTypeEnum.message,
            sentBy: String(currentUser?.internalId),
          })

          reset()
        }
      } else {
        setValue('message', '')
        showToast('error', 'There is some error while sending.')
      }
    }
  }
  useEffect(() => {
    if (messageActionType === MessageActions.Edit) {
      reset({ message: particularMessage?.message })
      setIsMessageEdit({ id: particularMessage?._id as string, edit: true })
      setParticularMessage(undefined)
      setMessageActionType(undefined)
    }
  }, [messageActionType])
  useEffect(() => {
    if (mW === '') {
      setIsMessageEdit({ id: '', edit: false })
    }
  }, [mW])
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (isMessageEdit.edit) {
          setIsMessageEdit({ id: '', edit: false })
          reset({ message: '' })
        }
      }}
    >
      <div className='py-2'>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <TextField
            fullWidth
            placeholder='Type here...'
            InputProps={{
              endAdornment: (
                <IconButton type='submit'>
                  {isMessageEdit.edit ? (
                    <EditIcon sx={{ color: theme.palette.mDarkBlue?.main }} />
                  ) : (
                    <SendIcon sx={{ color: theme.palette.mDarkBlue?.main }} />
                  )}
                </IconButton>
              ),
            }}
            sx={{
              '.MuiOutlinedInput-root': { pr: 0 },
            }}
            inputProps={register('message', { onBlur: handleStopTyping })}
            onKeyDown={handleTyping}
          />
        </form>
      </div>
    </ClickAwayListener>
  )
}

export default ChatMessageInput
