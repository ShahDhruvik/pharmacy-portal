import { LoadingButton } from '@mui/lab'
import { CircularProgress, Divider } from '@mui/material'
import React from 'react'

type Props = {}

const FormBottomBar = (props: Props) => {
  return (
    <div className='sticky bottom-0 bg-mWhite-main'>
      <Divider />
      <div className='px-container py-1 flex justify-end'>
        <LoadingButton
          variant='text'
          color='mPink'
          sx={{ fontSize: '14px', textTransform: 'uppercase' }}
          loadingIndicator={<CircularProgress color='mPink' size={15} thickness={5} />}
          type='submit'
          role='button'
        >
          Save
        </LoadingButton>
      </div>
    </div>
  )
}

export default FormBottomBar
