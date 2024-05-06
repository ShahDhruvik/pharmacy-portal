import { Autocomplete, TextField, MenuItem, Tooltip, SxProps, Theme } from '@mui/material'
import { acDefaultValue } from '../utils/form.validation'
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  useController,
} from 'react-hook-form'
import { splitDescription } from '../utils/constants'
import { SelectDDL } from '../types/common'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import { theme } from '@/context/ThemeProvider'
import { useEffect } from 'react'

type Props = {
  options: SelectDDL[]
  name: string
  control: Control<any> | undefined
  label: string
  setValue: UseFormSetValue<any>
  setError: UseFormSetError<any>
  clearErrors: UseFormClearErrors<any>
  validation: any
  notRequired?: boolean
  tooltip?: { isTooltip: boolean; length: number }
  sx?: SxProps<Theme>
  handleChange?: () => void
  isDisabled?: boolean
  selectDefault?: boolean
  handleOnChange?: any
}

const listBoxPropsDropdown = () => {
  return {
    sx: {
      maxHeight: 300,
      overflow: 'auto',
      '&& .Mui-selected': {
        backgroundColor: 'rgba(226, 0, 116, 0.7) !important',
        fontWeight: '500 !important',
      },
    },
    className: 'scrollBarNone',
  }
}
const ListItemDropdown = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: any,
  _id: string,
  isSplitTrue: boolean,
  length: number,
) => {
  if (option.label.length < 13 || !isSplitTrue || isSplitTrue === undefined) {
    return (
      <MenuItem
        {...props}
        key={option._id}
        sx={{
          color: 'black',
          fontWeight: option._id === _id ? '500' : '300',
          backgroundColor: 'white',
        }}
        selected={option._id === _id}
      >
        {option.label}
      </MenuItem>
    )
  } else {
    return (
      <Tooltip title={option.label} placement='right-end' arrow key={option._id}>
        <MenuItem
          {...props}
          key={option._id}
          sx={{
            color: 'black',
            fontWeight: '300',
            backgroundColor: 'white',
          }}
          selected={option._id === _id}
        >
          {splitDescription(option.label, length)}
        </MenuItem>
      </Tooltip>
    )
  }
}
const SelectInput = ({
  name,
  control,
  notRequired,
  validation,
  setValue,
  setError,
  clearErrors,
  label,
  tooltip,
  options,
  handleChange,
  sx,
  isDisabled,
  selectDefault,
  handleOnChange,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }

  const { field, fieldState } = useController({
    name,
    control,
    rules: validation,
    defaultValue: selectDefault ? options[0] : undefined,
  })

  useEffect(() => {
    if (selectDefault && options && options.length > 0) {
      const isCurrentValueDefault = field?.value && field?.value?._id === acDefaultValue?._id

      if (isCurrentValueDefault) {
        setValue(name, options[1])
      }
    }
  }, [selectDefault, options, field.value])

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ fieldState, field }) => (
        <Autocomplete
          disabled={isDisabled}
          sx={inputStyleProps}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          options={options}
          disableClearable
          onChange={(e, val) => {
            if (val !== null) {
              if (!notRequired) {
                setValue(name, val)
                if (handleChange) {
                  handleChange()
                }
                if (handleOnChange) {
                  handleOnChange(val)
                }
                if (val._id === acDefaultValue._id) {
                  setError(name, { type: 'validate', message: `Select ${label}` })
                } else {
                  clearErrors(name)
                }
              } else {
                if (handleChange) {
                  handleChange()
                }
                setValue(name, val)
              }
            }
          }}
          value={field.value || null}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                error={fieldState.invalid}
                placeholder={`Select ${label}`}
                helperText={fieldState.error ? fieldState.error.message : ''}
                label={label}
              />
            )
          }}
          ListboxProps={listBoxPropsDropdown()}
          renderOption={(props, option) =>
            ListItemDropdown(
              props,
              option,
              field.value._id,
              tooltip ? tooltip.isTooltip : false,
              tooltip ? tooltip.length : 13,
            )
          }
          popupIcon={
            <ArrowCircleDownOutlinedIcon
              sx={{ width: 24, height: 24, fill: theme.palette.mDarkGray?.main }}
            />
          }
        />
      )}
    />
  )
}

export default SelectInput
