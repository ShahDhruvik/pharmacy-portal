/* eslint-disable no-unsafe-optional-chaining */
import FormBottomBar from '@/components/common-components/FormBottomBar'
import FormDrawer from '@/components/common-components/FormDrawer'
import FormTopBar from '@/components/common-components/FormTopBar'
import { CircularProgress, Divider, Step, StepLabel, Stepper } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { LoadingButton } from '@mui/lab'
import ImagesForm from './sub-forms/images-form'
import InfoForm from './sub-forms/info-form'
import TimingsForm from './timings-form'
import SummaryForm from './sub-forms/summary-form'
import {
  PharmacyFormFields,
  pharmacyModesOptions,
  pharmacyTypesOptions,
} from '@/types/pharmacy-types'
import { acDefaultValue } from '@/utils/form.validation'
import { SelectDDL } from '@/types/common'
import { dropDownCity, dropDownCountry, dropDownState } from '@/lib/location'
import { Dropdowns, formatDateYYYYMMDD } from '@/utils/constants'
import moment from 'moment'
import { useToast } from '@/hooks/useToast'
import { format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns'
import { createPharmacy } from '@/lib/pharmacy'

type Props = {
  openFormDrawer: boolean
  setOpenFormDrawer: Dispatch<SetStateAction<boolean>>
}
const getDefaultStartAndEndDateWithTime = (dateParam: Date) => {
  // Set the time to 9:00 AM
  let startDateWithTime = setHours(dateParam, 9)
  startDateWithTime = setMinutes(startDateWithTime, 0)
  startDateWithTime = setSeconds(startDateWithTime, 0)
  startDateWithTime = setMilliseconds(startDateWithTime, 0)
  let endDateWithTime = setHours(dateParam, 19)
  endDateWithTime = setMinutes(endDateWithTime, 0)
  endDateWithTime = setSeconds(endDateWithTime, 0)
  endDateWithTime = setMilliseconds(endDateWithTime, 0)
  let startLunchDateWithTime = setHours(dateParam, 13)
  startLunchDateWithTime = setMinutes(startLunchDateWithTime, 0)
  startLunchDateWithTime = setSeconds(startLunchDateWithTime, 0)
  startLunchDateWithTime = setMilliseconds(startLunchDateWithTime, 0)
  let endLunchDateWithTime = setHours(dateParam, 14)
  endLunchDateWithTime = setMinutes(endLunchDateWithTime, 0)
  endLunchDateWithTime = setSeconds(endLunchDateWithTime, 0)
  endLunchDateWithTime = setMilliseconds(endLunchDateWithTime, 0)
  return { startDateWithTime, endDateWithTime, startLunchDateWithTime, endLunchDateWithTime }
}
const PharmacyForm = ({ openFormDrawer, setOpenFormDrawer }: Props) => {
  const showToast = useToast()
  const infos = {
    addressLineOne: '',
    name: '',
    phone: '',
    mobile: '',
    email: '',
    mode: pharmacyModesOptions[0],
    type: pharmacyTypesOptions[0],
    countryId: acDefaultValue,
    stateId: acDefaultValue,
    cityId: acDefaultValue,
    contactPerson: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    contactPersonMobile: '',
    tncAccept: false,
    lat: '',
    long: '',
    fax: '',
    pinCode: '',
    license: '',
  }
  const images = {
    sqLogo: { document: null, url: '' },
    rectLogo: { document: null, url: '' },
    images: [],
  }
  const steps = ['Practice Info', 'Practice Pictures', 'Operating Hours', 'Summary']
  const [activeStep, setActiveStep] = useState(0)
  const [country, setCountry] = useState<SelectDDL[]>([])
  const [state, setState] = useState<SelectDDL[]>([])
  const [city, setCity] = useState<SelectDDL[]>([])
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
  const { loading, setLoading } = useLoading()

  const defaultAllDatesForAllDays = {
    startTime: getDefaultStartAndEndDateWithTime(new Date()).startDateWithTime,
    endTime: getDefaultStartAndEndDateWithTime(new Date()).endDateWithTime,
    lunchTimeStart: getDefaultStartAndEndDateWithTime(new Date()).startLunchDateWithTime,
    lunchTimeEnd: getDefaultStartAndEndDateWithTime(new Date()).endLunchDateWithTime,
    breaks: [],
  }
  const defaultValues: PharmacyFormFields = {
    ...infos,
    ...images,
    operatingTiming: [
      {
        day: 'Monday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
      {
        day: 'Tuesday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
      {
        day: 'Wednesday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
      {
        day: 'Thursday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
      {
        day: 'Friday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
      {
        day: 'Saturday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
      {
        day: 'Sunday',
        offDay: false,
        ...defaultAllDatesForAllDays,
      },
    ],
    breaksManage: [],
  }
  const {
    control,
    setValue,
    trigger,
    watch,
    reset,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<PharmacyFormFields>({
    defaultValues: defaultValues,
  })
  const fieldW = watch()
  console.log(fieldW)
  const drpCountry = async (onLoadFirstSet: boolean) => {
    setLoading({ isLoading: true, loadingProps: { dropdown: Dropdowns.Country } })
    const res = await dropDownCountry()
    setCountry(res)
    if (res[0]) {
      if (onLoadFirstSet) {
        reset((frm) => {
          return { ...frm, countryId: res[0] }
        })
      }
      drpState([res[0]?._id], onLoadFirstSet)
    } else {
      setCountry([acDefaultValue])
      setState([acDefaultValue])
      setCity([acDefaultValue])
      reset((frm) => {
        return {
          ...frm,
          countryId: acDefaultValue,
          stateId: acDefaultValue,
          cityId: acDefaultValue,
        }
      })
    }
    setLoading({ isLoading: false })
  }
  const drpState = async (countryIds: any, onLoadFirstSet: boolean) => {
    setLoading({ isLoading: true, loadingProps: { dropdown: Dropdowns.State } })
    if (countryIds[0] !== acDefaultValue._id) {
      const res = await dropDownState(countryIds)
      setState(res)
      if (res[0]) {
        if (onLoadFirstSet) {
          reset((frm) => {
            return { ...frm, stateId: res[0] }
          })
        }
        drpCity([res[0]?._id], onLoadFirstSet)
      } else {
        setState([acDefaultValue])
        setCity([acDefaultValue])
        reset((frm) => {
          return { ...frm, cityId: acDefaultValue, stateId: acDefaultValue }
        })
      }
    } else {
      setState([])
    }
    setLoading({ isLoading: false })
  }

  const drpCity = async (stateIds: any, onLoadFirstSet: boolean) => {
    if (stateIds[0] !== acDefaultValue._id) {
      const res = await dropDownCity(stateIds)
      setCity(res)
      if (res[0]) {
        if (onLoadFirstSet) {
          reset((frm) => {
            return { ...frm, cityId: res[0] }
          })
        }
      } else {
        setCity([acDefaultValue])
        reset((frm) => {
          return { ...frm, cityId: acDefaultValue }
        })
      }
    } else {
      setCity([])
    }
  }

  const StepComponentMap: any = {
    0: (
      <InfoForm
        control={control}
        trigger={trigger}
        clearErrors={clearErrors}
        setError={setError}
        setValue={setValue}
        cityOptions={city}
        countryOptions={country}
        stateOptions={state}
        drpCity={drpCity}
        drpState={drpState}
        loading={loading}
        drpCountry={drpCountry}
        readonly={false}
      />
    ),
    1: (
      <ImagesForm
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        readOnly={false}
      />
    ),
    2: (
      <TimingsForm
        defaultTimeValues={defaultAllDatesForAllDays}
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        clearErrors={clearErrors}
        setError={setError}
        readOnly={false}
      />
    ),
    3: (
      <SummaryForm
        control={control}
        trigger={trigger}
        clearErrors={clearErrors}
        setError={setError}
        setValue={setValue}
        cityOptions={city}
        countryOptions={country}
        stateOptions={state}
        drpCity={drpCity}
        drpState={drpState}
        loading={loading}
        drpCountry={drpCountry}
        register={register}
        watch={watch}
        errors={errors}
        defaultTimeValues={defaultAllDatesForAllDays}
      />
    ),
  }
  useEffect(() => {
    if (openFormDrawer) {
      if (country.length > 0) {
        drpCountry(false)
      } else {
        drpCountry(true)
      }
      console.log('set Edit Fields')
    } else {
      setCountry([])
      setActiveStep(0)
      reset(defaultValues)
    }
  }, [openFormDrawer])
  const checkTimings = async (opTime: PharmacyFormFields['operatingTiming']) => {
    let isValid = true
    for (let indexOp = 0; indexOp < opTime.length; indexOp++) {
      const element = opTime[indexOp]
      if (element?.breaks?.length > 0) {
        for (let indexBrk = 0; indexBrk < element?.breaks.length; indexBrk++) {
          const tig1 = await trigger([
            `operatingTiming.${indexOp}.breaks.${indexBrk}.startTime`,
            `operatingTiming.${indexOp}.breaks.${indexBrk}.endTime`,
          ])
          isValid = tig1
        }
      }
    }
    return isValid
  }
  return (
    <>
      {' '}
      <FormDrawer
        openFormDrawer={openFormDrawer}
        setOpenFormDrawer={setOpenFormDrawer}
        width='100%'
      >
        <FormTopBar
          entityName='Pharmacy Onboarding'
          setOpenFormDrawer={setOpenFormDrawer}
          handleReFetch={() => {}}
        />
        <div className='flex-1 p-container'>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <div className='p-container'>{StepComponentMap[activeStep]}</div>
        </div>
        <div className='sticky bottom-0 bg-mWhite-main'>
          <Divider />
          <div className='px-container py-1 flex gap-5 justify-end'>
            {activeStep !== 0 && (
              <LoadingButton
                variant='text'
                color='mPink'
                sx={{ fontSize: '14px', textTransform: 'uppercase' }}
                onClick={() => {
                  setActiveStep(activeStep - 1)
                }}
              >
                Previous
              </LoadingButton>
            )}
            <LoadingButton
              variant='text'
              color='mPink'
              sx={{ fontSize: '14px', textTransform: 'uppercase' }}
              onClick={async () => {
                if (activeStep === 0) {
                  const validateInfoFields = Object.keys(infos).map((x) => {
                    return x
                  })
                  const tig0 = await trigger(validateInfoFields as any)
                  if (tig0) {
                    setActiveStep(activeStep + 1)
                  }
                } else if (activeStep === 1) {
                  if (fieldW.sqLogo.document !== null && fieldW?.rectLogo?.document !== null) {
                    setActiveStep(activeStep + 1)
                  } else {
                    showToast('info', 'Must select the square and rectangle logo')
                  }
                } else if (activeStep === 2) {
                  const optTimings = fieldW.operatingTiming
                  const isValid = await checkTimings(optTimings)
                  if (isValid) {
                    setActiveStep(activeStep + 1)
                  }
                } else if (activeStep === 3) {
                  setOpenConfirmation(true)
                }
              }}
            >
              {activeStep === 3 ? 'Confirm' : 'Next'}
            </LoadingButton>
          </div>
        </div>
      </FormDrawer>
      <FormDrawer
        openFormDrawer={openConfirmation}
        setOpenFormDrawer={setOpenConfirmation}
        width='30%'
      >
        <div className='flex flex-col flex-1'>
          <div className='flex-1 flex items-center justify-center'>
            <p>Are you sure you want to save the pharmacy?</p>
          </div>
          <div className='sticky bottom-0 bg-mWhite-main'>
            <Divider />
            <div className='px-container py-1 flex gap-5 justify-end'>
              <LoadingButton
                variant='text'
                color='mPink'
                sx={{ fontSize: '14px', textTransform: 'uppercase' }}
                onClick={() => {
                  setOpenConfirmation(false)
                }}
                disabled={loading?.isLoading && loading?.loadingProps?.btnLoading}
              >
                Back
              </LoadingButton>
              <LoadingButton
                variant='text'
                color='mPink'
                sx={{ fontSize: '14px', textTransform: 'uppercase' }}
                onClick={async () => {
                  setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
                  const res = await createPharmacy(fieldW)
                  if (res) {
                    setOpenFormDrawer(false)
                    setOpenConfirmation(false)
                  }
                  setLoading({ isLoading: false })
                }}
                loading={loading?.isLoading && loading?.loadingProps?.btnLoading}
                loadingIndicator={<CircularProgress color='mPink' size={15} thickness={5} />}
              >
                Save
              </LoadingButton>
            </div>
          </div>
        </div>
      </FormDrawer>
    </>
  )
}

export default PharmacyForm
