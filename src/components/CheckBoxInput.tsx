import { Checkbox } from '@mui/material'
import { Control, Controller, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import SvgIcon from './SvgIcon'
import { useToast } from '@/hooks/useToast'

type Props = {
  name: string
  control: Control<any> | undefined
  setValue: UseFormSetValue<any>
  trigger: UseFormTrigger<any>
  handleToggle?: (checked: boolean) => void
  isDisabled?: boolean
}

const CheckBoxInput = ({ control, name, handleToggle, setValue, trigger, isDisabled }: Props) => {
  const shoeToast = useToast()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Checkbox
            {...field}
            checked={field.value ?? false}
            onChange={(e, checked) => {
              setValue(name, checked)
              trigger(name)
              if (handleToggle) {
                handleToggle(checked)
              }
            }}
            disabled={isDisabled}
          />
        )
      }}
      rules={{
        validate: (val) => val || 'Check the conditions',
      }}
    />
  )
}

export default CheckBoxInput
