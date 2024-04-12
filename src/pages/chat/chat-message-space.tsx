import React from 'react'
import ChatMessageItem from './chat-message-item'
import { ChatPatientRoomData, MessageData, useChat } from '@/context/ChatContext'
import { Button, CircularProgress, Divider } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import { formatMessageDate } from '@/socket/chat-time-function'
import Spinner from '@/components/spinner'
import ChatAcceptRejectArea from './chat-accept-reject-area'

type Props = {}

const ChatMessageSpace = (props: Props) => {
  const { chatRoom, messageLoading, currentUser, setChatLoading } = useChat()
  const { message, isConfirmed, createdBy } = chatRoom as ChatPatientRoomData
  return (
    <>
      {message && message.length !== 0 && (
        <div className=' max-h-[75%]  min-h-[75%] overflow-y-scroll qnaScroll pb-1' id='chat'>
          {messageLoading && (
            <div className='flex justify-center py-2 items-center gap-2  '>
              <CircularProgress
                size={16}
                thickness={10}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
              <p className='text-darkestGray-main font-bold'>loading...</p>
            </div>
          )}
          <div className='z-10   text-darkestGray-main px-2 flex-1  flex flex-col justify-end  gap-2 min-h-full '>
            {message.map((y: MessageData) => {
              return (
                <div key={Math.random()}>
                  <div className='flex items-center justify-center my-3 gap-5'>
                    <div className='flex-1 max-w-sm'>
                      <Divider />
                    </div>
                    <p>{formatMessageDate(y.messageDate)}</p>
                    <div className='flex-1 max-w-sm'>
                      <Divider />
                    </div>
                  </div>
                  {y.records.map((rec, i) => {
                    return (
                      <div key={Math.random()} id={rec._id} className='my-2'>
                        <ChatMessageItem
                          mes={rec}
                          right={rec.sentBy === String(currentUser?.internalId)}
                          selfId={''}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {message && message.length === 0 && isConfirmed && (
        <div className='z-10 bg-white-main text-darkestGray-main px-2 flex-1 max-h-[68vh] min-h-[68vh] flex flex-col items-center justify-center gap-2   overflow-y-scroll chatScroll pb-1'>
          <p className='text-4xl'>Start chat here!</p>
        </div>
      )}
      {message && message.length === 0 && !isConfirmed && <ChatAcceptRejectArea />}
      {!message && (
        <div className=' bg-white-main text-darkestGray-main px-2 flex-1  flex flex-col items-center justify-center gap-2  max-h-[68vh] min-h-[68vh] overflow-y-scroll chatScroll pb-1'>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default ChatMessageSpace
