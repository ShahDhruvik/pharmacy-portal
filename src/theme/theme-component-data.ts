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
                color: PaletteColors.mDarkGray,
                fontWeight: 700,
                '&.Mui-focused': {
                    color: PaletteColors.mPink,
                    fontWeight: 700,
                },
                '&.Mui-error': {
                    color: PaletteColors.mRed,
                    fontWeight: 700,
                },

            },
            shrink: false

        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                '.MuiOutlinedInput-notchedOutline': {
                    border: `2px solid ${PaletteColors.mDarkGray}`,
                    color: PaletteColors.mDarkGray,
                },
                '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${PaletteColors.mPink}`,
                    },
                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                        color: PaletteColors.mBlack,
                    },
                },
                '&.Mui-error': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${PaletteColors.mRed}`,
                    },
                },
                '&.Mui-hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${PaletteColors.mRed}`,
                    },
                },
                borderRadius: '4px',
            },
            input: { color: PaletteColors.mBlack }
        },
    },
    MuiAutocomplete: {
        styleOverrides: {
            input: { color: PaletteColors.mBlack, }
        },
    },

}