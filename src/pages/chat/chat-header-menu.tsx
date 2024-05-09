import { ListItemButton, Paper, Popper, List, ClickAwayListener } from '@mui/material'
import React from 'react'

import { MessageActionSvGs } from './chat-message-item'
import { useChat } from '@/context/ChatContext'
import { useLoading } from '@/context/LoadingContext'
import { MessageActions, groupMessageAction } from '@/utils/constants'
import { EnumValues } from '@/types/common'
import { theme } from '@/context/ThemeProvider'
type Props = {}

const ChatHeaderMenu = (props: Props) => {
  const {
    setAnchorElMenuHeader,
    anchorElMenuHeader,
    chatRoom,
    setChatRoom,
    setChatLoading,
    chatLoading,
    setMessageActionType,
    setIsConfirmPopUp,
  } = useChat()
  const { setLoading } = useLoading()
  const handleCloseMenu = () => {
    setAnchorElMenuHeader(null)
  }

  const handleActions = (type: MessageActions) => {
    if (type === MessageActions.ClearChatMessages) {
      setMessageActionType(type)
      setIsConfirmPopUp(true)
    }
  }
  const menuActions: {
    name: string
    onClickFnc: () => void
    disable: boolean
  }[] = [
    {
      name: 'Clear messages',
      onClickFnc: async () => {},
      disable: chatLoading.loading && (chatLoading.loadingProps?.room as boolean),
    },
  ]
  return (
    <Popper
      open={Boolean(anchorElMenuHeader)}
      anchorEl={anchorElMenuHeader}
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
    >
      <ClickAwayListener onClickAway={handleCloseMenu}>
        <Paper
          sx={{
            position: 'absolute',
            right: '20px',
            bottom: '5px',
            minWidth: '30%',
            px: 0,
          }}
          elevation={5}
        >
          <List disablePadding sx={{ minWidth: '200px' }}>
            {Object.keys(MessageActions).map((x) => {
              if (
                groupMessageAction.includes(
                  (MessageActions as Record<string, string>)[x] as EnumValues<
                    typeof MessageActions
                  >,
                )
              ) {
                return (
                  <ListItemButton
                    onClick={() => {
                      const action = (MessageActions as Record<string, string>)[x]
                      handleActions(action as EnumValues<typeof MessageActions>)
                    }}
                    key={(MessageActions as Record<string, string>)[x]}
                    sx={{
                      '&.MuiListItemButton-root': {
                        px: 1,
                        py: '3px',
                        // ':hover': { color: theme.palette.mBlack?.main },
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
  )
}

export default ChatHeaderMenu
