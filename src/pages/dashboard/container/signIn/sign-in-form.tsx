import MobileInput from '../../../../components/MobileInput'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FORMTYPE, FormType } from './auth-form'
import { Dispatch, SetStateAction } from 'react'
type Props = {
  handleClose: () => void
  signType: FormType
  setSignType: Dispatch<SetStateAction<FormType>>
}
export type SignInFormFields = {
  phone: number | string
  contryCode: string
}
const SignInForm = ({ signType }: Props) => {
  //form
  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
      contryCode: '+1',
    },
  })
  //form submission
  const onSubmitHandle: SubmitHandler<SignInFormFields> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
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
    </form>
  )
}

export default SignInForm
