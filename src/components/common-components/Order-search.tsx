import { useForm } from 'react-hook-form'
import SelectInput from '../form-inputs/SelectInput'
import { acDefaultValue } from '@/utils/form.validation'
import { SelectDDL } from '@/types/common'

type OrderSearchType = {
  selectedPatient: SelectDDL
}
type Props = {}

const OrderSearch = (props: Props) => {
  const { control, clearErrors, setError, setValue } = useForm<OrderSearchType>({
    defaultValues: {
      selectedPatient: acDefaultValue,
    },
  })
  return (
    <SelectInput
      control={control}
      clearErrors={clearErrors}
      label='Select Patient'
      name='selectedPatient'
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

export default OrderSearch
