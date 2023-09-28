import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import { FormTypeArray } from '../../../../types/common'
import { FORMTYPE } from '../../../../utils/constants'

type Props = {
  signType: FormTypeArray
}

const PermissionForm = ({ signType }: Props) => {
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
        control={<Checkbox />}
        label={<p className='text-sm'>I am not a robot</p>}
      />
      <FormControlLabel
        sx={{
          '.MuiButtonBase-root': {
            py: 0,
            px: '2px',
          },
        }}
        disabled={signType.includes(FORMTYPE.OTP)}
        control={<Checkbox />}
        label={
          <p className='text-sm'>
            Agree to{' '}
            <Link to={'/'}>
              <span className='text-blue-700'>terms and conditions</span>
            </Link>
          </p>
        }
      />
    </Box>
  )
}

export default PermissionForm
