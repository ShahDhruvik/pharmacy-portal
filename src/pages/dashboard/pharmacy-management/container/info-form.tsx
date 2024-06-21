import SelectInput from '@/components/form-inputs/SelectInput'
import TxtInput from '@/components/form-inputs/TxtInput'
import { LoadingContextType, SelectDDL } from '@/types/common'
import { pharmacyModesOptions, pharmacyTypesOptions } from '@/types/pharmacy-types'
import { Dropdowns } from '@/utils/constants'
import {
  acDefaultValue,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import { Divider } from '@mui/material'
import React, { useEffect } from 'react'
import {
  Control,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form'

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
  readonly: boolean
}

const InfoForm = ({
  control,
  trigger,
  clearErrors,
  setError,
  setValue,
  countryOptions,
  stateOptions,
  cityOptions,
  drpState,
  loading,
  drpCity,
  drpCountry,
  readonly,
}: Props) => {
  return (
    <div>
      <div className='grid grid-cols-3 gap-5'>
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('name')
          }}
          label='Pharmacy Name*'
          name='name'
          placeholder=''
          validation={txtFieldValidation(true)}
          size='small'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('phone')
          }}
          label='Pharmacy Phone*'
          name='phone'
          placeholder=''
          validation={numberFieldValidation(true, 'Phone')}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('mobile')
          }}
          label='Pharmacy Mobile*'
          name='mobile'
          placeholder=''
          validation={numberFieldValidation(true, 'Phone')}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('email')
          }}
          label='Pharmacy Email*'
          name='email'
          placeholder=''
          validation={txtFieldValidation(true, 'Email')}
          size='small'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          label='Pharmacy Website'
          name='website'
          placeholder=''
          validation={{}}
          size='small'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {}}
          label='Pharmacy Fax'
          name='fax'
          placeholder=''
          validation={{}}
          size='small'
          isDisabled={readonly}
        />
        <SelectInput
          clearErrors={clearErrors}
          control={control}
          drpName={Dropdowns?.Pharmacy}
          label='Pharmacy Mode*'
          loading={{ isLoading: false }}
          name='mode'
          options={pharmacyModesOptions}
          setError={setError}
          setValue={setValue}
          validation={{}}
          notRequired
          size={'small'}
          isDisabled={readonly}
        />
        <SelectInput
          clearErrors={clearErrors}
          control={control}
          drpName={Dropdowns?.Pharmacy}
          label='Pharmacy type*'
          loading={{ isLoading: false }}
          name='type'
          options={pharmacyTypesOptions}
          setError={setError}
          setValue={setValue}
          validation={{}}
          notRequired
          size={'small'}
          isDisabled={readonly}
        />
      </div>
      <Divider sx={{ my: 3 }} />
      <div className='grid grid-cols-3 gap-5'>
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('addressLineOne')
          }}
          label='Address Line 1*'
          name='addressLineOne'
          placeholder=''
          validation={txtFieldValidation(true)}
          size='small'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('addressLineTwo')
          }}
          label='Address Line 2'
          name='addressLineTwo'
          placeholder=''
          validation={{}}
          size='small'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('pinCode')
          }}
          label='Postal Code*'
          name='pinCode'
          placeholder=''
          validation={numberFieldValidation(true, 'Pincode')}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <SelectInput
          control={control}
          setValue={setValue}
          validation={searchSelectValidation('Country*')}
          label='Country*'
          name='countryId'
          options={countryOptions}
          loading={loading}
          drpName={Dropdowns.Country}
          size='small'
          clearErrors={clearErrors}
          setError={setError}
          handleChange={(value: SelectDDL) => {
            if (value._id !== acDefaultValue._id) {
              drpState([value?._id], true)
            }
          }}
          isDisabled={readonly}
        />
        <SelectInput
          control={control}
          setValue={setValue}
          validation={searchSelectValidation('State*')}
          label='State*'
          name='stateId'
          options={stateOptions}
          loading={loading}
          drpName={Dropdowns.State}
          size='small'
          clearErrors={clearErrors}
          setError={setError}
          handleChange={(value) => {
            if (value._id !== acDefaultValue._id) {
              drpCity([value?._id], true)
            }
          }}
          isDisabled={readonly}
        />
        <SelectInput
          control={control}
          setValue={setValue}
          validation={searchSelectValidation('City*')}
          label='City*'
          name='cityId'
          options={cityOptions}
          loading={loading}
          drpName={Dropdowns.City}
          size='small'
          clearErrors={clearErrors}
          setError={setError}
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('lat')
          }}
          label='latitude'
          name='lat'
          placeholder=''
          validation={{}}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('long')
          }}
          label='longitude'
          name='long'
          placeholder=''
          validation={{}}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('license')
          }}
          label='License No'
          name='license'
          placeholder=''
          validation={{}}
          size='small'
          type='number'
          isDisabled={readonly}
        />
      </div>
      <Divider sx={{ my: 3 }} />
      <div className='grid grid-cols-3 gap-5'>
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('contactPerson')
          }}
          label='Contact Person Name*'
          name='contactPerson'
          placeholder=''
          validation={txtFieldValidation(true)}
          size='small'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('contactPersonPhone')
          }}
          label='Contact Person Phone*'
          name='contactPersonPhone'
          placeholder=''
          validation={numberFieldValidation(true, 'Phone')}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('contactPersonMobile')
          }}
          label='Contact Person Mobile*'
          name='contactPersonMobile'
          placeholder=''
          validation={numberFieldValidation(true, 'Phone')}
          size='small'
          type='number'
          isDisabled={readonly}
        />
        <TxtInput
          control={control}
          handleChange={() => {
            trigger('contactPersonEmail')
          }}
          label='Contact Person Email*'
          name='contactPersonEmail'
          placeholder=''
          validation={txtFieldValidation(true, 'Email')}
          size='small'
          isDisabled={readonly}
        />
      </div>
    </div>
  )
}

export default InfoForm
