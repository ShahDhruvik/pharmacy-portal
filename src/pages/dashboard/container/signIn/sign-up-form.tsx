import MobileInput from '../../../../components/MobileInput'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { txtFieldValidation, dateSelectValidation } from '../../../../utils/form.validation'
import TxtInput from '../../../../components/TxtInput'
import { DateInput } from '../../../../components/DateInput'
type Props = {}

type SignUpFormFields = {
  phone: number | string
  contryCode: string
  name: string
  dob: Date | null
  email: string
}
const SignUpForm = ({}: Props) => {
  //form
  const { control, watch, setValue, clearErrors, setError, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
      contryCode: '+1',
      name: '',
      dob: null as Date | null,
      email: '',
    } as SignUpFormFields,
  })
  //form submission
  const onSubmitHandle: SubmitHandler<SignUpFormFields> = (data) => {
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
        />
        <TxtInput
          control={control}
          name='name'
          handleChange={() => {}}
          placeholder='Enter firstname and lastname'
          validation={{ ...txtFieldValidation(true) }}
        />
        <DateInput
          clearErrors={clearErrors}
          control={control}
          handleChange={() => {}}
          label='date of birth'
          name='dob'
          setError={setError}
          validation={{ ...dateSelectValidation('date of birth') }}
        />
        <TxtInput
          control={control}
          name='email'
          handleChange={() => {}}
          placeholder='Enter email address (optional)'
          validation={{ ...txtFieldValidation(false, 'Email') }}
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
            Get otp
          </Button>
        </Box>
      </div>
    </form>
  )
}

export default SignUpForm
