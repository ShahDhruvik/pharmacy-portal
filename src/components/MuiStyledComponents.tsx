import { styled } from '@mui/material/styles'
import { IconButton, InputBase, Select, SelectProps } from '@mui/material'

export const MobileSelect = styled(Select)<SelectProps>(({}) => ({
  '.MuiSvgIcon-root': {
    visibility: 'hidden',
  },
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  paddingRight: 0,
}))

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.mBlack?.main,
  borderRadius: '8px',
  backgroundColor: 'white',
  marginLeft: 0,
  width: '100%',
}))

export const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  pointerEvents: 'all',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    // height: '36px',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
}))
