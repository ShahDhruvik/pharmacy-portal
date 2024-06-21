import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { SxProps, TextFieldProps, Theme } from '@mui/material'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import theme from '@/theme/defaultTheme'
import { MobileDatePickerProps, MobileDateTimePickerProps } from '@mui/x-date-pickers'
type Props = {
  name: string
  control: Control<any>
  setValue: UseFormSetValue<any>
  label: string
  setError: any
  clearErrors: any
  validation: any
  required: boolean
  minDate?: Date | null
  handleChange: (val: Date | null) => void
  isDisabled?: boolean
  sx?: SxProps<Theme>
  size?: TextFieldProps['size']
  actions?: any
}
const TimeInput = ({
  control,
  label,
  isDisabled,
  sx,
  name,
  handleChange,
  setError,
  clearErrors,
  required,
  validation,
  setValue,
  size,
  actions,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={['MobileTimePicker']}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <MobileTimePicker
              label='Basic time picker'
              onChange={(val) => {
                if (required) {
                  if (val === null) {
                    setError(name, {
                      type: 'validate',
                      message: `Select ${label}`,
                    })
                  } else {
                    clearErrors(name)
                  }
                }
                console.log(val)
              }}
              value={value}
              slotProps={{
                textField: {
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message ?? '',
                  InputLabelProps: { shrink: true },
                  placeholder: `Select ${label}`,
                  disabled: isDisabled ?? false,
                  sx: inputStyleProps,
                  label: label,
                  ...(size && { size: size }),
                },
                actionBar: {
                  actions: actions ? actions : ['accept', 'clear'],
                  sx: {
                    '& .MuiButtonBase-root': {
                      color: 'white !important',
                      minWidth: 100,
                      maxWidth: 100,
                      maxHeight: 20,
                      background: theme.palette.mPink?.main,
                      ':hover': {
                        background: theme.palette.mPink?.main,
                      },
                    },
                  },
                },

                // popper: {
                //   sx: {
                //     '& .MuiButtonBase-root.Mui-selected': {
                //       color: 'white !important',
                //       backgroundColor: 'rgba(226, 0, 116, 1) !important',
                //     },
                //   },
                // },
              }}
              ampm={true}
              // openTo={'meridiem'}
              closeOnSelect={false}
              onAccept={(val) => {
                setValue(name, val)
                handleChange(val)
              }}
            />
          )}
          rules={validation}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default TimeInput
