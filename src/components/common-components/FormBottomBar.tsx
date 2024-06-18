import { LoadingContextType } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { CircularProgress, Divider } from '@mui/material'
import React from 'react'

type Props = {
  loading: LoadingContextType['loading']
  handleClick: () => void
}

const FormBottomBar = ({ handleClick, loading }: Props) => {
  return (
    <div className='sticky bottom-0 bg-mWhite-main'>
      <Divider />
      <div className='px-container py-1 flex justify-end'>
        <LoadingButton
          variant='text'
          color='mPink'
          sx={{ fontSize: '14px', textTransform: 'uppercase' }}
          loadingIndicator={<CircularProgress color='mPink' size={15} thickness={5} />}
          loading={loading?.isLoading && loading?.loadingProps?.btnLoading}
          onClick={handleClick}
        >
          Save
        </LoadingButton>
      </div>
    </div>
  )
}

export default FormBottomBar
