import {
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { useState } from 'react'
import Eye from '@/assets/icons/eye.svg?react'

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
  handleClick?: () => void
  readonly?: boolean
  size?: TextFieldProps['size']
}

const PasswordInput = ({
  placeholder,
  name,
  control,
  handleChange,
  validation,
  isDisabled,
  sx,
  multiline,
  label,
  handleClick,
  readonly,
  size,
}: Props) => {
  //Hide and show passowrd
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
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
            }}
            onClick={() => {
              if (handleClick) {
                handleClick()
              }
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            error={fieldState.invalid}
            helperText={fieldState.error?.message || ''}
            disabled={isDisabled ?? false}
            sx={inputStyleProps}
            multiline={multiline ? true : false}
            minRows={multiline ?? 0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: readonly ? readonly : false,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={toggleShowPassword}
                    sx={{
                      padding: 0,
                    }}
                  >
                    <Eye />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={label}
            {...(size && { size: size })}
          />
        )
      }}
      rules={validation}
    />
  )
}

export default PasswordInput
