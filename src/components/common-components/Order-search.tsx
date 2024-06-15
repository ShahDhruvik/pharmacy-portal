import { useForm } from 'react-hook-form'
import SelectInput from '../form-inputs/SelectInput'
import { acDefaultValue } from '@/utils/form.validation'
import { SelectDDL } from '@/utils/types/common'

type OrderSearchType = {
  selectedPatient: SelectDDL
}
type Props = {}

const OrderSearch = (props: Props) => {
  const { control, clearErrors, setError, setValue } = useForm<OrderSearchType>({
    defaultValues: {
      selectedPatient: { _id: acDefaultValue._id, label: 'Select Patient' },
    },
  })
  return (
    <SelectInput
      control={control}
      clearErrors={clearErrors}
      label=''
      name='selectedPatient'
      options={[{ _id: acDefaultValue._id, label: 'Select Patient' }]}
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

export default OrderSearch
