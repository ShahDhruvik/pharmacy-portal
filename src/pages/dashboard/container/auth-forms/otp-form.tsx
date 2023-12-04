import { SubmitHandler, useForm } from 'react-hook-form'
import OtpInput from '../../../../components/OtpInput'
import { Box, Button } from '@mui/material'
import { OtpFormFields } from '../../../../types/authTypes'
import { useAssessment } from '@/context/AssessmentContext'
import { ASSESST_AREA } from '@/utils/constants'
import LoopIcon from '@mui/icons-material/Loop'
import { resendOtp, verifyOtp } from '@/lib/Auth'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/context/AuthContext'

type Props = {
  handleClose: () => void
  isAssesstMent: boolean
  phone: string
}

const OTPForm = ({ handleClose, isAssesstMent, phone }: Props) => {
  const { setArea } = useAssessment()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { addStorage } = useAuth()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
    },
  })
  const onSubmitHandle: SubmitHandler<OtpFormFields> = async (data) => {
    const a = {
      otp: Object.values(data).join(''),
    }

    const res = await verifyOtp(setLoading, showToast, a.otp as string)
    if (res) {
      const { accessToken, refreshToken } = res.data.data
      addStorage(accessToken, refreshToken)
      handleClose()
    }
    // if (isAssesstMent) {
    //   setArea([ASSESST_AREA.QNA, ASSESST_AREA.SLIDER])
    // } else {
    // }
  }

  const handleResendOtp = async (data: string) => {
    await resendOtp(setLoading, showToast, data as string)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='flex flex-col justify-center '>
        <OtpInput name={['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']} control={control} />
        <div className='flex justify-between mb-4'>
          <p className='ml-2'>You have 30 second left</p>
          <button
            className='mr-2 text-mediumBlue-main'
            onClick={() => {
              handleResendOtp(phone)
            }}
          >
            <span>
              <LoopIcon />
            </span>
            Resend otp
          </button>
        </div>
        <Box display={'flex'} justifyContent={'end'} gap={1} marginTop={1}>
          <Button
            variant='contained'
            color='mPink'
            sx={{
              maxHeight: 27,
              maxWidth: 'max-content',
              minWidth: 'max-content',
            }}
            type='submit'
          >
            Submit
          </Button>
        </Box>
      </div>
    </form>
  )
}

export default OTPForm
