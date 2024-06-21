import React from 'react'
import InfoForm from './info-form'
import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'
import { LoadingContextType, SelectDDL } from '@/types/common'
import ImageForm from './images-form'
import { error } from 'console'
import TimingsForm from './timings-form'

type Props = {
  control: Control<any>
  trigger: UseFormTrigger<any>
  clearErrors: UseFormClearErrors<any>
  setError: UseFormSetError<any>
  setValue: UseFormSetValue<any>
  countryOptions: SelectDDL[]
  stateOptions: SelectDDL[]
  cityOptions: SelectDDL[]
  drpState: (countryIds: string[], onLoadFirstSet: boolean) => void
  drpCity: (stateIds: string[], onLoadFirstSet: boolean) => void
  drpCountry: (onLoadFirstSet: boolean) => void
  loading: LoadingContextType['loading']
  watch: UseFormWatch<any>
  errors: FieldErrors<any>
  register: UseFormRegister<any>
  defaultTimeValues: any
}

const SummaryForm = ({
  countryOptions,
  cityOptions,
  clearErrors,
  control,
  drpCity,
  drpCountry,
  drpState,
  loading,
  setError,
  setValue,
  stateOptions,
  trigger,
  errors,
  register,
  watch,
  defaultTimeValues,
}: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <InfoForm
        cityOptions={cityOptions}
        clearErrors={clearErrors}
        control={control}
        countryOptions={countryOptions}
        drpCity={drpCity}
        drpCountry={drpCountry}
        drpState={drpState}
        loading={loading}
        setError={setError}
        setValue={setValue}
        stateOptions={stateOptions}
        trigger={trigger}
        readonly={true}
      />
      <ImageForm
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        readOnly={true}
      />
      <TimingsForm
        clearErrors={clearErrors}
        control={control}
        defaultTimeValues={defaultTimeValues}
        errors={errors}
        register={register}
        setError={setError}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        readOnly={true}
      />
    </div>
  )
}

export default SummaryForm
