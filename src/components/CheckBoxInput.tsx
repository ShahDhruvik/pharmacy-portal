import { Checkbox } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import SvgIcon from './SvgIcon'
import { useToast } from '@/hooks/useToast'
import { theme } from '@/context/ThemeProvider'

type Props = {
  name: string
  control: Control<any> | undefined
  notValidate?: boolean
  isDisabled?: boolean
}

const CheckBoxInput = ({ control, name, notValidate, isDisabled }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Checkbox
            {...field}
            checked={field.value ?? false}
            // icon={
            //   <div
            //     className={`h-4 aspect-square  border-[2px] ${
            //       isDisabled ? 'border-midGray-main' : 'border-black-main'
            //     }`}
            //   ></div>
            // }
            disabled={isDisabled}
          />
        )
      }}
      rules={{
        ...(!notValidate && {
          validate: (val) => val || 'Check the conditions',
        }),
      }}
    />
  )
}

export default CheckBoxInput
