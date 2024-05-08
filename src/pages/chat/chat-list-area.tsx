/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider } from '@mui/material'
import ChatList from './chat-list'
import { theme } from '@/context/ThemeProvider'
import { ChatAreaType, useChat } from '@/context/ChatContext'
import ChatRoomSearchInput from './chat-search-input'
import ChatRequestArea from './chat-request-area'

type Props = {}

const ChatListArea = (props: Props) => {
  const { handleCloseDrawer, currentUser, setChatArea, setChatRooms, setChatRoom, createPopUp } =
    useChat()

  return (
    <>
      <div className={`flex justify-end items-center sticky top-0 px-1 py-1`} id='header'>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            height: 20,
          }}
          onClick={() => {
            handleCloseDrawer()
            setChatArea(ChatAreaType.List)
            setChatRooms([])
            setChatRoom(undefined)
          }}
          disableRipple
        >
          Done
        </Button>
      </div>
      {!createPopUp.isOpen && (
        <div className='pb-1'>
          <p className='text-darkBlue-main font-semibold'>Office Chat</p>
          <Divider sx={{ mb: 2 }} />
          <ChatRoomSearchInput />
          <ChatList />
        </div>
      )}

      {createPopUp.isOpen && <ChatRequestArea />}
    </>
  )
}

export default ChatListArea
