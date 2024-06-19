import {
  Autocomplete,
  TextField,
  MenuItem,
  Tooltip,
  Typography,
  Chip,
  CircularProgress,
  SxProps,
  Theme,
  TextFieldProps,
} from '@mui/material'
import { splitDescription, tooltipLength } from '@/utils/constants'
import { DropDownOptions, SelectDDL, LoadingContextType } from '@/types/common'
import { FieldError, UseFieldArrayReplace, UseFormTrigger } from 'react-hook-form'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import theme from '@/theme/defaultTheme'
type Props = {
  options: SelectDDL[]
  label: string
  fields: SelectDDL[]
  replace: UseFieldArrayReplace<any, any>
  errors: FieldError | undefined
  trigger: UseFormTrigger<any>
  name: string
  disable?: boolean
  handleChange?: (val: SelectDDL[]) => void
  loading: LoadingContextType['loading']
  dropdownName: DropDownOptions
  sx?: SxProps<Theme>
  customPlaceHolder?: string
  size?: TextFieldProps['size']
}

const listBoxPropsDropdown = () => {
  return {
    sx: {
      maxHeight: 300,
      overflow: 'auto',
      '.Mui-selected': {
        backgroundColor: `${theme.palette.primary.light} !important`,
      },
    },
    className: 'scrollBarNone',
  }
}
const ListItemDropdown = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: SelectDDL,
  fields: SelectDDL[],
  toolTipLength: number,
) => {
  const selected = fields?.find((x) => x._id === option._id)
  return (
    <Tooltip title={option.label} key={option._id} placement='right-end' arrow>
      <MenuItem
        {...props}
        key={option._id}
        sx={{
          color: 'black',
          fontWeight: selected ? '500' : '300',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '100%',
        }}
        selected={selected ? true : false}
      >
        <Typography sx={{ flexGrow: 1 }}>
          {toolTipLength < option.label.length ? splitDescription(option.label) : option.label}
        </Typography>
        {selected && <DoneAllIcon />}
      </MenuItem>
    </Tooltip>
  )
}
const MultiSelectInput = ({
  label,
  options,
  fields,
  replace,
  errors,
  name,
  disable,
  handleChange,
  trigger,
  loading,
  dropdownName,
  sx,
  customPlaceHolder,
  size,
}: Props) => {
  const loadingCondition = loading.isLoading && loading.loadingProps?.dropdown === dropdownName
  return (
    <Autocomplete
      disabled={disable}
      multiple={true}
      isOptionEqualToValue={(option, value) => option._id === String(value._id)}
      getOptionLabel={(option) => option.label}
      options={options}
      disableClearable
      onChange={(e, val) => {
        if (val !== null) {
          replace(val)
          if (handleChange) {
            handleChange(val)
          }
        } else {
          replace([])
        }
        trigger(name)
      }}
      value={fields}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...(size && { size: size })}
            error={errors ? true : false}
            placeholder={
              loadingCondition
                ? 'loading...'
                : customPlaceHolder
                ? customPlaceHolder
                : `Select ${label}`
            }
            helperText={errors?.message ?? ''}
            label={label}
            InputLabelProps={{ shrink: true }}
          />
        )
      }}
      limitTags={2}
      loading={loadingCondition}
      loadingText='loading...'
      ListboxProps={listBoxPropsDropdown()}
      renderOption={(props, option) => ListItemDropdown(props, option, fields, tooltipLength)}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...(size && { size: size })}
            {...getTagProps({ index })}
            label={option.label}
            key={option._id}
            onDelete={() => {
              const leftOverTags = tagValue.filter((x) => x._id !== option._id)
              replace(leftOverTags)
              trigger(name)
            }}
          />
        ))
      }}
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
      sx={{ ...sx }}
    />
  )
}

export default MultiSelectInput
