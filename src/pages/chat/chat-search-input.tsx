/* eslint-disable no-extra-semi */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { useChat, defaultChatControls } from '@/context/ChatContext'

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
