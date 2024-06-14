import {
  SxProps,
  TextField,
  TextFieldProps,
  TextFieldPropsSizeOverrides,
  Theme,
} from '@mui/material'
import { Controller, Control } from 'react-hook-form'
type Props = {
  placeholder: string
  name: string
  control: Control<any> | undefined
  handleChange: () => void
  validation: any
  isDisabled?: boolean
  sx?: SxProps<Theme>
  multiline?: number
  label?: string
  handleOnChange?: (e: any) => void
  size?: TextFieldProps['size']
}

const TxtInput = ({
  placeholder,
  name,
  control,
  handleChange,
  validation,
  isDisabled,
  sx,
  multiline,
  label,
  handleOnChange,
  size,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...rest } = field
        return (
          <TextField
            {...rest}
            onChange={(e) => {
              onChange(e)
              handleChange()
              if (handleOnChange) {
                handleOnChange(e)
              }
            }}
            placeholder={placeholder}
            error={fieldState.invalid}
            helperText={fieldState.error?.message || ''}
            disabled={isDisabled ?? false}
            sx={inputStyleProps}
            multiline={multiline ? true : false}
            minRows={multiline ?? 0}
            InputLabelProps={{ shrink: true }}
            label={label}
            {...(size && { size: size })}
          />
        )
      }}
      rules={validation}
    />
  )
}

export default TxtInput
