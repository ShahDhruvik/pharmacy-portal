import { SelectDDL } from '@/types/common'
import { acDefaultValue } from '@/utils/form.validation'
import React from 'react'
import { useForm } from 'react-hook-form'
import SelectInput from '@/components/form-inputs/SelectInput'
type PracticeConfigurationType = {
  selectedPractice: SelectDDL
}
type Props = {}

const PracticeSelect = (props: Props) => {
  const { control, clearErrors, setError, setValue } = useForm<PracticeConfigurationType>({
    defaultValues: {
      selectedPractice: acDefaultValue,
    },
  })
  return (
    <SelectInput
      control={control}
      clearErrors={clearErrors}
      label='Select Practice'
      name='selectedPractice'
      options={[acDefaultValue]}
      setError={setError}
      setValue={setValue}
      validation={{}}
      size='small'
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
      }}
    />
  )
}

export default PracticeSelect
