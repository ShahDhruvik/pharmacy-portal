/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from 'react'
import { createTheme, Theme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import theme from '@/theme/defaultTheme'

type Props = {
  children: ReactNode
}

const AppThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default AppThemeProvider
