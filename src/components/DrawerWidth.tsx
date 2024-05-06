import { theme } from '@/context/ThemeProvider'
import { useMediaQuery } from '@mui/material'

export const useDrawerWidth = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(1500))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  let drawerWidth

  if (isLargeScreen) {
    drawerWidth = '25%'
  } else if (isMediumScreen) {
    drawerWidth = '40%'
  } else if (isSmallScreen) {
    drawerWidth = '100%'
  } else {
    drawerWidth = '60%'
  }

  return drawerWidth
}
