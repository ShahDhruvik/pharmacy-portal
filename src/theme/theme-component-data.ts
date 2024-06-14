import { ThemeOptions } from "@mui/material";
import { PaletteColors } from "./theme-data";
export const components: ThemeOptions['components'] = {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                ':disabled': {
                    backgroundColor: PaletteColors.mLightGray,
                    color: PaletteColors.mBlack,
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
                '&.Mui-focused': {
                    color: PaletteColors.mPink,
                },
                '&.Mui-error': {
                    color: PaletteColors.mRed,
                },

            },
            shrink: false

        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                '.MuiOutlinedInput-notchedOutline': {
                },
                '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${PaletteColors.mPink}`,
                    },
                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                        color: PaletteColors.mPink,
                    },
                },
                '&.Mui-error': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${PaletteColors.mRed}`,
                    },
                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                        color: PaletteColors.mRed,
                    },
                },
                '&.Mui-hover': {

                },
                borderRadius: '4px',
            },
        },
    },
    MuiAutocomplete: {
        styleOverrides: {
        },
    },

}