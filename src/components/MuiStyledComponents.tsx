import { styled } from '@mui/material/styles'
import { Select, SelectProps } from '@mui/material'

export const MobileSelect = styled(Select)<SelectProps>(({}) => ({
  '.MuiSvgIcon-root': {
    visibility: 'hidden',
  },
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  paddingRight: 0,
}))
