import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { FormTypeArray } from '../../../../types/common'
import { FORMTYPE } from '../../../../utils/constants'
import CheckBoxInput from '@/components/CheckBoxInput'
import { Control, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { VALIDATION_MESSAGE } from '@/utils/commonMessages'
import { useNavigate } from 'react-router-dom'

type Props = {
  signType: FormTypeArray
  roboName: string
  tncName: string
  control: Control<any> | undefined
  errors: boolean
  setValue: UseFormSetValue<any>
  trigger: UseFormTrigger<any>
  handleClose: () => void
  isDisabled?: boolean
}

const PermissionForm = ({
  signType,
  roboName,
  tncName,
  control,
  errors,
  setValue,
  trigger,
  handleClose,
  isDisabled,
}: Props) => {
  const nav = useNavigate()
  return (
    <div>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        sx={{
          '& .MuiFormControlLabel-root': {
            mx: 0,
          },
        }}
      >
        <FormControlLabel
          sx={{
            '.MuiButtonBase-root': {
              py: 0,
              px: '2px',
            },
          }}
          disabled={signType.includes(FORMTYPE.OTP)}
          control={
            <CheckBoxInput
              control={control}
              name={roboName}
              setValue={setValue}
              trigger={trigger}
              isDisabled={isDisabled}
            />
          }
          label={<Typography sx={{ fontSize: '14px' }}>I am not a robot</Typography>}
        />
        <FormControlLabel
          sx={{
            '.MuiButtonBase-root': {
              py: 0,
              px: '2px',
            },
          }}
          disabled={signType.includes(FORMTYPE.OTP)}
          control={
            <CheckBoxInput
              control={control}
              name={tncName}
              setValue={setValue}
              trigger={trigger}
              isDisabled={isDisabled}
            />
          }
          label={
            <Typography sx={{ fontSize: '14px' }}>
              {`Agree to `}
              <span role='button' className='text-blue-main'>
                terms and conditions
              </span>
            </Typography>
          }
        />
      </Box>
      {errors && (
        <p className='text-center text-sm mt-2 text-lightOrange-main'>
          {VALIDATION_MESSAGE.checkBoxValidation}
        </p>
      )}
    </div>
  )
}

export default PermissionForm
