export enum ThemeOperator {
    TailwindOp = 'Tailwind',
    MuiOp = 'Mui'
}

// PaletteColors
export enum PaletteColors {
    blue = '#3498db',
    white = '#ffffff',
    black = '#000000',
    gray = '#808080',
    lightGray = '#bdbdbd',
    green = '#2ecc71',
    red = '#e74c3c',
    yellow = '#f1c40f',
    orange = '#e67e22',
    purple = '#9b59b6',
    teal = '#008080',
    pink = '#e91e63',
    brown = '#a52a2a'
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