import { theme } from '@/context/ThemeProvider'
import { Button, Divider } from '@mui/material'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ListAltIcon from '@mui/icons-material/ListAlt'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ChatIcon from '@mui/icons-material/Chat'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'

interface Props {}

const arr = [
  {
    id: 1,
    icon: <Diversity1Icon sx={{ color: theme.palette.mDarkGray?.main }} />,
    heading: 'Manage Family',
    para: 'Explore health care and related products and services',
  },
  {
    id: 2,
    icon: <BookOnlineIcon sx={{ color: theme.palette.mDarkGray?.main }} />,
    heading: 'Manage Appointments',
    para: 'Explore health care and related products and services',
  },
  {
    id: 3,
    icon: <AccountCircleIcon sx={{ color: theme.palette.mDarkGray?.main }} />,
    heading: 'Update Profile',
    para: 'Explore health care and related products and services',
  },
  {
    id: 4,
    icon: <ListAltIcon sx={{ color: theme.palette.mDarkGray?.main }} />,
    heading: 'Manage Medical Forms',
    para: 'Explore health care and related products and services',
  },
  {
    id: 5,
    icon: <EmojiEventsIcon sx={{ color: theme.palette.mDarkGray?.main }} />,
    heading: 'Earn Rewards',
    para: 'Explore health care and related products and services',
  },
  {
    id: 6,
    icon: <ChatIcon sx={{ color: theme.palette.mDarkGray?.main }} />,
    heading: 'Chat with Clinics',
    para: 'Explore health care and related products and services',
  },
]

const Welcome = ({}: Props) => {
  return (
    <>
      <div className='flex w-full gap-5 flex-wrap min-h-fit'>
        <div className='flex-1 items-center justify-center flex flex-wrap'>
          <div className='top-0 left-0 relative'>
            <img src={img1} alt='' className='relative full aspect-video' />
            <img
              src={img1}
              alt=''
              className='w-60 aspect-square absolute top-20 -right-16 md:block hidden'
            />
          </div>
        </div>
        <div className='flex-1 items-center justify-center flex gap-5 py-5 flex-wrap'>
          <div className='flex-1 pl-20 flex-wrap'>
            <div className='text-base font-light'>
              Get top notch support from direct healthcare professionals.
            </div>
            <div>
              <Button
                variant='contained'
                color='mPink'
                sx={{
                  maxWidth: 250,
                  minWidth: 250,
                  marginTop: '12px',
                  marginBottom: '4px',
                  // border: '2px solid',
                  // borderColor: theme.palette.mBlack?.main,
                  // color: theme.palette.mBlack?.main,
                }}
              >
                Book Online Consultation
              </Button>
              <Button
                variant='contained'
                color='mPink'
                sx={{
                  maxWidth: 250,
                  minWidth: 250,
                  marginTop: '12px',
                  marginBottom: '4px',
                  // border: '2px solid',
                  // borderColor: theme.palette.mBlack?.main,
                  // color: theme.palette.mBlack?.main,
                }}
              >
                Take Free Assessment
              </Button>
            </div>
          </div>
          <Divider orientation='vertical' />
          <div className='flex-1 flex-wrap'>
            <h2 className='text-xl'>EasyWeb: Patient Self-care</h2>
            <Button
              variant='contained'
              color='mPink'
              sx={{
                maxWidth: 250,
                minWidth: 250,
                marginTop: '12px',
                marginBottom: '4px',
              }}
            >
              <LockOutlinedIcon />
              Sign in
            </Button>
            <div className='text-darkBlue-main font-light flex py-2 gap-3 mb-3'>
              <span className='flex '>
                Register
                <ChevronRightIcon sx={{ color: theme.palette.mBlack?.main }} />
              </span>
              <span className='flex '>
                Security Guarantee
                <ChevronRightIcon sx={{ color: theme.palette.mBlack?.main }} />
              </span>
            </div>
            <Divider sx={{ marginRight: '40px' }} />
            <h3 className='text-xl my-2'>Download Mobile App</h3>
            <div className='flex'>
              <div className='flex flex-col items-center leading-[1px]'>
                <QrCode2Icon sx={{ height: '140px', width: '140px' }} />
                <span className='text-[12px]'>APPLE STORE</span>
              </div>
              <div className='flex flex-col items-center leading-[1px]'>
                <QrCode2Icon sx={{ height: '140px', width: '140px' }} />
                <span className='text-[12px]'>PLAY STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider sx={{ borderBottom: '2px solid', borderColor: theme.palette.mDarkGray?.main }} />
      <section>
        <div>
          <div className='flex flex-col items-center py-5'>
            <h1 className='text-2xl'>Welcome to Oopchar Self-care</h1>
            <p className='text-base font-light'>
              Explore health care and related products and services
            </p>
            <div className='flex items-center gap-8 flex-wrap px-12 justify-between py-5'>
              {arr.map((x) => (
                <div className='flex items-center gap-5 max-w-96 w-80' key={x.id}>
                  <div className='border-2 rounded-full border-gray-main p-3'>
                    {/* <SvgIcon iconName={x.icon} /> */}
                    {x.icon}
                  </div>
                  <div>
                    <h2>{x.heading}</h2>
                    <p className='text-sm font-light'>{x.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className='flex justify-end pr-10 pb-2'>
        {/* <div> */}
        <ModeCommentOutlinedIcon
          sx={{
            color: theme.palette.mWhite?.main,
            backgroundColor: theme.palette.mBlack?.main,
            height: '25px',
            width: '25px',
            padding: '4px',
            borderRadius: '9999px',
          }}
        />
        {/* </div> */}
      </section>
    </>
  )
}

export default Welcome
