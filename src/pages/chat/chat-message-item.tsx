import {
  Avatar,
  Box,
  ClickAwayListener,
  Dialog,
  List,
  ListItemButton,
  Paper,
  Button,
  Popover,
  IconButton,
  Popper,
} from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { MessageData, useChat } from '@/context/ChatContext'
import { MessageActions } from '@/utils/constants'
import { formatCreatedAt } from '@/socket/chat-time-function'
import { theme } from '@/context/ThemeProvider'

export const MessageActionSvGs: Record<string, any> = {
  [MessageActions.Delete]: (
    <DeleteIcon
      sx={{
        fontSize: '20px',
      }}
    />
  ),
}
const ChatMessageItem = ({
  mes,
  right,
  noAvatar,
  selfId,
}: {
  mes: MessageData['records'][0]
  right?: boolean
  noAvatar?: boolean
  selfId?: string
}) => {
  const { setIsConfirmPopUp, setMessageActionType, setParticularMessage } = useChat()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null)
    }
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleActions = (type: MessageActions, message: MessageData['records'][0]) => {
    if (type === MessageActions.Delete) {
      setMessageActionType(type)
      setParticularMessage(message)
      setIsConfirmPopUp(true)
    }
  }
  if (right) {
    return (
      <div className={`flex flex-col justify-end `}>
        <div className='flex justify-end items-center mr-[15px] relative'>
          <p className='self-end text-sm font-semibold italic'>
            {mes.createdAt ? formatCreatedAt(mes.createdAt) : ''}
          </p>
          {selfId === String(mes.practiceOfficeChatConversationId) && (
            <IconButton
              onClick={handleOpenMenu}
              className='relative'
              sx={{
                p: 0,
              }}
            >
              <MoreVertIcon sx={{ fontSize: '17px' }} />
            </IconButton>
          )}
          <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <Paper
                sx={{
                  position: 'absolute',
                  right: '20px',
                  bottom: '5px',
                  minWidth: '30%',
                  px: 1,
                }}
                elevation={5}
              >
                <List disablePadding>
                  {Object.keys(MessageActions).map((x) => {
                    return (
                      <ListItemButton
                        onClick={() => {
                          handleActions(MessageActions.Delete, mes)
                        }}
                        key={(MessageActions as any)[x]}
                        sx={{
                          '&.MuiListItemButton-root': {
                            px: 0,
                            ':hover': { color: theme.palette.primary.main },
                          },
                        }}
                        divider
                      >
                        <div className='flex items-center gap-2 justify-start'>
                          {MessageActionSvGs[(MessageActions as any)[x]]}
                          <p className='font-bold'>{(MessageActions as any)[x]}</p>
                        </div>
                      </ListItemButton>
                    )
                  })}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <div
            className='bg-midGray-dark  px-3 py-1 rounded-md rounded-br-none  font-semibold max-w-xl'
            style={{ wordWrap: 'break-word' }}
          >
            <p className='flex-1 '>{mes.message}</p>
          </div>
          {/* <div className="self-end">
            {!noAvatar ? (
              <Avatar
                src={"https://www.w3schools.com/howto/img_avatar.png"}
                sx={{ width: 30, height: 30, cursor: "pointer" }}
              />
            ) : (
              <Box sx={{ width: 30, height: 30 }} />
            )}
          </div> */}
        </div>
      </div>
    )
  } else {
    return (
      <div className={`flex flex-col  justify-start `}>
        <p className='self-start ml-[7px] text-sm font-semibold italic'>{` ${
          mes.createdAt ? formatCreatedAt(mes.createdAt) : ''
        }`}</p>
        <div className='flex items-center justify-start gap-3'>
          {/* <div className="self-end">
            {!noAvatar ? (
              <Avatar
                src={""}
                sx={{ width: 30, height: 30, cursor: "pointer" }}
                alt=""
              />
            ) : (
              <Box sx={{ width: 30, height: 30 }} />
            )}
          </div> */}
          <div
            className='bg-gray-main px-3 py-1 rounded-md rounded-br-none  font-semibold max-w-xl'
            style={{ wordWrap: 'break-word' }}
          >
            <p className='flex-1 '>{mes.message}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatMessageItem
