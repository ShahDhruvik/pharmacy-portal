// All the context regarding the web are defined here
// This particular context states the override styles for MUI components and other sufficient style requirements
'use client'
import React, { ReactNode } from 'react'
import { createTheme, Theme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { PaletteColor } from '../types/common'

declare module '@mui/material/styles' {
  interface Palette {
    mPink?: PaletteColor
  }
  interface PaletteOptions {
    mPink?: PaletteColor
  }
  interface TypographyVariants {
    btnTxt: React.CSSProperties
  }
  interface TypographyVariantsOptions {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true
  }
  interface ButtonPropsColorOverrides {
    mPink: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {}
}

type Props = {
  children: ReactNode
}

export const theme: Theme = createTheme({
  palette: {
    mPink: {
      main: '#e20074',
    },
  },
  typography: {},
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 30,
          minWidth: 200,
          lineHeight: 2,
          textTransform: 'none',
          color: '#ffffff',
        },
      },
      defaultProps: {
        disableRipple: false,
        color: 'error',
      },
    },
  },
})

const AppThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default AppThemeProvider
