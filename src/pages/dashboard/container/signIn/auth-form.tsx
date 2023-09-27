import { Box, Button, Checkbox, DialogTitle, FormControlLabel } from '@mui/material'
import CustomDialog from '../../../../components/Dialog-custom'
import { ALIGN_DIALOG } from '../../../../utils/constants'
import SvgIcon from '../../../../components/SvgIcon'
import { theme } from '../../../../context/ThemeProvider'
import { useState } from 'react'
import SignUpForm from './sign-up-form'
import OTPForm from './otp-form'
import MobileInput from '../../../../components/MobileInput'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInFormFields } from './sign-in-form'

type Props = {
  open: boolean
  handleClose: () => void
}
export const enum FORMTYPE {
  SIGNUP = 'SIGNUP',
  SIGNIN = 'SIGNIN',
  OTP = 'OTP',
}
export type FormType = FORMTYPE.SIGNIN | FORMTYPE.SIGNUP | FORMTYPE.OTP | undefined

const AuthForm = ({ open, handleClose }: Props) => {
  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
      contryCode: '+1',
    },
  })
  const [signType, setSignType] = useState<FormType>(undefined)
  const onSubmitHandle: SubmitHandler<SignInFormFields> = (data) => {
    console.log(data)
    setSignType(FORMTYPE.OTP)
  }
  return (
    <CustomDialog
      open={open}
      handleClose={() => {
        handleClose()
        setSignType(undefined)
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
            <div className='flex justify-end'>
              <button
                onClick={() => {
                  handleClose()
                  setSignType(undefined)
                }}
              >
                <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mGrey?.main }} />
              </button>
            </div>
          </DialogTitle>
        ),
      }}
      maxWidth={'sm'}
      disableClickAway={true}
      paddingOfContent='20px'
    >
      <div>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          {signType !== FORMTYPE.SIGNUP && (
            <div className='flex flex-col justify-center gap-3'>
              <MobileInput
                control={control}
                name={'phone'}
                placeholder='Enter whatsapp number here ...'
                setValue={setValue}
                watch={watch}
                handleChange={() => {}}
                minWidth={350}
                isDisabled={signType === FORMTYPE.OTP}
              />
              <Box
                display={'flex'}
                justifyContent={'center'}
                sx={{
                  '& .MuiFormControlLabel-root': {
                    mx: 0,
                  },
                }}
                gap={1}
              >
                <FormControlLabel
                  sx={{
                    '.MuiButtonBase-root': {
                      py: 0,
                      px: '2px',
                    },
                  }}
                  disabled={signType === FORMTYPE.OTP}
                  control={<Checkbox />}
                  label={<p className='text-sm'>I am not a robot</p>}
                />
                <FormControlLabel
                  sx={{
                    '.MuiButtonBase-root': {
                      py: 0,
                      px: '2px',
                    },
                  }}
                  disabled={signType === FORMTYPE.OTP}
                  control={<Checkbox />}
                  label={
                    <p className='text-sm'>
                      Agree to{' '}
                      <Link to={'/'}>
                        <span className='text-blue-700'>terms and conditions</span>
                      </Link>
                    </p>
                  }
                />
              </Box>
              {signType === FORMTYPE.SIGNIN && (
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
          {signType === undefined && (
            <Box display={'flex'} justifyContent={'center'} gap={1} marginTop={1}>
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
                <Button
                  variant='contained'
                  color='mPink'
                  onClick={() => setSignType(FORMTYPE.SIGNUP)}
                  sx={{
                    maxHeight: 27,
                    maxWidth: 150,
                    minWidth: 150,
                  }}
                >
                  Sign up
                </Button>
                <p className='ml-3 text-sm'>Do not have account</p>
              </div>
            </Box>
          )}
        </form>
        {signType === FORMTYPE.SIGNUP && <SignUpForm />}
        {signType === FORMTYPE.OTP && <OTPForm />}
      </div>
    </CustomDialog>
  )
}

export default AuthForm
