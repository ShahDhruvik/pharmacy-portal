/* eslint-disable react-hooks/exhaustive-deps */
import { ChatAreaType, useChat } from '@/context/ChatContext'
import { theme } from '@/context/ThemeProvider'
import { Drawer } from '@mui/material'
import ChatListArea from './chat-list-area'
import ChatMessageArea from './chat-message-area'

type Props = {}

const ChatDrawer = (props: Props) => {
  const { openChatDrawer, handleCloseDrawer, chatArea, setChatArea, setChatRoom, setChatRooms } =
    useChat()

  return (
    <Drawer
      open={openChatDrawer}
      onClose={() => {
        handleCloseDrawer()
        setChatArea(ChatAreaType.List)
        setChatRoom(undefined)
        setChatRooms([])
      }}
      anchor='right'
      PaperProps={{
        sx: {
          maxWidth: '30%',
          minWidth: '30%',
          background: theme.palette.mLightGray?.main,
        },
      }}
    >
      {chatArea === ChatAreaType.List && <ChatListArea />}
      {chatArea === ChatAreaType.Message && <ChatMessageArea />}
    </Drawer>
  )
}

export default ChatDrawer
