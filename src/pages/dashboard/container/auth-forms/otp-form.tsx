import { SubmitHandler, useForm } from 'react-hook-form'
import OtpInput from '../../../../components/OtpInput'
import { Box, Button } from '@mui/material'
import { OtpFormFields } from '../../../../types/authTypes'

type Props = {}

const OTPForm = ({}: Props) => {
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
  const onSubmitHandle: SubmitHandler<OtpFormFields> = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className='flex flex-col justify-center '>
        <OtpInput name={['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']} control={control} />
        <div className='flex justify-between'>
          <p className='ml-2'>You have 30 second left</p>
          <p className='mr-2'>Resend otp</p>
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
