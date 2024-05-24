/* eslint-disable no-extra-semi */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Popper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useRef } from 'react'

import { debounce } from 'lodash'
import { useLoading } from '@/context/LoadingContext'
import {
  ChatAreaType,
  ChatContextType,
  ChatPatientRoomData,
  ChatRoomType,
  useChat,
  defaultChatControls,
} from '@/context/ChatContext'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import { chatPatientHistory } from '@/socket/socket-functions'
import { theme } from '@/context/ThemeProvider'
import {
  createOfficeChatConversation,
  getOfficeUsers,
  getOneOfficeChatConversation,
} from '@/lib/chat'
import { useToast } from '@/hooks/useToast'

type Props = {}

const ChatRoomSearchInput = (props: Props) => {
  const searchRef = useRef<HTMLInputElement>()
  const { setChatRooms, setHandleControls, handleControls } = useChat()
  const delayedOfficeSearch = useRef(
    debounce((searchQuery) => {
      setChatRooms([])
      setHandleControls({
        ...defaultChatControls,
        currentPage: 1,
        search: searchQuery,
      })
    }, 500),
  ).current
  useEffect(() => {
    ;(searchRef?.current as HTMLInputElement).value = handleControls.search
  }, [handleControls.search])
  return (
    <TextField
      variant='outlined'
      size='small'
      fullWidth
      placeholder='Search by Name , Mobile# ,  . . . .'
      inputProps={{
        onChange: async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          delayedOfficeSearch((searchRef?.current as HTMLInputElement).value)
        },
      }}
      inputRef={searchRef}
    />
  )
}

export default ChatRoomSearchInput
