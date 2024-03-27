/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider } from '@mui/material'
import ChatList from './chat-list'
import { theme } from '@/context/ThemeProvider'
import { ChatAreaType, useChat } from '@/context/ChatContext'

type Props = {}

const ChatListArea = (props: Props) => {
  const { handleCloseDrawer, currentUser, setChatArea, setChatRooms, setChatRoom } = useChat()

  return (
    <>
      <div className={`flex justify-between items-center sticky top-0 px-1 py-1`} id='header'>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            fontSize: '1rem',

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
        {/* <Button
    variant='text'
    color='mMidBlue'
    sx={{
      color: theme.palette.mMidBlue?.main,
      minWidth: 'max-content',
      fontSize: '1rem',

      height: 20,
    }}
    disableRipple
    onClick={() => {}}
  >
    Done
  </Button> */}
      </div>
      <Divider />
      <div className='pr-1 pl-2 pt-5 pb-1'>
        <p className='text-xl pl-3 font-semibold '>Office Chat</p>
        <Divider
          sx={{ width: '90%', border: '1px solid', borderColor: theme.palette.mBlack?.main }}
        />
        <ChatList />
      </div>
    </>
  )
}

export default ChatListArea
