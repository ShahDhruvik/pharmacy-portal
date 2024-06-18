import { Button, Divider, Drawer } from '@mui/material'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

type Props = {
  openFormDrawer: boolean
  setOpenFormDrawer: Dispatch<SetStateAction<boolean>>
  width: string
  children: ReactNode
}

const FormDrawer = ({ openFormDrawer, setOpenFormDrawer, width, children }: Props) => {
  return (
    <Drawer
      open={openFormDrawer}
      anchor='right'
      onClose={(event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return
        } else {
          setOpenFormDrawer(false)
        }
      }}
      PaperProps={{ sx: { minWidth: width } }}
    >
      {children}
    </Drawer>
  )
}

export default FormDrawer
