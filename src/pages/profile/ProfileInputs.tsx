import MobileInput from '@/components/MobileInput'
import { DrawerState, FieldProfState, HeadProfState, SelectDDL } from '@/types/common'
import { ALIGN_DIALOG, DRAWERSTATE, PROF_FIELDS } from '@/utils/constants'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
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
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import {
  getAllCountry,
  profileCommunicationEdit,
  profileCountryEdit,
  profileEmailEditOtp,
  profileMobileNumberEditOtp,
} from '@/lib/Profile'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

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
  handleDrawerState: (state: DrawerState) => void
}

// const country = [
//   acDefaultValue,
//   {
//     _id: 'India',
//     label: 'India',
//   },
//   { _id: 'USA', label: 'USA' },
// ]

export enum CommunicationPreferenceOpts {
  sms = 'SMS',
  email = 'Email',
}

const ConfirmPopUp = ({
  setFieldName,
  fieldName,
  reset,
  formData, // handleDrawerState,
}: {
  setFieldName: Dispatch<SetStateAction<FieldStateProps>>
  fieldName: FieldStateProps
  reset: UseFormReset<ProFileFormFields>
  formData: ProFileFormFields | undefined
  // handleDrawerState: (state: DrawerState) => void
}) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const handleYes = async () => {
    switch (fieldName.fieldName) {
      case PROF_FIELDS.COMMUNICATION_PREFERENCE:
        // API For Update
        console.log(formData, 'ffff')
        let c
        if (formData?.SMS === true && formData?.Email === undefined) {
          c = `${CommunicationPreferenceOpts.sms}`
        }
        if (formData?.SMS === undefined && formData?.Email === true) {
          c = `${CommunicationPreferenceOpts.email}`
        }
        if (formData?.SMS === true && formData?.Email === true) {
          c = `${CommunicationPreferenceOpts.sms}, ${CommunicationPreferenceOpts.email}`
        }
        const data = {
          communicationPreference: c,
        }

        const respo = await profileCommunicationEdit(setLoading, showToast, data)
        if (respo?.status === 200) {
          reset((formValues) => {
            return formValues
          })
          setFieldName({ ...fieldName, isConfirm: false })
        }
        break
      case PROF_FIELDS.COUNTRY_FIELD:
        // API For Update
        console.log(formData, 'ffffddd')

        const response = await profileCountryEdit(setLoading, showToast, formData?.country)
        if (response?.status === 200) {
          reset((formValues) => {
            return formValues
          })
          setFieldName({ ...fieldName, isConfirm: false })
        }
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
                <HighlightOffIcon sx={{ fill: theme.palette.mDarkGray?.main }} />
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
        <div className='flex justify-between gap-3 '>
          <Button
            color='mPink'
            sx={{ minWidth: '140px' }}
            onClick={() => {
              reset((formValues) => {
                return formValues
              })
              setFieldName({ ...fieldName, isConfirm: false })
            }}
          >
            No
          </Button>
          <Button color='mPink' sx={{ minWidth: '140px' }} onClick={handleYes}>
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
  handleDrawerState,
}: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [country, setCountry] = useState<SelectDDL[]>([])

  const getCountry = async () => {
    const data = await getAllCountry(setLoading, showToast)
    if (data) {
      const con: SelectDDL[] = []
      data?.records?.map((x: any) => {
        const conItem: SelectDDL = { label: `${x.name}`, _id: x._id }
        con.push(conItem)
      })
      setCountry(con)
    }
  }
  console.log(fieldName, 'hh')

  useEffect(() => {
    if (String(fieldName.fieldName) === PROF_FIELDS.COUNTRY_FIELD) {
      getCountry()
    }
  }, [])

  switch (fieldName.fieldName) {
    case fieldName.fieldName === PROF_FIELDS.COMMUNICATION_MOBILE
      ? PROF_FIELDS.COMMUNICATION_MOBILE
      : PROF_FIELDS.PROFILE_MOBILE:
      return (
        <div className='flex flex-col gap-2'>
          <p className='text-lg ml-[6px] mb-1'>{`New ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <MobileInput
            control={control}
            name={
              String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName?.fieldName
                ? 'comMobile'
                : 'profMobile'
            }
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            setValue={setValue}
            watch={watch}
            handleChange={() => {
              trigger(
                String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
                  ? 'comMobile'
                  : 'profMobile',
              )
            }}
            codeName={
              String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
                ? 'comCountryCode'
                : 'profCountryCode'
            }
            sx={{
              minWidth: 350,
            }}
            isDisabled={isOtp}
          />
          <p className='text-lg ml-[6px] mb-1'>{`Confirm new ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <MobileInput
            control={control}
            name={
              String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
                ? 'comMobileConfirm'
                : 'profMobileConfirm'
            }
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            setValue={setValue}
            watch={watch}
            handleChange={() => {
              trigger(
                String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
                  ? 'comMobileConfirm'
                  : 'profMobileConfirm',
              )
            }}
            codeName={
              String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
                ? 'comCountryCodeConfirm'
                : 'profCountryCodeConfirm'
            }
            sx={{
              minWidth: 350,
            }}
            isDisabled={isOtp}
            confirm={{
              isConfirm: true,
              confirmField:
                String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
                  ? 'comMobile'
                  : 'profMobile',
              message: 'Mobile Number does not match',
              codeMatchName:
                String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName
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
                if (String(PROF_FIELDS.COMMUNICATION_MOBILE) === fieldName.fieldName) {
                  const triggeredValue = await trigger(['comMobile', 'comMobileConfirm'])
                  console.log(triggeredValue, 'com')
                  const data = { communicationMobile: getValues('comMobileConfirm') }
                  const res = await profileCommunicationEdit(setLoading, showToast, data)
                  if (res?.status === 200) {
                    handleDrawerState(DRAWERSTATE.NORMAL)
                  }
                  setIsOtp(false)
                } else {
                  const triggeredValue = await trigger(['profMobile', 'profMobileConfirm'])
                  const data = getValues('profMobileConfirm')
                  const res = await profileMobileNumberEditOtp(
                    setLoading,
                    showToast,
                    data as string,
                  )
                  if (res?.status === 200) {
                    setIsOtp(triggeredValue)
                  }
                }
              }}
            >
              Send otp
            </Button>
          )}
        </div>
      )
      break
    case fieldName.fieldName === PROF_FIELDS.COMMUNICATION_EMAIL
      ? PROF_FIELDS.COMMUNICATION_EMAIL
      : PROF_FIELDS.PROFILE_EMAIL:
      return (
        <div className='flex flex-col gap-2'>
          <p className='text-lg ml-[6px] mb-1'>{`New ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <TxtInput
            control={control}
            name={
              String(PROF_FIELDS.COMMUNICATION_EMAIL) === fieldName.fieldName
                ? 'comEmail'
                : 'profEmail'
            }
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            handleChange={() => {
              trigger(
                String(PROF_FIELDS.COMMUNICATION_EMAIL) === fieldName.fieldName
                  ? 'comEmail'
                  : 'profEmail',
              )
            }}
            sx={{
              minWidth: 350,
            }}
            validation={{ ...txtFieldValidation(true, 'Email') }}
            isDisabled={isOtp}
            label='Email'
          />
          <p className='text-lg ml-[6px] mb-1'>{`Confirm new ${fieldName.headName} ${fieldName.fieldName}`}</p>
          <TxtInput
            label='Email'
            control={control}
            name={
              String(PROF_FIELDS.COMMUNICATION_EMAIL) === fieldName.fieldName
                ? 'comEmailConfirm'
                : 'profEmailConfirm'
            }
            placeholder={`Enter new ${fieldName.fieldName?.toLowerCase()}`}
            handleChange={() => {
              trigger(
                String(PROF_FIELDS.COMMUNICATION_EMAIL) === fieldName.fieldName
                  ? 'comEmailConfirm'
                  : 'profEmailConfirm',
              )
            }}
            sx={{
              minWidth: 350,
            }}
            validation={{
              ...txtFieldValidation(true, 'Email'),
              ...{
                validate: (value: string) =>
                  value ===
                    getValues(
                      String(PROF_FIELDS.COMMUNICATION_EMAIL) === fieldName.fieldName
                        ? 'comEmail'
                        : 'profEmail',
                    ) || 'Email does not match',
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
                if (String(PROF_FIELDS.COMMUNICATION_EMAIL) === fieldName.fieldName) {
                  const triggeredValue = await trigger(['comEmail', 'comEmailConfirm'])
                  const data = { communicationEmail: getValues('comEmailConfirm') }
                  const res = await profileCommunicationEdit(setLoading, showToast, data)
                  if (res?.status === 200) {
                    handleDrawerState(DRAWERSTATE.NORMAL)
                  }
                  setIsOtp(triggeredValue)
                } else {
                  const triggeredValue = await trigger(['profEmail', 'profEmailConfirm'])
                  const data = getValues('profEmailConfirm')
                  const res = await profileEmailEditOtp(setLoading, showToast, data as string)
                  if (res?.status === 200) {
                    setIsOtp(triggeredValue)
                  }
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
                    name={CommunicationPreferenceOpts.sms}
                    // notValidate={true}
                    isDisabled={fieldName.isConfirm}
                    setValue={setValue}
                    trigger={trigger}
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
                    Sms
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
                    name={CommunicationPreferenceOpts.email}
                    // notValidate={true}
                    isDisabled={fieldName.isConfirm}
                    setValue={setValue}
                    trigger={trigger}
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
                    Email
                  </Typography>
                }
              />
              {/* <FormControlLabel
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
              /> */}
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
