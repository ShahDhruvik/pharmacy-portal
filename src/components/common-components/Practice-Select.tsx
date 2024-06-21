import { SelectDDL } from '@/types/common'
import { acDefaultValue } from '@/utils/form.validation'
import React from 'react'
import { useForm } from 'react-hook-form'
import SelectInput from '@/components/form-inputs/SelectInput'
import { usePharmacy } from '@/context/pharmacyContext'
import { Dropdowns } from '@/utils/constants'
type PracticeConfigurationType = {
  selectedPractice: SelectDDL
}
type Props = {}

const PracticeSelect = (props: Props) => {
  const { pharmacyList, selectedPharmacy, setPharmacyList, setSelectedPharmacy } = usePharmacy()
  const { control, clearErrors, setError, setValue } = useForm<PracticeConfigurationType>({
    defaultValues: {
      selectedPractice: selectedPharmacy,
    },
  })
  return (
    <SelectInput
      control={control}
      clearErrors={clearErrors}
      label=''
      name='selectedPractice'
      options={pharmacyList}
      setError={setError}
      setValue={setValue}
      validation={{}}
      size='small'
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
      }}
      notRequired={true}
      drpName={Dropdowns?.Pharmacy}
      loading={{ isLoading: false }}
    />
  )
}

export default PracticeSelect
