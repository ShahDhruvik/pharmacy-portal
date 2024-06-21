/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { MAIN_PATH } from '@/paths/index'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { Alert, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { CONST_IMAGE_URL, VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import Slider from 'react-slick'
import Text from '@/assets/images/Triaina-Health-New.png'
import { useToast } from '@/hooks/useToast'
import { useLoading } from '@/context/LoadingContext'
import { getAllFeature, getAllImage, loginPharmacy } from '@/lib/auth-page-ui'
import theme from '@/theme/defaultTheme'
import TxtInput from '@/components/form-inputs/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import PasswordInput from '@/components/form-inputs/PasswordInput'
import { usePharmacy } from '@/context/pharmacyContext'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://triainahealth.com/'>
        Triana Health
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function groupArrayIntoObject(array: any[], groupSize = 4) {
  return array.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / groupSize) + 1 // Calculate group index
    if (!acc[groupIndex]) {
      acc[groupIndex] = [] // Initialize the group array if it doesn't exist
    }
    acc[groupIndex].push(item) // Add the item to the appropriate group
    return acc
  }, {})
}

export default function LoginPage() {
  const { setPharmacyList, setSelectedPharmacy } = usePharmacy()
  const [isImageLoading, setIsImageLoading] = useState<{
    isLoading: boolean
    notFound: boolean
  }>({ isLoading: false, notFound: false })
  const [isFeatureLoading, setIsFeatureLoading] = useState<{
    isLoading: boolean
    notFound: boolean
  }>({ isLoading: false, notFound: false })
  const [isLoading, setIsLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [tempData, setTempData] = useState({} as any)
  const [showPassword, setShowPassword] = useState(false)
  const { addStorage } = useAuth()
  const showToast = useToast()
  const nav = useNavigate()
  const { loading, setLoading } = useLoading()
  const { register, handleSubmit: handleFormSubmit, setValue, control } = useForm()
  const [data, setData] = useState<any>(null)
  const [data1, setData1] = useState<any>(null)
  const [feature, setFeature] = useState<Record<number, any[]> | undefined>(undefined)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  }
  const onSubmit = async (data: any) => {
    const res = await loginPharmacy(setLoading, data, showToast, { btnLoading: true })
    if (res) {
      const pharmacyOp = {
        _id: res?.selectedPharmacy?.id,
        label: res?.selectedPharmacy?.name,
        data: res?.selectedPharmacy,
      }
      setSelectedPharmacy(pharmacyOp)
      setPharmacyList([pharmacyOp])
      addStorage(
        res?.accessToken,
        res?.refreshToken,
        res?.from,
        JSON.stringify(res?.selectedPharmacy),
      )
      nav('/')
    }
  }
  const onSubmitChangePassword = async (data: any) => {
    console.log(data)
  }
  const onSubmitForgotPassword = async (data: any) => {
    console.log(data)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const getData = async () => {
    setIsImageLoading({ isLoading: true, notFound: false })
    const response = await getAllImage({
      type: undefined,
    })
    if (response) {
      const small = response.find((x: any) => x.type === 'SMALL')
      const large = response.find((x: any) => x.type === 'LARGE')
      setData(small)
      setData1(large)
      setIsImageLoading({ isLoading: false, notFound: false })
    } else {
      setIsImageLoading({ isLoading: false, notFound: true })
    }
  }
  const getFeature = async () => {
    setIsFeatureLoading({ isLoading: true, notFound: false })
    const response = await getAllFeature()
    if (response.length > 0) {
      const groupedItems = groupArrayIntoObject(response)
      setFeature(groupedItems)
      setIsFeatureLoading({ isLoading: false, notFound: false })
    } else {
      setIsFeatureLoading({ isLoading: false, notFound: true })
    }
  }
  useEffect(() => {
    getData()
    getFeature()
  }, [])
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <div className={`flex items-center justify-start flex-1 flex-wrap gap-5 h-20`}>
          <img
            src={Text}
            alt={'Triaina Health'}
            onClick={() => {
              nav('/')
            }}
            className='cursor-pointer h-[70%] ml-3'
          />
          <p className={` text-mBlack-main font-semibold flex gap-2 ml-1 text-2xl`}>
            <span className='md:block hidden'>EasyWeb: </span>
            Pharmacy Portal
          </p>
        </div>
        <div className='relative'>
          {isImageLoading.isLoading ? (
            <div
              className={`aspect-video w-[80%] bg-mLightBlue-main animate-pulse flex items-center justify-center`}
            >
              loading
            </div>
          ) : isImageLoading.notFound ? (
            <div>not found</div>
          ) : (
            <img
              src={`${CONST_IMAGE_URL || VITE_APP_IMAGE_URL}${data1?.image}`}
              alt=''
              className={`aspect-video w-[65%]`}
            />
          )}
          {isImageLoading.isLoading ? (
            <div
              className={`w-60 aspect-square shadow-cardShadow absolute top-1/4 right-16 bg-mLightBlue-main animate-pulse flex items-center justify-center`}
            >
              loading
            </div>
          ) : isImageLoading.notFound ? (
            <div>not found</div>
          ) : (
            <img
              src={`${CONST_IMAGE_URL || VITE_APP_IMAGE_URL}${data?.image}`}
              alt=''
              className={`w-60 aspect-square absolute top-10 right-32 `}
            />
          )}
        </div>
        <div>
          {isFeatureLoading.isLoading ? (
            <div className='w-full h-60 flex items-center justify-center  my-5 animate-pulse bg-mLightBlue-main '>
              loading features
            </div>
          ) : isFeatureLoading.notFound ? (
            <div>not found</div>
          ) : feature ? (
            <div className='px-4'>
              <div className='py-3'>
                <h1 className='text-2xl font-bold '>Welcome to Pharmacy Portal</h1>
                <p className='text-xl font-normal'>
                  Explore health care and related products and services
                </p>
              </div>
              <Slider {...settings} className='w-full h-[30%]'>
                {Object.keys(feature).map((x) => {
                  return (
                    <div className='' key={Math.random()}>
                      <div className='grid grid-cols-2 grid-rows-2 gap-5 px-3   mx-auto '>
                        {feature[x as any]?.map((x: any) => (
                          <div className='flex items-center gap-5 w-max' key={x._id}>
                            <div className='border-2 rounded-full  border-mGray-main p-1 aspect-square'>
                              <Box padding={1}>
                                <Avatar
                                  src={
                                    x?.icon
                                      ? `${CONST_IMAGE_URL || VITE_APP_IMAGE_URL}${x?.icon}`
                                      : ''
                                  }
                                  sx={{ width: 60, height: 60 }}
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
                  )
                })}
              </Slider>
            </div>
          ) : (
            <div>empty</div>
          )}
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} display={'flex'} flexDirection={'column'} component={Paper}>
        <Box
          sx={{
            mx: 4,
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 30, height: 30, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <p className='text-xl font-medium'>
            {showChangePassword
              ? 'Change Password'
              : showForgotPassword
              ? 'Forgot Password'
              : 'Sign in'}
          </p>
          {showForgotPassword && (
            <form noValidate onSubmit={handleFormSubmit(onSubmitForgotPassword)} className='w-full'>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Registered email address'
                {...register('email')}
                autoComplete='email'
                autoFocus
              />
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
              >
                Send me reset link
              </LoadingButton>
              <Copyright sx={{ mt: 5 }} />
            </form>
          )}
          {showChangePassword && (
            <form noValidate onSubmit={handleFormSubmit(onSubmitChangePassword)}>
              <TextField
                margin='normal'
                required
                fullWidth
                {...register('password')}
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                {...register('cpassword')}
                label='Confirm password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
              >
                Change password
              </LoadingButton>
              <Copyright sx={{ mt: 5 }} />
            </form>
          )}
          {!showChangePassword && !showForgotPassword && (
            <form
              noValidate
              onSubmit={handleFormSubmit(onSubmit)}
              className='flex flex-col gap-4 mt-3'
            >
              <TxtInput
                label='Email*'
                control={control}
                handleChange={() => []}
                name='email'
                placeholder='Email'
                validation={txtFieldValidation(true, 'Email')}
                size='small'
              />
              <PasswordInput
                label='Password*'
                control={control}
                handleChange={() => {}}
                name='password'
                placeholder='Password'
                validation={txtFieldValidation(true)}
                size='small'
              />
              <TxtInput
                label='Office Id *'
                control={control}
                handleChange={() => []}
                name='officeId'
                placeholder='Office Id'
                validation={txtFieldValidation(true)}
                size='small'
              />
              <Alert severity='info'>
                By logging in, you acknowlege and accepts the terms and conditions outlined by
                Triaina Health
              </Alert>
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                color='mPink'
                sx={{ mt: 2, mb: 1, color: theme.palette.mWhite.main }}
                loading={isLoading}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link
                    href='#'
                    variant='body2'
                    onClick={() => {
                      setShowChangePassword(false)
                      setShowForgotPassword(true)
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 2 }} />
            </form>
          )}
        </Box>
        <Box
          sx={{
            alignSelf: 'start',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div
            className={`flex-1 my-auto mx-5 flex flex-col md:items-start lg:items-center items-center `}
          >
            <h3 className={`text-2xl font-semibold`}>Download Mobile App</h3>
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
          <div className='flex flex-1 flex-col'>
            <Button
              variant='text'
              color='primary'
              sx={{
                maxWidth: 250,
                minWidth: 250,
                marginTop: '12px',
                marginBottom: '4px',
                color: theme.palette.mBlack?.main,
                border: `2px solid ${theme.palette.mBlack?.main}`,
              }}
            >
              Refer A Friend
            </Button>
            <Button
              variant='text'
              color='primary'
              sx={{
                maxWidth: 250,
                minWidth: 250,
                marginTop: '12px',
                marginBottom: '4px',
                color: theme.palette.mBlack?.main,
                border: `2px solid ${theme.palette.mBlack?.main}`,
              }}
              onClick={() => {
                nav(MAIN_PATH.HELP_AND_FAQ)
              }}
            >
              Help and Faq
            </Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}
