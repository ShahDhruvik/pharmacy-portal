import { HandleControls } from '@/types/common'
import { Button, Divider } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  entityName: string
  setOpenFormDrawer: Dispatch<SetStateAction<boolean>>
  handleReFetch: () => void
}

const FormTopBar = ({ entityName, setOpenFormDrawer, handleReFetch }: Props) => {
  return (
    <div className='sticky top-0 bg-mWhite-main'>
      <div className='px-container py-3 flex items-center justify-between'>
        <p className='capitalize font-medium text-xl tracking-wide '>{entityName}</p>
        <Button
          variant='text'
          color='mBlack'
          sx={{ fontSize: '14px', textTransform: 'uppercase' }}
          onClick={() => {
            setOpenFormDrawer(false)
            handleReFetch()
          }}
        >
          Close
        </Button>
      </div>
      <Divider />
    </div>
  )
}

export default FormTopBar
