import { ClickAwayListener, IconButton, List, ListItemButton, Paper, Popper } from '@mui/material'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { MessageData, useChat } from '@/context/ChatContext'
import { MessageActions, individualMessageAction } from '@/utils/constants'
import { formatCreatedAt } from '@/socket/chat-time-function'
import { theme } from '@/context/ThemeProvider'
import { EnumValues } from '@/types/common'

export const MessageActionSvGs: Record<string, any> = {
  [MessageActions.Delete]: (
    <DeleteIcon
      sx={{
        fontSize: '20px',
      }}
    />
  ),
  [MessageActions.Edit]: (
    <EditIcon
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
  const { setIsConfirmPopUp, setMessageActionType, setParticularMessage, chatRoom } = useChat()
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
    if (type === MessageActions.Edit) {
      setMessageActionType(type)
      setParticularMessage(message)
      // setIsConfirmPopUp(true)
    }
  }
  const userName =
    (chatRoom?.orgUsers && chatRoom?.orgUsers.length > 0 ? chatRoom?.orgUsers[0]?.name : '') ?? ''
  if (right) {
    return (
      <div className={`flex flex-col justify-end my-2`}>
        <div className='flex justify-end items-center  relative'>
          <p className='self-end text-[10px] mr-5'>
            {mes.createdAt ? formatCreatedAt(mes.createdAt) : ''}
          </p>
        </div>
        <div className='flex items-start justify-end'>
          <div
            className='bg-darkBlue-main text-white-main text-xs px-3 py-1 rounded-md rounded-br-none max-w-[260px]'
            style={{ wordWrap: 'break-word' }}
          >
            <p className='flex-1 '>{mes.message}</p>
          </div>
          <IconButton
            onClick={handleOpenMenu}
            className='relative'
            sx={{
              p: 0,
            }}
          >
            <MoreVertIcon sx={{ fontSize: '17px' }} />
          </IconButton>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            sx={{ zIndex: theme.zIndex.drawer + 1 }}
          >
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
                <List disablePadding sx={{ minWidth: '150px' }}>
                  {Object.keys(MessageActions).map((x) => {
                    if (
                      individualMessageAction.includes(
                        (MessageActions as Record<string, string>)[x] as EnumValues<
                          typeof MessageActions
                        >,
                      )
                    ) {
                      return (
                        <ListItemButton
                          onClick={() => {
                            handleActions(
                              (MessageActions as Record<string, string>)[x] as MessageActions,
                              mes,
                            )
                          }}
                          key={(MessageActions as Record<string, string>)[x]}
                          sx={{
                            '&.MuiListItemButton-root': {
                              px: 1,
                              py: '3px',
                            },
                            minWidth: '100%',
                          }}
                          divider
                        >
                          <div className='flex items-center gap-2 justify-start'>
                            {MessageActionSvGs[(MessageActions as Record<string, string>)[x]]}
                            <p>{(MessageActions as Record<string, string>)[x]}</p>
                          </div>
                        </ListItemButton>
                      )
                    }
                  })}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`flex flex-col  justify-start my-2`}>
        <div className='flex justify-start items-center  relative'>
          <p className='self-start text-[10px]'>{` ${
            mes.createdAt ? formatCreatedAt(mes.createdAt) : ''
          }`}</p>
        </div>
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
            className='bg-lightGray-main text-xs px-3 py-1 rounded-md rounded-br-none max-w-[260px]'
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
