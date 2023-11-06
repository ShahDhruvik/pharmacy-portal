import MobileInput from '../../../../components/MobileInput'
import { Box, Button } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { txtFieldValidation } from '../../../../utils/form.validation'
import TxtInput from '../../../../components/TxtInput'
import { GuestFormFields } from '../../../../types/authTypes'
import { Dispatch, SetStateAction } from 'react'
import { FORMTYPE } from '../../../../utils/constants'
import { FormTypeArray } from '../../../../types/common'
import PermissionForm from './permission-form'
type Props = {
  handleClose: () => void
  signType: FormTypeArray
  setSignType: Dispatch<SetStateAction<FormTypeArray>>
}

const GuestForm = ({ setSignType, signType }: Props) => {
  //form
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      phone: '',
      contryCode: '+1',
      name: '',
      tNc: false,
      robo: false,
    } as GuestFormFields,
  })
  //form submission
  const onSubmitHandle: SubmitHandler<GuestFormFields> = (data) => {
    if (!data.robo || !data.tNc) {
      return
    } else {
      console.log(data)
      setSignType([FORMTYPE.OTP, FORMTYPE.GUEST])
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
          codeName='contryCode'
          handleChange={() => {}}
          sx={{
            minWidth: 350,
          }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
          getValues={getValues}
        />
        <TxtInput
          control={control}
          name='name'
          handleChange={() => {}}
          placeholder='Enter firstname and lastname'
          validation={{ ...txtFieldValidation(true) }}
          isDisabled={signType.includes(FORMTYPE.OTP)}
        />
        <PermissionForm signType={signType} roboName={'robo'} tncName={'tNc'} control={control} />
        <Box display={'flex'} justifyContent={'end'} gap={1} marginTop={1}>
          <Button
            variant='contained'
            color='mPink'
            sx={{
              maxHeight: 27,
            }}
            type='submit'
            disabled={signType.includes(FORMTYPE.OTP)}
          >
            Get OTP
          </Button>
        </Box>
      </div>
    </form>
  )
}

export default GuestForm
