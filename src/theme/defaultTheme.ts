import { createTheme, Theme } from '@mui/material/styles'
import { BreakPoints, generateBreakPoints, generatePalette, PaletteColors, ThemeOperator } from './theme-data'
import { DynamicPaletteOptions } from '@/types/mui.types'
import { components } from './theme-component-data'

const theme: Theme = createTheme({
    palette: { ...generatePalette(PaletteColors) as DynamicPaletteOptions },
    typography: {
        fontFamily: [
            'Nunito',
            'serif',
        ].join(','),
    },
    breakpoints: generateBreakPoints(ThemeOperator.MuiOp, BreakPoints) as Record<string, number>,
    components: components

})

export default theme