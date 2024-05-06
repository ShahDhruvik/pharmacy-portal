import { theme } from '@/context/ThemeProvider'
import { Drawer, Button } from '@mui/material'
import Profile from './Profile'
import { useState } from 'react'
import { DrawerState, FieldProfState, HeadProfState } from '@/types/common'
import { DRAWERSTATE } from '@/utils/constants'
import ProfileEdit from './ProfileEdit'
import { useDrawerWidth } from '@/components/DrawerWidth'
type Props = {
  handleClose: () => void
  open: boolean
}

export type FieldStateProps = {
  fieldName: FieldProfState | undefined
  data: string | undefined
  headName: HeadProfState | undefined
  isConfirm?: boolean
}

const Profilebar = ({ open, handleClose }: Props) => {
  //Drawer
  const [drawerState, setDrawerState] = useState<DrawerState>(DRAWERSTATE.NORMAL)
  const handleDrawerState = (state: DrawerState) => {
    setDrawerState(state)
  }
  // Fields
  const [fieldName, setFieldName] = useState<FieldStateProps>({
    fieldName: undefined,
    data: undefined,
    headName: undefined,
  })
  const handleField = (
    fieldName: FieldProfState | undefined,
    data: string | undefined,
    headName: HeadProfState | undefined,
  ) => {
    setFieldName({ fieldName, data, headName })
  }
  const drawerWidth = useDrawerWidth()
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          px: '20px',
          backgroundColor: theme.palette.mWhite?.main,
        },
      }}
    >
      {drawerState === DRAWERSTATE.NORMAL && (
        <Profile
          handleClose={handleClose}
          handleDrawerState={handleDrawerState}
          handleField={handleField}
        />
      )}
      {drawerState === DRAWERSTATE.EDIT && (
        <ProfileEdit
          handleDrawerState={handleDrawerState}
          fieldName={fieldName}
          setFieldName={setFieldName}
        />
      )}
    </Drawer>
  )
}

export default Profilebar
