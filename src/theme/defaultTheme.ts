import { createTheme, Theme } from '@mui/material/styles'
import { BreakPoints, generateBreakPoints, generatePalette, PaletteColors, ThemeOperator } from './theme-data'
import { DynamicPaletteOptions } from '@/types/mui.types'

const theme: Theme = createTheme({
    palette: { ...generatePalette(PaletteColors) as DynamicPaletteOptions },
    typography: {
        fontFamily: [
            'Nunito',
            'serif',
        ].join(','),
    },
    breakpoints: generateBreakPoints(ThemeOperator.MuiOp, BreakPoints) as Record<string, number>,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    ':disabled': {
                        backgroundColor: PaletteColors.gray,
                        color: PaletteColors.black,
                        cursor: 'not-allowed',
                        pointerEvents: 'all',
                        fontWeight: 700,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: PaletteColors.black,
                    fontWeight: 700,
                    '&.Mui-focused': {
                        color: PaletteColors.black,
                        fontWeight: 700,
                    },
                    '&.Mui-error': {
                        color: PaletteColors.red,
                        fontWeight: 700,
                    },
                },

            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '.MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${PaletteColors.black}`,
                        color: PaletteColors.black,
                    },
                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: `2px solid ${PaletteColors.black}`,
                        },
                        '& .MuiFormLabel-root.MuiInputLabel-root': {
                            color: PaletteColors.black,
                        },
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: `2px solid ${PaletteColors.red}`,
                        },
                    },
                    '&.Mui-hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: `1px solid ${PaletteColors.black}`,
                        },
                    },
                    borderRadius: '4px',
                },
                input: { color: PaletteColors.black, fontWeight: '600' }
            },
        },
        // MuiRadio: {
        //   styleOverrides: {
        //     root: {
        //       '&.Mui-checked': {
        //         color: '#e20074',
        //       },
        //     },
        //   },
        // },
        MuiAutocomplete: {
            styleOverrides: {
                input: { color: PaletteColors.black, fontWeight: '600' }
            },
        },
        // MuiTextField: {
        //   defaultProps: {
        //     variant: 'outlined',
        //   },
        // },
        // MuiFormLabel: {
        //   styleOverrides: {
        //     root: {
        //       '&.Mui-focused': {
        //         color: '#000000',
        //         fontWeight: 500,
        //       },
        //     },
        //   },
        // },
        // MuiListItemButton: {
        //   styleOverrides: {
        //     root: {},
        //   },
        // },
        // MuiSwitch: {
        //   styleOverrides: {
        //     root: {
        //       '.Mui-checked': {
        //         // color: '#3441A3',
        //         '.MuiSwitch-thumb': {
        //           color: '#0F9D58',
        //         },
        //       },
        //       '.MuiSwitch-thumb': {
        //         color: '#de605d',
        //       },
        //       '.MuiSwitch-track': {
        //         backgroundColor: '#d4d4d4 !important',
        //       },
        //       '.MuiSwitch-switchBase': {},
        //     },
        //   },
        // },
        // MuiPagination: {
        //   styleOverrides: {
        //     root: {
        //       '.MuiPaginationItem-previousNext': {
        //         color: '#A9A9A9',
        //         border: '0px',
        //       },
        //       '.MuiButtonBase-root': {
        //         color: '#A9A9A9',
        //       },
        //       '.Mui-selected': {
        //         border: '0px',
        //         backgroundColor: '#003876 !important',
        //         color: '#ffffff',
        //         fontWeight: '700',
        //       },
        //     },
        //   },
        // },
        // MuiCheckbox: {
        //   styleOverrides: {
        //     root: {
        //       '.MuiSvgIcon-root': {
        //         fill: 'black',
        //       },
        //       '.Mui-disabled': {
        //         color: 'yellow',
        //       },
        //     },
        //   },
        // },
        // MuiTooltip: {
        //   styleOverrides: {
        //     tooltip: {
        //       backgroundColor: 'white',
        //       color: '#000000',
        //       fontSize: 16,
        //       lineHeight: 2,
        //       fontWeight: 400,
        //       boxShadow: '0px 2px 8px #A9A9A9',
        //       maxWidth: '700px',
        //     },
        //     arrow: {
        //       color: 'white',
        //     },
        //   },
        // },
        // MuiAvatar: {
        //   styleOverrides: {
        //     root: {
        //       backgroundColor: 'rgba(52, 65, 163, 0.7)',
        //       fontWeight: '500',
        //     },
        //   },
        // },
    }

})

export default theme