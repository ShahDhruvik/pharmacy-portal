import { theme } from '@/context/ThemeProvider'
import { Drawer, Button } from '@mui/material'
import Profile from './Profile'
import { useState } from 'react'
import { DrawerState } from '@/types/common'
import { DRAWERSTATE } from '@/utils/constants'
import ProfileEdit from './ProfileEdit'
type Props = {
  handleClose: () => void
  open: boolean
}

const Profilebar = ({ open, handleClose }: Props) => {
  const [drawerState, setDrawerState] = useState<DrawerState>(DRAWERSTATE.NORMAL)
  const handleDrawerState = (state: DrawerState) => {
    setDrawerState(state)
  }
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        width: '25%',
        '& .MuiDrawer-paper': {
          width: '25%',
          padding: '20px',
        },
      }}
    >
      {drawerState === DRAWERSTATE.NORMAL && (
        <Profile handleClose={handleClose} handleDrawerState={handleDrawerState} />
      )}
      {drawerState === DRAWERSTATE.EDIT && <ProfileEdit handleDrawerState={handleDrawerState} />}
    </Drawer>
  )
}

export default Profilebar
