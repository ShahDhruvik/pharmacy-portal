import { SubmitHandler, useForm } from 'react-hook-form'
import OtpInput from '../../../../components/OtpInput'
import { Box, Button, useMediaQuery } from '@mui/material'
import { OtpFormFields } from '../../../../types/authTypes'
import { useAssessment } from '@/context/AssessmentContext'
import { ASSESST_AREA } from '@/utils/constants'
import LoopIcon from '@mui/icons-material/Loop'
import { resendOtp, verifyOtp } from '@/lib/Auth'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/context/AuthContext'
import { getDrpOrg, getProfileAfterLogin } from '@/lib/Profile'
import { useChat } from '@/context/ChatContext'
import { useEffect, useState } from 'react'
import { theme } from '@/context/ThemeProvider'

type Props = {
  handleClose: () => void
  email: string
  maxWidth?: number
}

const OTPForm = ({ handleClose, email, maxWidth }: Props) => {
  const { setCurrentUser, setCurrentOrg } = useChat()
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

  const [resendCount, setResendCount] = useState(0)
  const [counter, setCounter] = useState(30)
  const [disableResend, setDisableResend] = useState(false)
  useEffect(() => {
    let intervalId: any
    if (counter > 0) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1)
      }, 1000)
    } else {
      setDisableResend(true)
    }

    return () => clearInterval(intervalId)
  }, [counter])

  const handleResendClick = async () => {
    if (resendCount < 2) {
      setResendCount((prevCount) => prevCount + 1)
      setCounter(30)
      setDisableResend(false)
      const phone = localStorage.getItem('phone') as any
      const res = await resendOtp(setLoading, showToast, { phone: phone })
      // if (res) {
      //   localStorage.removeItem('phone')
      // }
    }
  }

  const onSubmitHandle: SubmitHandler<OtpFormFields> = async (data) => {
    console.log(Object.values(data).join(''))
    const o = Object.values(data).join('')
    const a = {
      email: email,
      otp: o,
    }

    const res = await verifyOtp(setLoading, showToast, a)
    if (res) {
      const { accessToken, refreshToken } = res.data.data
      const resp = await getProfileAfterLogin(setLoading, showToast, accessToken, refreshToken)
      if (resp) {
        localStorage.setItem('user', JSON.stringify(resp))
        setCurrentUser(resp)
        const resO = await getDrpOrg(setLoading, showToast, accessToken, refreshToken)
        if (resO.length > 0) {
          const defaultOrg = resO.find((x: any) => x.id === resp.organizationId)
          const updatedOrg = { _id: defaultOrg?.id, label: defaultOrg?.name, ...defaultOrg }
          localStorage.setItem('org', JSON.stringify(updatedOrg))
          setCurrentOrg(updatedOrg)
        }
      }
      addStorage(accessToken, refreshToken)
      handleClose()
    }
  }
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(768))
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='flex flex-col justify-center '>
        <OtpInput name={['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']} control={control} />
        <div className='flex justify-between mb-4'>
          {!disableResend && (
            <p className={`flex ${isSmallScreen ? '' : 'w-full'} ml-2`}>
              <span className={`mr-1 ${isSmallScreen ? 'hidden' : 'block'}`}>You have </span>{' '}
              {counter} second left
            </p>
          )}
          <button
            className={`mr-2 ${
              !disableResend || resendCount > 2
                ? 'cursor-not-allowed'
                : 'cursor-pointer text-blue-main flex items-end justify-end w-full'
            } ${isSmallScreen ? '' : 'w-full flex items-end justify-end'}`}
            type='button'
            onClick={() => {
              if (disableResend && resendCount < 2) {
                handleResendClick()
              }
            }}
            // disabled={disableResend}
          >
            <span>
              <LoopIcon />
            </span>
            Resend OTP
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
