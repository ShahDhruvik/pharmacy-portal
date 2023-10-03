import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { FormTypeArray } from '../../../../types/common'
import { FORMTYPE } from '../../../../utils/constants'
import CheckBoxInput from '@/components/CheckBoxInput'
import { Control } from 'react-hook-form'

type Props = {
  signType: FormTypeArray
  roboName: string
  tncName: string
  control: Control<any> | undefined
}

const PermissionForm = ({ signType, roboName, tncName, control }: Props) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      sx={{
        '& .MuiFormControlLabel-root': {
          mx: 0,
        },
      }}
      gap={1}
    >
      <FormControlLabel
        sx={{
          '.MuiButtonBase-root': {
            py: 0,
            px: '2px',
          },
        }}
        disabled={signType.includes(FORMTYPE.OTP)}
        control={<CheckBoxInput control={control} name={roboName} />}
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
        control={<CheckBoxInput control={control} name={tncName} />}
        label={
          <Typography sx={{ fontSize: '14px' }}>
            {`Agree to `}
            <Link to={'/'} className='text-blue-main'>
              terms and conditions
            </Link>
          </Typography>
        }
      />
    </Box>
  )
}

export default PermissionForm
