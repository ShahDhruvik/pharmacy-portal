/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { useChat } from '@/context/ChatContext'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PracticeOfficeMessageTypeEnum, PracticePatientChatUserTypeEnum } from '@/utils/constants'
import { useToast } from '@/hooks/useToast'

type Props = {}

const ChatMessageInput = (props: Props) => {
  const showToast = useToast()
  const { chatRoom, setIsTyping, currentUser } = useChat()
  // Typing
  const handleTyping = () => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_TYPING, chatRoom?._id)
  }
  const handleStopTyping = () => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_STOP_TYPING, chatRoom?._id)
  }
  useEffect(() => {
    const handleRoomWhenTyping = (chatId: string) => {
      setIsTyping({ id: chatId, typing: true })
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_TYPING_RESPONSE, handleRoomWhenTyping)
  }, [setIsTyping, handleTyping])
  useEffect(() => {
    const handleRoomWhenStopTyping = (chatId: string) => {
      setIsTyping({ id: chatId, typing: false })
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_STOP_TYPING_RESPONSE, handleRoomWhenStopTyping)
  }, [setIsTyping, handleStopTyping])

  //Form
  const { control, handleSubmit, setValue, reset, formState, register } = useForm<{
    message: string
  }>({
    defaultValues: {
      message: '',
    },
  })
  const { isSubmitting } = formState
  //onSubmit
  const onSubmitHandle: SubmitHandler<{ message: string }> = async (data: any) => {
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
  return (
    <div className='m-2 p-2 rounded-lg shadow-cardShadow '>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <TextField
          fullWidth
          placeholder='Type here...'
          InputProps={{
            endAdornment: (
              <IconButton type='submit'>
                <SendIcon />
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
  )
}

export default ChatMessageInput
