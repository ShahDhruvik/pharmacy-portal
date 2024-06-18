export enum ThemeOperator {
    TailwindOp = 'Tailwind',
    MuiOp = 'Mui'
}

// PaletteColors
export enum PaletteColors {
    mPink = '#e20074',
    mDarkBlue = '#0a3876',
    mBlue = '#00a1f1',
    mLightBlue = '#d9e3f8',
    mMidBlue = '#2466b5',
    mLightGray = '#f4f4f4',
    mGray = '#d4d4d4',
    mMediumGray = '#c1c1c4',
    mDarkGray = '#787d78',
    mOrange = '#db4437',
    mLightOrange = '#de605d',
    mGreen = '#0f9d58',
    mYellow = '#ffbb00',
    mWhite = '#ffffff',
    mLightBlack = '#2b2a2a',
    mBlack = '#000000',
    mDarkGreen = '#1A2428',
    mRed = '#ff3333',
    mLightWhite = '#F6F9F7',
}
export const generatePalette = (paletteColors: Record<string, string>) => {
    const colorPalette: Record<string, { main: string; light: string; dark: string }> = {}
    for (let i = 0; i < Object.keys(paletteColors).length; i++) {
        const element = Object.keys(paletteColors)[i]
        const colorValue = paletteColors[element]
        colorPalette[element] = { main: colorValue, light: colorValue, dark: colorValue }
    }
    return colorPalette
}

// BreakPoints
export enum BreakPoints {
    xs = "400px",
    sm = "640px",
    md = "768px",
    lg = "1024px",
    xl = "1280px",
    "2xl" = "1536px",
}
export const generateBreakPoints = (operator: ThemeOperator, breakPoints: Record<string, string | number>) => {
    const breakPts = Object.keys(breakPoints)
    const breaks: Record<string, string | number> = {}
    switch (operator) {
        case ThemeOperator.TailwindOp:
            for (let index = 0; index < breakPts.length; index++) {
                const element = breakPts[index]
                breaks[element] = breakPoints[element]
            }

            return breaks
            break;
        case ThemeOperator.MuiOp:
            for (let index = 0; index < breakPts.length; index++) {
                const element = breakPts[index]
                const breakValue = breakPoints[element]
                breaks[element] = Number(breakValue.toString().split('px')[0])
            }
            return { values: breaks }
            break;
        default:
            return breaks
            break;
    }
}