import MobileInput from '@/components/MobileInput'
import { FieldProfState, HeadProfState } from '@/types/common'
import { PROF_FIELDS } from '@/utils/constants'
import { Dispatch, SetStateAction } from 'react'
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'
import { Button, FormControlLabel, Typography } from '@mui/material'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import CheckBoxInput from '@/components/CheckBoxInput'
type Props = {
  fieldName: {
    fieldName: FieldProfState | undefined
    data: string | undefined
    headName: HeadProfState | undefined
  }
  control: Control<
    {
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
      country: string
      whatsapp: boolean
      sms: boolean
      email: boolean
    },
    any
  >
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  getValues: UseFormGetValues<any>
  trigger: UseFormTrigger<{
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
    country: string
    whatsapp: boolean
    sms: boolean
    email: boolean
  }>
  setIsOtp: Dispatch<SetStateAction<boolean>>
  isOtp: boolean
}

const ProfileInputs = ({
  fieldName,
  control,
  setValue,
  watch,
  getValues,
  trigger,
  setIsOtp,
  isOtp,
}: Props) => {
  switch (fieldName.fieldName) {
    case PROF_FIELDS.PROFILE_MOBILE || PROF_FIELDS.COMMUNICATION_MOBILE:
      return (
        <div className='flex flex-col gap-2'>
          <p className='text-lg ml-[6px] mb-1'>{`New ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <MobileInput
            control={control}
            name={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comMobile' : 'profMobile'}
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            setValue={setValue}
            watch={watch}
            handleChange={() => {}}
            codeName={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comCountryCode' : 'profCountryCode'}
            sx={{
              minWidth: 350,
            }}
          />
          <p className='text-lg ml-[6px] mb-1'>{`Confirm new ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <MobileInput
            control={control}
            name={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comMobileConfirm' : 'profMobileConfirm'}
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            setValue={setValue}
            watch={watch}
            handleChange={() => {}}
            codeName={
              PROF_FIELDS.COMMUNICATION_MOBILE ? 'comCountryCodeConfirm' : 'profCountryCodeConfirm'
            }
            sx={{
              minWidth: 350,
            }}
            confirm={{
              isConfirm: true,
              confirmField: PROF_FIELDS.COMMUNICATION_MOBILE ? 'comMobile' : 'profMobile',
              message: 'Mobile Number does not match',
              codeMatchName: PROF_FIELDS.COMMUNICATION_MOBILE
                ? 'comCountryCode'
                : 'profCountryCode',
            }}
            getValues={getValues}
          />
          {!isOtp && (
            <Button
              color='mPink'
              sx={{
                minWidth: '100%',
              }}
              onClick={async () => {
                if (PROF_FIELDS.COMMUNICATION_MOBILE) {
                  const triggeredValue = await trigger(['comMobile', 'comMobileConfirm'])
                  setIsOtp(triggeredValue)
                } else {
                  const triggeredValue = await trigger(['profMobile', 'profMobileConfirm'])
                  setIsOtp(triggeredValue)
                }
              }}
            >
              Send otp
            </Button>
          )}
        </div>
      )
      break
    case PROF_FIELDS.PROFILE_EMAIL || PROF_FIELDS.COMMUNICATION_EMAIL:
      return (
        <div className='flex flex-col gap-2'>
          <p className='text-lg ml-[6px] mb-1'>{`New ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <TxtInput
            control={control}
            name={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comEmail' : 'profEmail'}
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            handleChange={() => {}}
            sx={{
              minWidth: 350,
            }}
            validation={{ ...txtFieldValidation(true, 'Email') }}
          />
          <p className='text-lg ml-[6px] mb-1'>{`Confirm new ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <TxtInput
            control={control}
            name={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comEmailConfirm' : 'profEmailConfirm'}
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            handleChange={() => {}}
            sx={{
              minWidth: 350,
            }}
            validation={{
              ...txtFieldValidation(true, 'Email'),
              ...{
                validate: (value: string) =>
                  value ===
                    getValues(PROF_FIELDS.COMMUNICATION_MOBILE ? 'comEmail' : 'profEmail') ||
                  'Email does not match',
              },
            }}
          />
          {!isOtp && (
            <Button
              color='mPink'
              sx={{
                minWidth: '100%',
              }}
              onClick={async () => {
                if (PROF_FIELDS.COMMUNICATION_MOBILE) {
                  const triggeredValue = await trigger(['comEmail', 'comEmailConfirm'])
                  setIsOtp(triggeredValue)
                } else {
                  const triggeredValue = await trigger(['profEmail', 'profEmailConfirm'])
                  setIsOtp(triggeredValue)
                }
              }}
            >
              Send otp
            </Button>
          )}
        </div>
      )
      break
    case PROF_FIELDS.COMMUNICATION_PREFERENCE:
      return (
        <div className='flex flex-col gap-2'>
          <p className='text-lg ml-[6px] mb-1'>{`Update ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <div className='flex flex-col gap-3'>
            <FormControlLabel
              sx={{
                '.MuiButtonBase-root': {
                  py: 0,
                  px: '2px',
                  ml: '14px',
                },
              }}
              control={<CheckBoxInput control={control} name={'whatsapp'} notValidate={true} />}
              label={
                <Typography sx={{ fontSize: '14px', ml: '8px', fontWeight: 700 }}>
                  WhatsApp Messages
                </Typography>
              }
            />
            <FormControlLabel
              sx={{
                '.MuiButtonBase-root': {
                  py: 0,
                  px: '2px',
                  ml: '14px',
                },
              }}
              control={<CheckBoxInput control={control} name={'sms'} notValidate={true} />}
              label={
                <Typography sx={{ fontSize: '14px', ml: '8px', fontWeight: 700 }}>
                  SMS Text Messages
                </Typography>
              }
            />{' '}
            <FormControlLabel
              sx={{
                '.MuiButtonBase-root': {
                  py: 0,
                  px: '2px',
                  ml: '14px',
                },
              }}
              control={<CheckBoxInput control={control} name={'email'} notValidate={true} />}
              label={
                <Typography sx={{ fontSize: '14px', ml: '8px', fontWeight: 700 }}>
                  Email Messages
                </Typography>
              }
            />
          </div>
        </div>
      )
      break

    default:
      break
  }
}

export default ProfileInputs
