import { Box, Button, DialogTitle, useMediaQuery } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { ALIGN_DIALOG, FORMTYPE, SITE_KEY } from '../../../../utils/constants'
import { FormTypeArray } from '../../../../types/common'
import { loginUser, verifyRecaptcha } from '@/lib/Auth'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import OTPForm from './otp-form'
import CustomDialog from '@/components/Dialog-custom'
import { theme } from '@/context/ThemeProvider'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  open: boolean
  handleClose: () => void
  signType: any
  setSignType: Dispatch<SetStateAction<FormTypeArray>>
}

const AuthForm = ({ open, handleClose, signType, setSignType }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const captchaRef = useRef(null)
  //form
  const { control, watch, setValue, handleSubmit, formState, getValues, trigger } = useForm({
    defaultValues: {
      userName: '',
    },
  })
  const [captchaToken, setCaptchaToken] = useState(null)

  const handleCaptchaChange = (token: any) => {
    setCaptchaToken(token)
  }

  const handleRetry = () => {
    const a: any = captchaRef.current
    if (a) {
      a.reset()
    }
  }

  const { errors } = formState

  //form submission
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    const recaptchaRes = await verifyRecaptcha(setLoading, showToast, captchaToken)
    const res = await loginUser(setLoading, showToast, data)
    if (recaptchaRes === undefined) {
      handleRetry()
    }
    if (res && recaptchaRes) {
      setSignType([FORMTYPE.OTP, FORMTYPE.SIGNIN])
    }
  }
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={() => {
          handleClose()
          setSignType([])
        }}
        align={ALIGN_DIALOG.TOP_RIGHT}
        action={{
          isAction: false,
          component: null,
        }}
        header={{
          isHeader: true,
          component: (
            <DialogTitle
              sx={{
                padding: '16px 24px 14px 24px',
              }}
            >
              <div className='flex justify-end items-baseline -mt-2 -mr-4'>
                <button
                  onClick={() => {
                    handleClose()
                    setSignType([])
                  }}
                >
                  <HighlightOffIcon sx={{ fill: theme.palette.mDarkGray?.main }} />
                </button>
              </div>
            </DialogTitle>
          ),
        }}
        maxWidth={isSmallScreen ? 'sm' : 'md'}
        disableClickAway={true}
        paddingOfContent='20px'
        isFullScreen={isSmallScreen ? true : false}
      >
        <div>
          <h1 className='flex justify-center font-bold text-xl'>Sign in</h1>
          <form
            onSubmit={handleSubmit(onSubmitHandle)}
            className={`bg-lightGray-main p-3 rounded-md`}
          >
            <div className={`flex flex-col justify-center gap-6 py-1 my-1`}>
              <TxtInput
                control={control}
                name='userName'
                handleChange={() => {}}
                placeholder='Enter User Name'
                validation={txtFieldValidation(true)}
                label='User Name*'
                isDisabled={signType.includes(FORMTYPE.OTP)}
                sx={{
                  minWidth: isSmallScreen ? 300 : 400,
                }}
              />
              {/* <PermissionForm
                signType={signType}
                roboName={'robo'}
                tncName={'tNc'}
                control={control}
                errors={errors.tNc || errors.robo ? true : false}
                handleClose={() => {}}
                setValue={setValue}
                trigger={trigger}
                isDisabled={signType.includes(FORMTYPE.OTP)}
              /> */}
              {watch('userName') && (
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={SITE_KEY}
                  size='normal'
                  onChange={handleCaptchaChange}
                />
              )}
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
                  disabled={signType.includes(FORMTYPE.OTP)}
                >
                  Get OTP
                </Button>
              </Box>
            </div>
          </form>
          {signType.includes(FORMTYPE.OTP) && (
            <OTPForm handleClose={handleClose} email={getValues('userName')} maxWidth={400} />
          )}
        </div>
      </CustomDialog>
    </>
  )
}

export default AuthForm
