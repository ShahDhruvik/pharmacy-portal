import { Dispatch, SetStateAction } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Divider, Button } from '@mui/material'
import { DrawerState, FieldProfState, HeadProfState, SelectDDL } from '@/types/common'
import { DRAWERSTATE, PROF_FIELDS } from '@/utils/constants'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfileInputs, { CommunicationPreferenceOpts } from './ProfileInputs'
import OtpInput from '@/components/OtpInput'
import { useState } from 'react'
import LoopIcon from '@mui/icons-material/Loop'
import Spinner from '@/components/spinner'
import { FieldStateProps } from './Profilebar'
import { acDefaultValue } from '@/utils/form.validation'
import { useToast } from '@/hooks/useToast'
import { profileCommunicationEdit, profileEmailEdit, profileMobileNumberEdit } from '@/lib/Profile'
import { useLoading } from '@/context/LoadingContext'

type Props = {
  handleDrawerState: (state: DrawerState) => void
  fieldName: FieldStateProps
  setFieldName: Dispatch<SetStateAction<FieldStateProps>>
}

export type ProFileFormFields = {
  profMobile: string
  profMobileConfirm: string
  profCountryCode: string
  profCountryCodeConfirm: string
  profEmail: string
  profEmailConfirm: string
  comMobile: string
  comMobileConfirm: string
  comCountryCode: string
  comCountryCodeConfirm: string
  comEmail: string
  comEmailConfirm: string
  comPref: string
  insField: string
  country: SelectDDL
  whatsapp: boolean
  sms: boolean
  email: boolean
  Email?: boolean
  SMS?: boolean
}

const ProfileEdit = ({ handleDrawerState, fieldName, setFieldName }: Props) => {
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [isOtp, setIsOtp] = useState(false)
  const [formData, setFormData] = useState<ProFileFormFields>()

  const {
    control,
    setValue,
    watch,
    trigger,
    getValues,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
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
      country: acDefaultValue,
      whatsapp: false,
      sms: false,
      email: false,
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
    },
  })
  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    const o = {
      otp0: data.otp0,
      otp1: data.otp1,
      otp2: data.otp2,
      otp3: data.otp3,
      otp4: data.otp4,
      otp5: data.otp5,
    }
    switch (fieldName.fieldName) {
      case PROF_FIELDS.PROFILE_MOBILE || PROF_FIELDS.COMMUNICATION_MOBILE:
        //API edit
        console.log(data, 'mob')

        const a = {
          otp: Object.values(o).join(''),
          contactNo: data.profMobileConfirm,
        }
        const res = await profileMobileNumberEdit(setLoading, showToast, a)
        if (res?.status === 200) {
          handleDrawerState(DRAWERSTATE.NORMAL)
        }
        break
      case PROF_FIELDS.PROFILE_EMAIL || PROF_FIELDS.COMMUNICATION_EMAIL:
        //API edit
        console.log(data, 'email')
        const b = {
          otp: Object.values(o).join(''),
          profileEmail: data.profEmailConfirm,
        }
        const resp = await profileEmailEdit(setLoading, showToast, b)
        if (resp?.status === 200) {
          handleDrawerState(DRAWERSTATE.NORMAL)
        }
        break
      case PROF_FIELDS.COMMUNICATION_PREFERENCE:
        //confirmation popUp
        console.log(data, 'pref')
        console.log('pref')
        setFormData(data)
        setFieldName({ ...fieldName, isConfirm: true })
        break
      case PROF_FIELDS.COUNTRY_FIELD:
        //confirmation popUp
        console.log(data)
        console.log('country')
        setFormData(data)
        setFieldName({ ...fieldName, isConfirm: true })
        break

      default:
        break
    }
  }

  if (!loading.isLoading && !loading.isIndependentLoader) {
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center mb-3 sticky top-0  py-[10px] bg-lightGray-main'>
          <Button
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette.mMidBlue?.main,
              minWidth: 'max-content',
              fontSize: '1rem',
              height: 20,
              ':disabled': {
                backgroundColor: theme.palette.mLightGray?.main,
                color: theme.palette.mDarkGray?.main,
                cursor: 'not-allowed',
              },
            }}
            type='submit'
            onClick={handleSubmit(onSubmitHandle)}
            disableRipple
            disabled={fieldName.isConfirm}
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
              ':disabled': {
                backgroundColor: theme.palette.mLightGray?.main,
                color: theme.palette.mDarkGray?.main,
                cursor: 'not-allowed',
              },
            }}
            disableRipple
            onClick={() => handleDrawerState(DRAWERSTATE.NORMAL)}
            disabled={fieldName.isConfirm}
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
          control={control as any}
          fieldName={fieldName}
          setValue={setValue}
          watch={watch}
          getValues={getValues}
          trigger={trigger as any}
          setIsOtp={setIsOtp}
          isOtp={isOtp}
          formData={formData}
          reset={reset as any}
          setFieldName={setFieldName}
          clearErrors={clearErrors as any}
          setError={setError as any}
          handleDrawerState={handleDrawerState}
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
  } else {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }
}

export default ProfileEdit
