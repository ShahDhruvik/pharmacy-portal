/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  TextField,
  MenuItem,
  Tooltip,
  SxProps,
  Theme,
  TextFieldProps,
  CircularProgress,
} from '@mui/material'
import { acDefaultValue } from '@/utils/form.validation'
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  useController,
} from 'react-hook-form'
import { Dropdowns, splitDescription } from '@/utils/constants'
import { DropDownOptions, EnumValues, LoadingContextType, SelectDDL } from '@/types/common'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import { useEffect } from 'react'
import theme from '@/theme/defaultTheme'

type Props = {
  options: SelectDDL[]
  name: string
  control: Control<any> | undefined
  label: string
  setValue: UseFormSetValue<any>
  setError: UseFormSetError<any>
  clearErrors: UseFormClearErrors<any>
  loading: LoadingContextType['loading']
  drpName: DropDownOptions
  validation: any
  notRequired?: boolean
  tooltip?: { isTooltip: boolean; length: number }
  sx?: SxProps<Theme>
  handleChange?: (val: SelectDDL) => void
  isDisabled?: boolean
  selectDefault?: boolean
  handleOnChange?: (val: SelectDDL) => void
  size?: TextFieldProps['size']
}

export const listBoxPropsDropdown = () => {
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
export const ListItemDropdown = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: any,
  _id: string,
  isSplitTrue: boolean,
  length: number,
) => {
  if (option?.label?.length < 13 || !isSplitTrue || isSplitTrue === undefined) {
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
  size,
  drpName,
  loading,
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
  const loadingCondition = loading?.isLoading && loading?.loadingProps?.dropdown === drpName
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
                  handleChange(val)
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
                  handleChange(val)
                }
                setValue(name, val)
              }
            }
          }}
          loading={loadingCondition}
          loadingText='loading...'
          {...(loadingCondition && {
            popupIcon: (
              <CircularProgress
                size={size && size === 'small' ? 15 : 25}
                thickness={size && size === 'small' ? 3 : 5}
                sx={{
                  color: theme.palette.mPink.dark,
                }}
              />
            ),
          })}
          value={field.value || null}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                error={fieldState.invalid}
                placeholder={`Select ${label}`}
                helperText={fieldState.error ? fieldState.error.message : ''}
                label={label}
                {...(size && { size: size })}
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
          // popupIcon={
          //   <ArrowCircleDownOutlinedIcon
          //     sx={{ width: 24, height: 24, fill: theme.palette.mDarkGray?.main }}
          //   />
          // }
        />
      )}
    />
  )
}

export default SelectInput
