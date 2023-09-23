import { useEffect, useState } from 'react'
import { ALIGN_DIALOG, CACHE_KEYS } from '../../../utils/constants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchCachedData } from '../../../store/slices/cacheAPI/cache.fetch'
import SvgIcon from '../../../components/SvgIcon'
import CustomDialog from '../../../components/Dialog-custom'
import { Button, DialogContentText, DialogTitle, DialogActions } from '@mui/material'
import { useLoading } from '../../../context/LoadingContext'
import Loader from '../../../assets/images/loader.jpeg'
type Props = {}

const UserPage = ({}: Props) => {
  const { setLoading } = useLoading()
  const dispatch = useAppDispatch()
  const { cache } = useAppSelector((state) => state.cache)
  const cacheData = async () => {
    setLoading({
      isLoading: true,
      isPage: true,
      pageProps: { image: Loader, pageTxt: 'Sign up today for your Online FREE Consultation' },
    })
    await dispatch(
      fetchCachedData('https://jsonplaceholder.typicode.com/todos/1', CACHE_KEYS.TODO1, cache),
    )
    setLoading({
      isLoading: false,
      isPage: false,
    })
  }
  useEffect(() => {
    cacheData()
  }, [])
  //Dialog states
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <section className='py-5'>
        <div className='flex flex-col gap-btw-container '>
          {cache.cacheData[CACHE_KEYS.TODO1] && <h1>{cache.cacheData[CACHE_KEYS.TODO1].title}</h1>}
          <div className='w-full aspect-sliderDragableImage bg-slate-500'>
            <p className='font-sans font-thin'>hello</p>
            <p className='font-sans font-extralight'>hello</p>
            <p className='font-sans font-light'>hello</p>
            <p className='font-sans font-normal'>hello</p>
            <p className='font-sans font-medium'>hello</p>
            <p className='font-sans font-semibold'>hello</p>
            <p className='font-sans font-bold'>hello</p>
            <p className='font-sans font-extrabold'>hello</p>
            <p className='font-sans font-black'>hello</p>
          </div>
          <div className='grid grid-cols-auto-fit gap-btw-container text-gray-700'>
            <div className='bg-red-400'>
              <h1>hello</h1>
            </div>
            <div className='bg-red-400 '>
              <h1>1</h1>
            </div>
            <div className='bg-red-400 '>
              <h1>1</h1>
            </div>
            <div className='bg-red-400 '>
              <h1>1</h1>
            </div>
          </div>
          <SvgIcon
            iconName='loading'
            svgProp={{ className: 'w-8 h-8 animate-loading text-gray-950' }}
          />

          <SvgIcon iconName='ser' />
        </div>
      </section>
      <section className='py-5'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Button variant='contained' color='mPink' onClick={handleClickOpen()}>
            Book Online Consultation
          </Button>
          <Button variant='contained' color='mPink' onClick={handleClickOpen()}>
            Suscribe
          </Button>
          <CustomDialog
            open={open}
            handleClose={handleClose}
            maxHeight={200}
            align={ALIGN_DIALOG.BOTTOM_LEFT}
            maxWidth={'sm'}
            header={{
              isHeader: true,
              component: <DialogTitle id='scroll-dialog-title'>Subscribe</DialogTitle>,
            }}
            action={{
              isAction: true,
              component: (
                <DialogActions>
                  <Button variant='contained' color='mPink' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant='contained' color='mPink' onClick={handleClose}>
                    Subscribe
                  </Button>
                </DialogActions>
              ),
            }}
          >
            <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
              {[...new Array(50)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
            </DialogContentText>
          </CustomDialog>
        </div>
      </section>
    </>
  )
}

export default UserPage
