import { theme } from '@/context/ThemeProvider'
import { Divider, Button } from '@mui/material'
import { DrawerState, FieldProfState, HeadProfState } from '@/types/common'
import { DRAWERSTATE, PROF_FIELDS } from '@/utils/constants'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfileInputs from './ProfileInputs'
import OtpInput from '@/components/OtpInput'
import { useState } from 'react'
import LoopIcon from '@mui/icons-material/Loop'
type Props = {
  handleDrawerState: (state: DrawerState) => void
  fieldName: {
    fieldName: FieldProfState | undefined
    data: string | undefined
    headName: HeadProfState | undefined
  }
}

const ProfileEdit = ({ handleDrawerState, fieldName }: Props) => {
  const [isOtp, setIsOtp] = useState(false)

  const { control, setValue, watch, trigger, getValues, handleSubmit } = useForm({
    defaultValues: {
      profMobile: '',
      profMobileConfirm: '',
      profCountryCode: '+91',
      profCountryCodeConfirm: '+91',
      profEmail: '',
      profEmailConfirm: '',
      comMobile: '',
      comMobileConfirm: '',
      comCountryCode: '+91',
      comCountryCodeConfirm: '+91',
      comEmail: '',
      comEmailConfirm: '',
      comPref: '',
      insField: '',
      country: '',
      whatsapp: false,
      sms: false,
      email: false,
    },
  })
  const onSubmitHandle: SubmitHandler<any> = (data) => {
    console.log('data')
    console.log(data)
  }
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center mb-3 sticky top-0  py-[10px]'>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            fontSize: '1rem',
            height: 20,
          }}
          type='submit'
          onClick={handleSubmit(onSubmitHandle)}
          disableRipple
        >
          Submit
        </Button>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            fontSize: '1rem',

            height: 20,
          }}
          disableRipple
          onClick={() => handleDrawerState(DRAWERSTATE.NORMAL)}
        >
          Cancel
        </Button>
      </div>
      <div>
        <div className='mb-2'>
          <p className='font-semibold text-xl ml-[6px] '>{`Current ${fieldName.headName} ${fieldName.fieldName}`}</p>
        </div>
        <div className='mb-2'>
          <p className='ml-[6px] text-midGray-light text-lg mb-2'>
            {fieldName.data ? fieldName.data : 'Not available'}
          </p>
          <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
        </div>
      </div>
      <ProfileInputs
        control={control}
        fieldName={fieldName}
        setValue={setValue}
        watch={watch}
        getValues={getValues}
        trigger={trigger}
        setIsOtp={setIsOtp}
        isOtp={isOtp}
      />

      {isOtp && (
        <div className='mt-2'>
          <p className='p-2 rounded-md bg-white-main '>
            For security reasons you will be sent an OTP to confirm this email address.
          </p>
          <OtpInput name={['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']} control={control} />
          <div className='flex justify-between'>
            <p className='ml-2'>You have 30 second left</p>
            <button className='mr-2 text-mediumBlue-main'>
              <span>
                <LoopIcon />
              </span>
              Resend otp
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileEdit
