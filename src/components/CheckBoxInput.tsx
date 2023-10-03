import { Checkbox } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import SvgIcon from './SvgIcon'
import { useToast } from '@/hooks/useToast'

type Props = {
  name: string
  control: Control<any> | undefined
}

const CheckBoxInput = ({ control, name }: Props) => {
  const shoeToast = useToast()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Checkbox
            {...field}
            checkedIcon={
              <SvgIcon iconName='check-box' svgProp={{ width: '1rem', height: '1rem' }} />
            }
            checked={field.value ?? false}
            indeterminateIcon={
              <SvgIcon iconName='check-box' svgProp={{ width: '1rem', height: '1rem' }} />
            }
            icon={<div className='h-4 aspect-square  border-[2px] border-black-main'></div>}
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
