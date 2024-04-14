/* eslint-disable react-hooks/exhaustive-deps */
import { ChatAreaType, useChat } from '@/context/ChatContext'
import { theme } from '@/context/ThemeProvider'
import { Drawer } from '@mui/material'
import ChatListArea from './chat-list-area'
import ChatMessageArea from './chat-message-area'
import { useLayoutEffect, useRef } from 'react'
import useOnlineStatus from '@/hooks/useOnline'
import Offline from '@/components/offline'
import { useDrawerWidth } from '@/components/DrawerWidth'

type Props = {}

const ChatDrawer = (props: Props) => {
  const {
    openChatDrawer,
    setNetworkStatus,
    networkStatus,
    handleCloseDrawer,
    chatArea,
    setChatArea,
    setChatRoom,
    setChatRooms,
  } = useChat()
  const online = useOnlineStatus()
  const firstUpdate = useRef(true)
  // online-offline
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (online) {
      setNetworkStatus(online)
      // window.location.reload()
    } else {
      setNetworkStatus(online)
    }
  }, [online])
  const drawerWidth = useDrawerWidth()
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
          maxWidth: '40%',
          minWidth: '40%',
          background: theme.palette.mLightGray?.main,
          px: 0,
        },
      }}
      sx={{
        '&.MuiDrawer-paper': {
          px: 0,
        },
      }}
    >
      {!networkStatus && <Offline />}

      {networkStatus && (
        <>
          {chatArea === ChatAreaType.List && <ChatListArea />}
          {chatArea === ChatAreaType.Message && <ChatMessageArea />}
        </>
      )}
    </Drawer>
  )
}

export default ChatDrawer
