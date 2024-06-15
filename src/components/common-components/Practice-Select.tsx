import { SelectDDL } from '@/utils/types/common'
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
      selectedPractice: { _id: acDefaultValue._id, label: 'Select Practice' },
    },
  })
  return (
    <SelectInput
      control={control}
      clearErrors={clearErrors}
      label=''
      name='selectedPractice'
      options={[{ _id: acDefaultValue._id, label: 'Select Practice' }]}
      setError={setError}
      setValue={setValue}
      validation={{}}
      size='small'
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
      }}
      notRequired={true}
    />
  )
}

export default PracticeSelect
