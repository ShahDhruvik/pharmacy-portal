import MobileInput from '../../../../components/MobileInput'
import { Box, Button } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { txtFieldValidation, dateSelectValidation } from '../../../../utils/form.validation'
import TxtInput from '../../../../components/TxtInput'
import { DateInput } from '../../../../components/DateInput'
import { SignUpFormFields } from '../../../../types/authTypes'
import { Dispatch, SetStateAction } from 'react'
import { FORMTYPE } from '../../../../utils/constants'
import { FormTypeArray } from '../../../../types/common'
import PermissionForm from './permission-form'
type Props = {
  handleClose: () => void
  signType: FormTypeArray
  setSignType: Dispatch<SetStateAction<FormTypeArray>>
}

const SignUpForm = ({ setSignType, signType }: Props) => {
  //form
  const { control, watch, setValue, clearErrors, setError, handleSubmit, formState, trigger } =
    useForm({
      defaultValues: {
        phone: '',
        contryCode: '+1',
        name: '',
        dob: null as Date | null,
        email: '',
        robo: false,
        tNc: false,
      } as SignUpFormFields,
    })
  const { errors } = formState

  //form submission
  const onSubmitHandle: SubmitHandler<SignUpFormFields> = (data) => {
    if (!data.robo || !data.tNc) {
      return
    } else {
      console.log(data)
      setSignType([FORMTYPE.OTP, FORMTYPE.SIGNUP])
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
          codeName='countryCode'
          sx={{
            minWidth: 350,
          }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
        />
        <TxtInput
          control={control}
          name='name'
          handleChange={() => {}}
          placeholder='Enter firstname and lastname'
          validation={{ ...txtFieldValidation(true) }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
          label='First Name And Last Name'
        />
        <DateInput
          clearErrors={clearErrors}
          control={control}
          handleChange={() => {}}
          label='date of birth'
          name='dob'
          setError={setError}
          validation={{ ...dateSelectValidation('date of birth') }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
        />
        <TxtInput
          control={control}
          name='email'
          handleChange={() => {}}
          placeholder='Enter email address (optional)'
          validation={{ ...txtFieldValidation(false, 'Email') }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
          label='Email'
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
            disabled={signType.includes(FORMTYPE.OTP)}
          >
            Submit
          </Button>
        </Box>
      </div>
    </form>
  )
}

export default SignUpForm
