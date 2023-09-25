import { TextField, FormHelperText } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { txtFieldValidation } from '../utils/form.validation'
type Props = {
  name: string[]
  control: Control<any> | undefined
}

const OtpInput = ({ name, control }: Props) => {
  let errorMessage = ''
  const defaultProps = {
    inputProps: { maxLength: 1 },
    sx: {
      maxWidth: 40,
      '.MuiOutlinedInput-notchedOutline': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      '.MuiOutlinedInput-input': {
        textAlign: 'center',
      },
    },
  }
  return (
    <>
      {' '}
      <div>
        <Controller
          name={name[0]}
          control={control}
          render={({ field, fieldState }) => {
            errorMessage = fieldState.error?.message as string
            return (
              <TextField
                {...field}
                inputProps={{ maxLength: 1 }}
                sx={{
                  maxWidth: 40,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                  '.MuiOutlinedInput-input': {
                    textAlign: 'center',
                  },
                }}
                error={fieldState.invalid}
              />
            )
          }}
          rules={{ ...txtFieldValidation(true, 'PositiveNumbers') }}
        />
        <Controller
          name={name[1]}
          control={control}
          render={({ field, fieldState }) => {
            return <TextField {...field} {...defaultProps} error={fieldState.invalid} />
          }}
          rules={{ ...txtFieldValidation(true, 'PositiveNumbers') }}
        />
        <Controller
          name={name[2]}
          control={control}
          render={({ field, fieldState }) => {
            return <TextField {...defaultProps} {...field} error={fieldState.invalid} />
          }}
          rules={{ ...txtFieldValidation(true, 'PositiveNumbers') }}
        />
        <Controller
          name={name[3]}
          control={control}
          render={({ field, fieldState }) => {
            return <TextField {...defaultProps} {...field} error={fieldState.invalid} />
          }}
          rules={{ ...txtFieldValidation(true, 'PositiveNumbers') }}
        />
        <Controller
          name={name[4]}
          control={control}
          render={({ field, fieldState }) => {
            return <TextField {...defaultProps} {...field} error={fieldState.invalid} />
          }}
          rules={{ ...txtFieldValidation(true, 'PositiveNumbers') }}
        />
        <Controller
          name={name[5]}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                {...field}
                inputProps={{ maxLength: 1 }}
                sx={{
                  maxWidth: 40,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                  '.MuiOutlinedInput-input': {
                    textAlign: 'center',
                  },
                }}
                error={fieldState.invalid}
              />
            )
          }}
          rules={{ ...txtFieldValidation(true, 'PositiveNumbers') }}
        />
      </div>
      <FormHelperText>{errorMessage}</FormHelperText>
    </>
  )
}

export default OtpInput
