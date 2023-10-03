import MobileInput from '../../../../components/MobileInput'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { SignInFormFields } from '../../../../types/authTypes'
import { FORMTYPE } from '../../../../utils/constants'
import { FormTypeArray } from '../../../../types/common'
import PermissionForm from './permission-form'
type Props = {
  handleClose: () => void
  signType: FormTypeArray
  setSignType: Dispatch<SetStateAction<FormTypeArray>>
}

const SignInForm = ({ signType, setSignType }: Props) => {
  //form
  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
      contryCode: '+1',
      robo: false,
      tNc: false,
    },
  })
  //form submission
  const onSubmitHandle: SubmitHandler<SignInFormFields> = (data) => {
    if (!data.robo || !data.tNc) {
      return
    } else {
      console.log(data)
      setSignType([FORMTYPE.OTP, FORMTYPE.SIGNIN])
    }
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
          sx={{
            minWidth: 350,
          }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
        />
        <PermissionForm signType={signType} roboName={'robo'} tncName={'tNc'} control={control} />
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
              type='submit'
              disabled={signType.includes(FORMTYPE.OTP)}
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
