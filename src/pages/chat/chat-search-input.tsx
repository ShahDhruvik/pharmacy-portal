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
  const { setLoading } = useLoading()
  const showToast = useToast()
  const searchRef = useRef<HTMLInputElement>()
  const {
    setChatLoading,
    setMessageId,
    setChatRooms,
    chatRooms,
    setInitialScroll,
    currentPage,
    currentUser,
    setChatNotFound,
    chatRoom,
    setCurrentPage,
    setCount,
    setChatRoom,
    setChatOfficeUsers,
    setAnchorElSearchInput,
    chatOfficeUsers,
    anchorElSearchInput,
    setUpdateChatRooms,
    setChatArea,
  } = useChat()
  //search
  const getOrgUserList = async (val: string) => {
    const res = await getOfficeUsers(setLoading, val, showToast)
    console.log(res)
    if (res?.length !== 0) {
      setChatOfficeUsers(res)
    } else {
      if (val?.length === 0) {
        setChatOfficeUsers([])
      } else {
        setChatOfficeUsers([
          {
            email: 'email',
            id: 1,
            internalId: 'asas',
            name: 'No such user found',
            existChat: null,
            phone: 'qwq',
            notFound: true,
          },
        ])
      }
    }
  }
  const delayedOfficeSearch = useRef(
    debounce((searchQuery) => {
      getOrgUserList(searchQuery as string)
    }, 500),
  ).current

  //joinRoom
  const joinRoomEmit = (chatConversationId: string) => {
    console.log('room called join fnc ::::')
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_JOIN_ROOM, chatConversationId)
  }
  const afterClickingRoom = (countCondition: boolean, x: ChatContextType['chatRooms'][0]) => {
    if (countCondition) {
      chatPatientHistory({
        practiceOfficeChatConversationId: x?._id,
        lastSeen: new Date().toISOString(),
        practiceOfficeLastSeenMessageId: x?.lastMessage?._id,
        orgUserId: String(currentUser?.internalId),
      })
      setMessageId(x?.lastSeenMessage ? x?.lastSeenMessage?._id : '')
    } else {
      setMessageId('')
    }
  }
  useEffect(() => {
    const handleRoomEntering = async (chatConversationId: string) => {
      console.log('room called entering fnc ::::')
      setChatLoading({ loading: true, loadingProps: { room: true } })
      const res = await getOneOfficeChatConversation(
        setLoading,
        chatConversationId,
        currentPage,
        showToast,
      )
      if (res) {
        const { message } = res as ChatPatientRoomData
        const messageLength = message?.reduce((acc, msgData) => acc + msgData?.records?.length, 0)
        setChatRoom({ ...(res as ChatPatientRoomData), dataLength: messageLength })
        console.log('room updated after tab click')
        setChatNotFound({
          notFoundStatus: false,
          notFoundProps: { room: true },
        })
      } else {
        setChatNotFound({
          notFoundStatus: true,
          notFoundProps: { room: true },
        })
      }
      setChatLoading({ loading: false, loadingProps: { room: true } })
      setChatOfficeUsers([])
      setChatArea(ChatAreaType.Message)
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_ENTERED_ROOM, handleRoomEntering)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_ENTERED_ROOM, handleRoomEntering)
    }
  }, [socket, chatRoom])
  //Last seen
  useEffect(() => {
    if (chatRoom) {
      const handleOnline = (data: any) => {
        setChatRoom({ ...chatRoom, lastSeen: data })
      }
      socket.on(SOCKET_STRING.PRACTICE_OFFICE_UPDATE_LAST_SEEN, handleOnline)
    }
  }, [socket, chatRoom])
  return (
    <>
      <TextField
        variant='outlined'
        size='small'
        fullWidth
        placeholder='Search by Name , Mobile# ,  . . . .'
        inputProps={{
          onChange: async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setAnchorElSearchInput(searchRef?.current as HTMLInputElement)
            delayedOfficeSearch((searchRef?.current as HTMLInputElement).value)
          },
        }}
        inputRef={searchRef}
      />
      <Popper
        open={Boolean(anchorElSearchInput) && chatOfficeUsers.length > 0}
        anchorEl={anchorElSearchInput}
        sx={{ zIndex: theme.zIndex.drawer + 1, minWidth: '39%' }}
      >
        <Paper elevation={1} sx={{ minWidth: '100%' }}>
          <List disablePadding>
            {chatOfficeUsers.map((x) => {
              return (
                <ListItemButton
                  divider
                  key={x.internalId}
                  onClick={async () => {
                    if (x.existChat === null && !x.notFound) {
                      const res = await createOfficeChatConversation(
                        setLoading,
                        x?.internalId,
                        showToast,
                      )
                      if (res) {
                        console.log(res, 'create room')
                        const emitData = {
                          data: { ...res?.data?.data?.data },
                          orgUserInternalId: currentUser?.internalId,
                        }
                        console.log(emitData)
                        socket.emit(SOCKET_STRING.PRACTICE_OFFICE_ADD_ROOM, emitData)
                        setUpdateChatRooms((prev) => !prev)
                        if (searchRef.current) {
                          // eslint-disable-next-line no-extra-semi
                          ;(searchRef?.current as HTMLInputElement).value = ''
                        }
                        setChatOfficeUsers([])
                      }
                    } else {
                      if (chatRoom?._id !== x?.existChat?._id) {
                        setCurrentPage(1)
                        setCount(0)
                        setChatRoom(undefined)
                        joinRoomEmit(x?.existChat?._id as string)
                        const findRoom = chatRooms?.find((fr) => fr._id === x?.existChat?._id)
                        afterClickingRoom(false, findRoom as ChatRoomType)
                      } else {
                        if (searchRef.current) {
                          // eslint-disable-next-line no-extra-semi
                          ;(searchRef?.current as HTMLInputElement).value = ''
                        }
                        setChatOfficeUsers([])
                      }
                    }
                  }}
                >
                  <ListItemText
                    primary={x.name}
                    sx={{
                      ...(x.notFound && { color: theme.palette.error.main }),
                    }}
                  />
                  {x.existChat === null && !x.notFound && (
                    <ListItemText
                      primary={'+'}
                      sx={{
                        flexGrow: 0,
                        color: theme.palette.primary.main,
                      }}
                    />
                  )}
                </ListItemButton>
              )
            })}
          </List>
        </Paper>
      </Popper>
    </>
  )
}

export default ChatRoomSearchInput
