import { InputAdornment, MenuItem, SxProps, TextField, Theme } from '@mui/material'
import { MobileSelect } from './MuiStyledComponents'
import { countryCodes } from '../utils/data'
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormWatch,
  UseFormGetValues,
} from 'react-hook-form'
import { numberFieldValidation } from '../utils/form.validation'
type Props = {
  placeholder: string
  name: string
  codeName: string
  control: Control<any> | undefined
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  handleChange: () => void
  isDisabled?: boolean
  sx?: SxProps<Theme>
  getValues?: UseFormGetValues<any>
  confirm?: { isConfirm: boolean; confirmField?: string; message?: string; codeMatchName?: string }
}

const MobileInput = ({
  placeholder,
  name,
  codeName,
  control,
  watch,
  setValue,
  handleChange,
  isDisabled,
  sx,
  getValues,
  confirm,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }

  const contryCode = watch(codeName)
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
            sx={inputStyleProps}
            disabled={isDisabled ?? false}
            placeholder={placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MobileSelect
                    value={contryCode}
                    onChange={(e) => {
                      setValue(codeName, e.target.value)
                    }}
                  >
                    {countryCodes.map((x) => {
                      return (
                        <MenuItem value={x} key={x}>
                          {x}
                        </MenuItem>
                      )
                    })}
                  </MobileSelect>
                </InputAdornment>
              ),
              sx: {
                paddingLeft: 0,
              },
            }}
            type='number'
            error={fieldState.invalid}
            helperText={fieldState.error?.message || ''}
          />
        )
      }}
      rules={{
        ...numberFieldValidation(true, 'Phone'),
        ...(confirm &&
          confirm.isConfirm && {
            validate: (value) => {
              console.log(value)
              if (getValues) {
                const val = getValues(confirm.confirmField as string)
                console.log(val, 'sdsd')
              }
              return (
                (value === (getValues && getValues(confirm.confirmField as string)) &&
                  getValues &&
                  getValues(codeName) === getValues(confirm.codeMatchName as string)) ||
                `${confirm.message ?? ''}`
              )
            },
          }),
      }}
    />
  )
}

export default MobileInput

// rules={{
//   required: 'required.',
//   validate: (value) => value === getValues('password') || 'Passwords do not match',
// }}
