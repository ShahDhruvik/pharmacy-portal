import { useLoading } from '@/context/LoadingContext'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { CircularProgress } from '@mui/material'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

type Props = {
  children: ReactNode
  setHandleControls: Dispatch<SetStateAction<HandleControls>>
  handleControls: HandleControls
  pageControls: PageControls
}

const CardContainer = ({ children, handleControls, setHandleControls, pageControls }: Props) => {
  const { loading } = useLoading()
  return (
    <div>
      <div className='flex flex-wrap gap-5 py-container'>{children}</div>
      <div className='flex justify-end'>
        <LoadingButton
          variant='text'
          color='mPink'
          sx={{ fontSize: '14px', textTransform: 'uppercase' }}
          loadingIndicator={<CircularProgress color='mPink' size={15} thickness={5} />}
          loading={loading?.isLoading && loading?.loadingProps?.btnLoading}
          onClick={() => {
            setHandleControls({
              ...handleControls,
              currentPage: handleControls.currentPage + 1,
            })
          }}
          disabled={pageControls?.numberOfRecords === pageControls?.total}
        >
          See more
        </LoadingButton>
      </div>
    </div>
  )
}

export default CardContainer
