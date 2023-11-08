import MobileInput from '@/components/MobileInput'
import { FieldProfState, HeadProfState } from '@/types/common'
import { ALIGN_DIALOG, PROF_FIELDS } from '@/utils/constants'
import { Dispatch, SetStateAction } from 'react'
import {
  Control,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'
import { Button, FormControlLabel, Typography, Divider, DialogTitle } from '@mui/material'
import TxtInput from '@/components/TxtInput'
import { acDefaultValue, searchSelectValidation, txtFieldValidation } from '@/utils/form.validation'
import CheckBoxInput from '@/components/CheckBoxInput'
import { ProFileFormFields } from './ProfileEdit'
import { FieldStateProps } from './Profilebar'
import { theme } from '@/context/ThemeProvider'
import SelectInput from '@/components/SelectInput'
import CustomDialog from '@/components/Dialog-custom'
import SvgIcon from '@/components/SvgIcon'
type Props = {
  fieldName: FieldStateProps
  setFieldName: Dispatch<SetStateAction<FieldStateProps>>
  control: Control<ProFileFormFields, any>
  reset: UseFormReset<ProFileFormFields>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  getValues: UseFormGetValues<any>
  trigger: UseFormTrigger<ProFileFormFields>
  setIsOtp: Dispatch<SetStateAction<boolean>>
  isOtp: boolean
  formData: ProFileFormFields | undefined
  clearErrors: UseFormClearErrors<ProFileFormFields>
  setError: UseFormSetError<ProFileFormFields>
}

const country = [
  acDefaultValue,
  {
    _id: 'India',
    label: 'India',
  },
  { _id: 'USA', label: 'USA' },
]

const ConfirmPopUp = ({
  setFieldName,
  fieldName,
  reset,
  formData,
}: {
  setFieldName: Dispatch<SetStateAction<FieldStateProps>>
  fieldName: FieldStateProps
  reset: UseFormReset<ProFileFormFields>
  formData: ProFileFormFields | undefined
}) => {
  const handleYes = () => {
    switch (fieldName.fieldName) {
      case PROF_FIELDS.COMMUNICATION_PREFERENCE:
        // API For Update
        break

      default:
        break
    }
    console.log(formData)
  }
  return (
    <CustomDialog
      action={{ component: null, isAction: false }}
      handleClose={() => {
        setFieldName({ ...fieldName, isConfirm: false })
      }}
      open={fieldName.isConfirm as boolean}
      header={{
        component: (
          <DialogTitle
            sx={{
              padding: '16px 24px 14px 24px',
            }}
          >
            <div className='flex justify-end items-baseline -mt-2 -mr-4'>
              <button
                onClick={() => {
                  reset((formValues) => {
                    return formValues
                  })
                  setFieldName({ ...fieldName, isConfirm: false })
                }}
              >
                <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mDarkGray?.main }} />
              </button>
            </div>
          </DialogTitle>
        ),
        isHeader: true,
      }}
      align={ALIGN_DIALOG.MID_RIGHT}
      maxWidth='sm'
    >
      <div className=' flex flex-col gap-4 items-center'>
        <p className='p-2 rounded-md  '>Are you sure you want to change ?</p>
        <div className='flex justify-between gap-3 px-5'>
          <Button
            color='mPink'
            sx={{ minWidth: '150px' }}
            onClick={() => {
              reset((formValues) => {
                return formValues
              })
              setFieldName({ ...fieldName, isConfirm: false })
            }}
          >
            No
          </Button>
          <Button color='mPink' sx={{ minWidth: '150px' }} onClick={handleYes}>
            Yes
          </Button>
        </div>
      </div>
    </CustomDialog>
  )
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
  reset,
  formData,
  setFieldName,
  clearErrors,
  setError,
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
            handleChange={() => {
              trigger(PROF_FIELDS.COMMUNICATION_MOBILE ? 'comMobile' : 'profMobile')
            }}
            codeName={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comCountryCode' : 'profCountryCode'}
            sx={{
              minWidth: 350,
            }}
            isDisabled={isOtp}
          />
          <p className='text-lg ml-[6px] mb-1'>{`Confirm new ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <MobileInput
            control={control}
            name={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comMobileConfirm' : 'profMobileConfirm'}
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            setValue={setValue}
            watch={watch}
            handleChange={() => {
              trigger(PROF_FIELDS.COMMUNICATION_MOBILE ? 'comMobileConfirm' : 'profMobileConfirm')
            }}
            codeName={
              PROF_FIELDS.COMMUNICATION_MOBILE ? 'comCountryCodeConfirm' : 'profCountryCodeConfirm'
            }
            sx={{
              minWidth: 350,
            }}
            isDisabled={isOtp}
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
                marginTop: '5px',
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
            handleChange={() => {
              trigger(PROF_FIELDS.COMMUNICATION_MOBILE ? 'comEmail' : 'profEmail')
            }}
            sx={{
              minWidth: 350,
            }}
            validation={{ ...txtFieldValidation(true, 'Email') }}
            isDisabled={isOtp}
          />
          <p className='text-lg ml-[6px] mb-1'>{`Confirm new ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <TxtInput
            control={control}
            name={PROF_FIELDS.COMMUNICATION_MOBILE ? 'comEmailConfirm' : 'profEmailConfirm'}
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            handleChange={() => {
              trigger(PROF_FIELDS.COMMUNICATION_MOBILE ? 'comEmailConfirm' : 'profEmailConfirm')
            }}
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
            isDisabled={isOtp}
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
        <div>
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
                control={
                  <CheckBoxInput
                    control={control}
                    name={'whatsapp'}
                    notValidate={true}
                    isDisabled={fieldName.isConfirm}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: '14px',
                      ml: '8px',
                      fontWeight: 700,
                      color: fieldName.isConfirm
                        ? theme.palette.mMediumGray?.main
                        : theme.palette.mBlack?.main,
                    }}
                  >
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
                control={
                  <CheckBoxInput
                    control={control}
                    name={'sms'}
                    notValidate={true}
                    isDisabled={fieldName.isConfirm}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: '14px',
                      ml: '8px',
                      fontWeight: 700,
                      color: fieldName.isConfirm
                        ? theme.palette.mMediumGray?.main
                        : theme.palette.mBlack?.main,
                    }}
                  >
                    SMS Text Messages
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
                control={
                  <CheckBoxInput
                    control={control}
                    name={'email'}
                    notValidate={true}
                    isDisabled={fieldName.isConfirm}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: '14px',
                      ml: '8px',
                      fontWeight: 700,
                      color: fieldName.isConfirm
                        ? theme.palette.mMediumGray?.main
                        : theme.palette.mBlack?.main,
                    }}
                  >
                    Email Messages
                  </Typography>
                }
              />
            </div>
          </div>
          {fieldName.isConfirm && (
            <ConfirmPopUp
              fieldName={fieldName}
              formData={formData}
              reset={reset}
              setFieldName={setFieldName}
            />
          )}
        </div>
      )
      break
    case PROF_FIELDS.COUNTRY_FIELD:
      return (
        <div>
          <SelectInput
            control={control}
            name='country'
            label='Country'
            options={country}
            clearErrors={clearErrors}
            setError={setError}
            setValue={setValue}
            validation={searchSelectValidation('country')}
            isDisabled={fieldName.isConfirm}
          />
          {fieldName.isConfirm && (
            <ConfirmPopUp
              fieldName={fieldName}
              formData={formData}
              reset={reset}
              setFieldName={setFieldName}
            />
          )}
        </div>
      )
      break
    default:
      break
  }
}

export default ProfileInputs
