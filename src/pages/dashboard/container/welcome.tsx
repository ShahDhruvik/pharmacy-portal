import { theme } from '@/context/ThemeProvider'
import { Avatar, Box, Button, Divider, useMediaQuery } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { getAllFeature, getAllImage } from '@/lib/DashboardContent'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { useEffect, useState } from 'react'
import {
  CONST_ABHA_URL,
  CONST_APP_IMAGE_URL,
  CONST_PRACTICE_URL,
  FORMTYPE,
} from '@/utils/constants'
import AuthForm from './auth-forms/auth-form'

interface Props {}

const Welcome = ({}: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [signType, setSignType] = useState<any>([])

  const [data, setData] = useState<any>(null)
  const [data1, setData1] = useState<any>(null)
  const [feature, setFeature] = useState<any>([])

  const getData = async () => {
    const response = await getAllImage(setLoading, showToast, {
      type: undefined,
    })
    if (response) {
      const small = response.find((x: any) => x.type === 'SMALL')
      const large = response.find((x: any) => x.type === 'LARGE')
      setData(small)
      setData1(large)
    }
  }

  const getFeature = async () => {
    const response = await getAllFeature(setLoading, showToast)
    if (response) {
      setFeature(response)
    }
  }

  useEffect(() => {
    getData()
    getFeature()
  }, [])

  const [openSign, setOpenSign] = useState(false)
  const handleOpenForm = () => {
    setSignType(FORMTYPE.SIGNIN)
    setOpenSign(true)
  }
  const handleCloseForm = () => setOpenSign(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1280))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(1280, 1432))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(1600))

  return (
    <>
      <div
        className={`flex w-full gap-5 flex-wrap min-h-fit ${
          isLargeScreen && 'container mx-auto px-12'
        } `}
      >
        <div className='top-0 left-0 relative'>
          <img
            src={`${CONST_APP_IMAGE_URL}${data1?.image}`}
            alt=''
            className={`relative aspect-video ${
              isMediumScreen || isSmallScreen ? 'h-full' : 'h-96'
            }`}
          />
          <img
            src={`${CONST_APP_IMAGE_URL}${data?.image}`}
            alt=''
            className={`w-60 aspect-square absolute top-20 -right-16 ${
              isMediumScreen || isSmallScreen ? 'hidden' : 'block'
            }`}
          />
        </div>
        <div className='sm:flex sm:flex-1 xs:flex xs:flex-col'>
          <div className='flex-1 md:pl-20 my-auto mx-5 flex flex-col md:items-start items-center'>
            <div className='text-base font-light md:text-start text-center'>
              Take command of your schedule and oversee your appointments efficiently.{' '}
            </div>
            <div className='flex flex-col'>
              <a href={CONST_PRACTICE_URL} target='_blank' rel='noopener noreferrer'>
                <Button
                  variant='outlined'
                  color='mBlack'
                  sx={{
                    maxWidth: 250,
                    minWidth: 250,
                    marginTop: '12px',
                    marginBottom: '4px',
                    color: theme.palette.mBlack?.main,
                    borderColor: theme.palette.mBlack?.main,
                    borderWidth: '3px',
                    fontWeight: 'bold',
                  }}
                >
                  Sign In To The Practice
                </Button>
              </a>
              <a href={CONST_ABHA_URL} target='_blank' rel='noopener noreferrer'>
                <Button
                  variant='outlined'
                  color='mBlack'
                  sx={{
                    maxWidth: 250,
                    minWidth: 250,
                    marginTop: '12px',
                    marginBottom: '4px',
                    color: theme.palette.mBlack?.main,
                    borderColor: theme.palette.mBlack?.main,
                    borderWidth: '3px',
                    fontWeight: 'bold',
                  }}
                >
                  Create ABHA ID
                </Button>
              </a>
            </div>
          </div>
          <div className='lg:border-l-[1px] border-gray-main lg:my-10 lg:mr-10'></div>
          <div className='flex-1 my-auto mx-5 flex flex-col md:items-start lg:items-center items-center'>
            <h2 className='text-xl text-black-main font-semibold'>EasyWeb: Provider Self-care</h2>
            <Button
              variant='contained'
              color='mPink'
              sx={{
                maxWidth: 250,
                minWidth: 250,
                maxHeight: 'max-content',
                marginTop: '12px',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              onClick={handleOpenForm}
            >
              <LockOutlinedIcon />
              Sign in
            </Button>
            <h3 className='text-xl my-2'>Download Mobile App</h3>
            <div className='flex'>
              <a
                href={`https://www.apple.com/in/app-store/`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='flex flex-col items-center leading-[1px]'>
                  <QrCode2Icon sx={{ height: '140px', width: '140px' }} />
                  <span className='text-[12px]'>APPLE STORE</span>
                </div>
              </a>
              <a href={`https://play.google.com/store/`} target='_blank' rel='noopener noreferrer'>
                <div className='flex flex-col items-center leading-[1px]'>
                  <QrCode2Icon sx={{ height: '140px', width: '140px' }} />
                  <span className='text-[12px]'>PLAY STORE</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Divider
        sx={{ borderBottom: '2px solid', borderColor: theme.palette.mDarkGray?.main }}
        className={`${isMediumScreen || isSmallScreen ? 'hidden' : 'block'}`}
      />
      <section>
        <div>
          <div className='flex flex-col items-center py-5'>
            {/* <h1 className='text-2xl text-center'>Welcome to Oopchar Self-care</h1> */}
            <p className='text-xl font-normal text-center'>
              Explore health care and related products and services
            </p>
            <div className='flex items-center gap-8 flex-wrap md:justify-between justify-center mx-5 py-5'>
              {feature?.map((x: any) => (
                <div className='flex items-center gap-5 max-w-96 md:w-80 w-72' key={x._id}>
                  <div className='border-2 rounded-full border-gray-main p-1 aspect-square'>
                    <Box padding={1}>
                      <Avatar
                        src={x?.icon ? `${CONST_APP_IMAGE_URL}${x?.icon}` : ''}
                        sx={{ width: 70, height: 70 }}
                      />
                    </Box>
                  </div>
                  <div>
                    <h2>{x?.name}</h2>
                    <p className='text-sm font-light'>{x?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AuthForm
        open={openSign}
        signType={signType}
        setSignType={setSignType}
        handleClose={handleCloseForm}
      />
    </>
  )
}

export default Welcome
