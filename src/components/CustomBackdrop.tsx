import Spinner from '@/components/spinner'
import { theme } from '@/context/ThemeProvider'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  bgColor?: string
}

const CustomBackDrop = ({ children, bgColor }: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: theme.zIndex.drawer + 1,
        // color: bgColor ? bgColor : '#fff',
        // backgroundColor: bgColor ? bgColor : '#fff',
        borderRadius: '6px',
      }}
    >
      {children ? children : <Spinner />}
    </Box>
  )
}

export default CustomBackDrop
