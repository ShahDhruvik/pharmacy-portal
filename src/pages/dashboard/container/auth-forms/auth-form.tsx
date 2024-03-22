import { Box, Button, DialogTitle } from '@mui/material'
import CustomDialog from '../../../../components/Dialog-custom'
import { ALIGN_DIALOG, FORMTYPE } from '../../../../utils/constants'
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { useAuth } from '@/context/AuthContext'
import PasswordInput from '@/components/PasswordInput'

type Props = {
  open: boolean
  handleClose: () => void
  isAssesstment: boolean
}

const AuthForm = ({ open, handleClose, isAssesstment }: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { addStorage } = useAuth()

  const [errorMessage, setErrorMessage] = useState('')

  const { control, watch, setValue, handleSubmit, formState, reset, trigger } = useForm({
    defaultValues: {
      userName: '',
      password: '',
      tNc: false,
      robo: false,
      officeId: '',
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
      console.log(data, 'data')

      const res = await loginUser(setLoading, showToast, data as any)
      if (res?.status === 200) {
        const { accessToken, refreshToken } = res.data.data
        addStorage(accessToken, refreshToken)
        handleClose()
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
                <HighlightOffIcon sx={{ fill: theme.palette.mDarkGray?.main }} />
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
        <form onSubmit={handleSubmit(onSubmitHandle as any)}>
          {!signType.includes(FORMTYPE.SIGNUP) && (
            <div className='flex flex-col justify-center gap-6 py-1 my-1'>
              <TxtInput
                control={control}
                name='userName'
                handleChange={() => {}}
                placeholder='Enter User Name'
                validation={txtFieldValidation(true)}
                label='User Name*'
              />
              <PasswordInput
                control={control}
                name='password'
                handleChange={() => {}}
                placeholder='Enter Password'
                validation={txtFieldValidation(true)}
                label='Password*'
              />
              <TxtInput
                control={control}
                name='officeId'
                handleChange={() => {}}
                placeholder='Enter Office Id'
                validation={txtFieldValidation(true)}
                label='Office Id*'
              />
              <PermissionForm
                signType={signType}
                roboName={'robo'}
                tncName={'tNc'}
                control={control}
                errors={errors.tNc || errors.robo ? true : false}
                handleClose={() => {}}
                setValue={setValue}
                trigger={trigger}
                isDisabled={signType.includes(FORMTYPE.OTP)}
              />
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
                  Sign-In
                </Button>
              </Box>
            </div>
          )}
          {errorMessage !== '' && <p className='text-lightOrange-main text-sm'>{errorMessage}</p>}
        </form>
      </div>
    </CustomDialog>
  )
}

export default AuthForm
