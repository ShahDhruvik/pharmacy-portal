/* eslint-disable react-hooks/exhaustive-deps */
import { ChatAreaType, useChat } from '@/context/ChatContext'
import { theme } from '@/context/ThemeProvider'
import { Drawer } from '@mui/material'
import ChatListArea from './chat-list-area'
import ChatMessageArea from './chat-message-area'
import { useEffect, useLayoutEffect, useRef } from 'react'
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
  useEffect(() => {
    return () => {
      console.log('exist chat')
      setChatRoom(undefined)
      setChatRooms([])
      localStorage.removeItem('lasVisitedChatConversationId')
    }
  }, [])
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
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          px: '10px',
          backgroundColor: theme.palette.mWhite?.main,
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
