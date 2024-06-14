// import { theme } from '../context/ThemeProvider'
import { LoadingContextType, LoadingState } from '../types/common'
import { Backdrop, Dialog } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Spinner from './spinner'
type Props = {
  loading: LoadingContextType['loading']
}

const Loader = ({ loading }: Props) => {
  if (loading.isLoading) {
    if (loading.loadingProps?.page) {
      return (
        <Dialog
          open={loading.isLoading}
          fullScreen
          sx={{
            marginTop: 10,
          }}
          PaperProps={{
            elevation: 0,
          }}
          hideBackdrop
        >
          <section className='h-screen overflow-hidden '>
            <div className='flex flex-col items-center justify-center h-full w-full gap-btw-container'>
              <Spinner />
              <div className='flex flex-col sm:flex-row items-center gap-btw-container mt-5'>
                <img src={'/'} alt='loading' width={300} height={300} />
                <div className='max-w-xs'>
                  <p className='max-sm:text-center text-2xl text-mDarkBlue-main'>{'Loading...'}</p>
                </div>
              </div>
            </div>
          </section>
        </Dialog>
      )
    } else if (loading.loadingProps?.none) {
      return null
    } else {
      return (
        <Backdrop
          sx={{
            color: '#000000',
            zIndex: (theme) => theme.zIndex.drawer + 1999999999999,
          }}
          open={loading.isLoading}
        >
          <Spinner />
        </Backdrop>
      )
    }
  } else {
    return null
  }
}

export default Loader
