import { Box, Button, DialogTitle } from '@mui/material'
import CustomDialog from '../../../../components/Dialog-custom'
import { ALIGN_DIALOG, FORMTYPE } from '../../../../utils/constants'
import SvgIcon from '../../../../components/SvgIcon'
import { theme } from '../../../../context/ThemeProvider'
import { useEffect, useState } from 'react'
import SignUpForm from './sign-up-form'
import OTPForm from './otp-form'
import MobileInput from '../../../../components/MobileInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInFormFields } from '../../../../types/authTypes'
import { FormTypeArray } from '../../../../types/common'
import PermissionForm from './permission-form'
import { loginUser } from '@/lib/Auth'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'

type Props = {
  open: boolean
  handleClose: () => void
  isAssesstment: boolean
}

const AuthForm = ({ open, handleClose, isAssesstment }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()

  const [errorMessage, setErrorMessage] = useState('')
  const [phone, setPhone] = useState('')

  const { control, watch, setValue, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      contactNo: '',
      contryCode: '+1',
      tNc: false,
      robo: false,
    },
  })

  useEffect(() => {
    reset()
  }, [open])

  const { errors } = formState
  const [signType, setSignType] = useState<FormTypeArray>([])
  const onSubmitHandle: SubmitHandler<SignInFormFields> = async (data) => {
    if (!data.robo || !data.tNc) {
      setErrorMessage('check the conditions')
      return
    } else {
      setErrorMessage('')
      const res = await loginUser(setLoading, showToast, data?.contactNo as string)
      if (res?.status === 200) {
        setPhone(data.contactNo as string)
        setSignType([FORMTYPE.OTP])
      }
    }
  }
  return (
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
                <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mDarkGray?.main }} />
              </button>
            </div>
          </DialogTitle>
        ),
      }}
      maxWidth={'md'}
      disableClickAway={true}
      paddingOfContent='20px'
    >
      <div>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          {!signType.includes(FORMTYPE.SIGNUP) && (
            <div className='flex flex-col justify-center gap-6 py-1 my-1'>
              <MobileInput
                control={control}
                name={'contactNo'}
                placeholder='Enter whatsapp number here ...'
                setValue={setValue}
                watch={watch}
                handleChange={() => {}}
                codeName='contryCode'
                isDisabled={signType.includes(FORMTYPE.OTP)}
                sx={{
                  minWidth: 400,
                }}
              />
              <PermissionForm
                signType={signType}
                roboName={'robo'}
                tncName={'tNc'}
                control={control}
                errors={errors.tNc || errors.robo ? true : false}
              />
              {signType.includes(FORMTYPE.SIGNIN) && (
                <Box display={'flex'} justifyContent={'end'} gap={1} marginTop={1}>
                  <Button
                    variant='contained'
                    color='mPink'
                    sx={{
                      maxHeight: 27,
                      maxWidth: 'max-content',
                      minWidth: 'max-content',
                    }}
                  >
                    Sign in -get OTP
                  </Button>
                </Box>
              )}
            </div>
          )}
          {signType.length === 0 && (
            <Box display={'flex'} justifyContent={'center'} gap={1} marginTop={'24px'}>
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
                Sign in -get OTP
              </Button>
              <div>
                {/* <Button
                  variant='contained'
                  color='mPink'
                  onClick={() => setSignType([FORMTYPE.SIGNUP])}
                  sx={{
                    maxHeight: 27,
                    maxWidth: 150,
                    minWidth: 150,
                  }}
                >
                  Sign up
                </Button>
                <p className='ml-3 text-sm'>Do not have account</p> */}
              </div>
            </Box>
          )}
          {errorMessage !== '' && <p className='text-lightOrange-main text-sm'>{errorMessage}</p>}
        </form>
        {signType.includes(FORMTYPE.SIGNUP) && (
          <SignUpForm signType={signType} handleClose={handleClose} setSignType={setSignType} />
        )}
        {signType.includes(FORMTYPE.OTP) && (
          <div className='mt-3'>
            <OTPForm handleClose={handleClose} isAssesstMent={isAssesstment} phone={phone} />
          </div>
        )}
      </div>
    </CustomDialog>
  )
}

export default AuthForm
