import { useAskConfirmation } from '@/context/ConfirmContext'
import { useLoading } from '@/context/LoadingContext'
import { LoadingButton } from '@mui/lab'
import { Backdrop, CircularProgress } from '@mui/material'

type Props = {}

const ConfirmationPopUp = (props: Props) => {
  const { askConfirmation } = useAskConfirmation()
  const { loading } = useLoading()
  return (
    <Backdrop
      sx={{
        color: '#000000',
        zIndex: (theme) => theme.zIndex.drawer + 1999999999999,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
      open={askConfirmation?.isConfirmation}
    >
      <div className='p-container flex flex-col shadow-cardShadow rounded-md bg-mWhite-main gap-5 items-center'>
        <p className='font-medium text-xl'>{askConfirmation?.confirmProps?.confirmationText}</p>
        <div className='self-end'>
          <LoadingButton
            loading={loading?.isLoading && loading?.loadingProps?.btnLoading}
            loadingIndicator={<CircularProgress color='mPink' size={15} thickness={5} />}
            onClick={() => {
              askConfirmation?.confirmProps?.handleConfirm()
            }}
            variant='text'
            color='mPink'
            sx={{ fontSize: '14px', textTransform: 'uppercase' }}
          >
            {askConfirmation?.confirmProps?.confirmBtnTxt ?? 'Confirm'}
          </LoadingButton>
          <LoadingButton
            onClick={askConfirmation?.confirmProps?.handleCancel}
            variant='text'
            color='mPink'
            sx={{ fontSize: '14px', textTransform: 'uppercase' }}
          >
            {askConfirmation?.confirmProps?.cancelBtnTxt ?? 'Cancel'}
          </LoadingButton>
        </div>
      </div>
    </Backdrop>
  )
}

export default ConfirmationPopUp
