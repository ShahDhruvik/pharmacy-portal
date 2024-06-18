// import { theme } from '../context/ThemeProvider'
import { LoadingContextType } from '@/types/common'
import { Backdrop, CircularProgress, Dialog } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Spinner from './spinner'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
type Props = {
  loading: LoadingContextType['loading']
}

const Loader = ({ loading }: Props) => {
  if (loading.isLoading) {
    if (loading.loadingProps?.none) {
      return null
    } else {
      return (
        <Backdrop
          sx={{
            color: '#000000',
            zIndex: (theme) => theme.zIndex.drawer + 1999999999999,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
          open={loading.isLoading}
        >
          <CircularProgress color='mLightBlack' size={40} thickness={3} />
          <p className='text-xl font-semibold text-mLightBlack-main'>
            {COMMON_MESSAGE.loadingMessage}
          </p>
        </Backdrop>
      )
    }
  } else {
    return null
  }
}

export default Loader
