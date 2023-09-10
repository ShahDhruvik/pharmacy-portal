// All the context regarding the web are defined here
// This particular context states the override styles for MUI components and other sufficient style requirements
'use client'
import React, { ReactNode } from 'react'
import { createTheme, Theme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { PaletteColor } from '../types/common'

declare module '@mui/material/styles' {
  interface Palette {
    customYellow?: PaletteColor
    customViolet?: PaletteColor
  }
  interface PaletteOptions {
    customYellow?: PaletteColor
    customViolet?: PaletteColor
  }
  interface TypographyVariants {
    btnTxt: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    btnTxt?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    btnTxt: true
  }
}

type Props = {
  children: ReactNode
}

export const theme: Theme = createTheme({
  palette: {
    customYellow: {
      main: '#F0C51A',
    },
    customViolet: {
      main: '#3441A3',
    },
  },
  typography: {},
  components: {},
})

const AppThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default AppThemeProvider
