/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Button, Divider, TextField } from '@mui/material'
import ChatList from './chat-list'
import { theme } from '@/context/ThemeProvider'
import { ChatAreaType, ChatContextType, defaultChatControls, useChat } from '@/context/ChatContext'
import ChatRoomSearchInput from './chat-search-input'
import ChatRequestArea from './chat-request-area'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import { ListItemDropdown, listBoxPropsDropdown } from '@/components/SelectInput'
import { dropdownOrg } from '@/lib/DropDownApis'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { useEffect } from 'react'

type Props = {}

const ChatListArea = (props: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const {
    handleCloseDrawer,
    currentUser,
    orgList,
    setChatArea,
    setChatRooms,
    setChatRoom,
    createPopUp,
    currentOrg,
    setOrgList,
    openChatDrawer,
    setCurrentUser,
    setCurrentOrg,
    setHandleControls,
    setUpdateChatRooms,
    updateChatRooms,
    setCreatePopUp,
  } = useChat()
  const drpOrg = async () => {
    const res = await dropdownOrg(setLoading, showToast, undefined, true)
    if (res) {
      setOrgList(res as any[])
    }
  }
  useEffect(() => {
    if (openChatDrawer) {
      drpOrg()
    }
  }, [openChatDrawer])
  return (
    <div className='w-full h-full'>
      <div
        className={`flex justify-end items-center sticky top-0 px-1 py-1 bg-white-main z-50`}
        id='header'
      >
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
            setHandleControls(defaultChatControls)
            setCreatePopUp({ isOpen: false })
          }}
          disableRipple
        >
          Done
        </Button>
      </div>
      <div className='pb-1 '>
        <p className='text-darkBlue-main font-semibold'>Office Chat</p>
        <Divider sx={{ mb: 2 }} />
        <Autocomplete
          disableClearable
          onChange={(e, val) => {
            localStorage.setItem('org', JSON.stringify(val))
            localStorage.setItem('user', JSON.stringify(val?.organizationUser))
            setCurrentOrg(val)
            setCurrentUser(val?.organizationUser)
            setChatRooms([])
            setHandleControls(defaultChatControls)
            setUpdateChatRooms(!updateChatRooms)
          }}
          options={orgList}
          value={currentOrg}
          getOptionLabel={(options) => options?.name}
          sx={{ my: 1 }}
          renderInput={(params) => {
            return (
              <TextField {...params} placeholder={`Select Organization`} label={'Organization'} />
            )
          }}
          ListboxProps={listBoxPropsDropdown()}
          renderOption={(props, option) =>
            ListItemDropdown(props, option, currentOrg.id, false, 13)
          }
          isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
          popupIcon={
            <ArrowCircleDownOutlinedIcon
              sx={{ width: 24, height: 24, fill: theme.palette.mDarkGray?.main }}
            />
          }
        />
        <ChatRoomSearchInput />
        <ChatList />
      </div>
      {createPopUp.isOpen && <ChatRequestArea />}
    </div>
  )
}

export default ChatListArea
