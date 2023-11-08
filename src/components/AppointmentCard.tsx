import { Avatar, IconButton } from '@mui/material'
import img from '@/assets/images/Aspect_Ratio.jpg'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import { theme } from '@/context/ThemeProvider'

interface Props {
  heading: string
  upcoming?: boolean
  complete?: boolean
  cancel?: boolean
}

const AppointmentCard = ({ heading, upcoming, complete, cancel }: Props) => {
  return (
    <>
      <div>
        <div className='flex justify-between px-1 pb-3 pt-2 '>
          <span className='text-darkBlue-main font-semibold'>{heading}</span>
          <span className='flex'>
            <IconButton>
              <ChevronLeftIcon
                sx={{
                  height: '20px',
                  width: '20px',
                  color: theme.palette.mBlack?.main,
                  border: '1px solid',
                  borderColor: theme.palette.mDarkGray?.main,
                  padding: '1px',
                  borderRadius: '9999px',
                }}
              />
            </IconButton>
            <IconButton>
              <ChevronRightIcon
                sx={{
                  height: '20px',
                  width: '20px',
                  color: theme.palette.mBlack?.main,
                  border: '1px solid',
                  borderColor: theme.palette.mDarkGray?.main,
                  padding: '1px',
                  borderRadius: '9999px',
                }}
              />
            </IconButton>
          </span>
        </div>
        <div className='mt-3 rounded-md border-[1px] border-black-main bg-lightGray-main md:shadow-xl shadow-lg'>
          <div className='relative border-black'>
            <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
              {upcoming && (
                <>
                  <span className='rounded-md bg-darkBlue-main px-3'>In-person</span>
                  <span className='rounded-md bg-green-main px-3'>Confirmed</span>
                  <span className='mr-3 rounded-md bg-darkGray-main px-3'>Sexual Health</span>
                </>
              )}
              {complete && (
                <>
                  <span className='rounded-md bg-blue-main px-3'>Virtual</span>
                  <span className='rounded-md bg-yellow-main px-3 text-black-main'>Review</span>
                  <span className='mr-3 rounded-md bg-darkGray-main px-3'>Sexual Health</span>
                </>
              )}
              {cancel && (
                <>
                  <span className='rounded-md bg-orange-main px-3'>Rescheduled</span>
                  <span className='mr-3 rounded-md bg-darkGray-main px-3'>Sexual Health</span>
                </>
              )}
            </div>
          </div>
          <div className='flex items-center justify-between gap-5 p-5'>
            <div className='flex w-4/5 flex-col gap-5'>
              <div className='flex items-start gap-5'>
                <div>
                  {' '}
                  <Avatar alt='Remy Sharp' src={img} />
                </div>
                <div className='leading-5'>
                  <h1>Dr Vageesh Sabharwal</h1>
                  <p className='text-darkBlue-main font-light text-[13px]'>
                    Nakshtra Multi-speciality Clinic
                  </p>
                  <p className='text-darkGray-main font-light text-[13px]'>
                    3403 Fieldgate Drive, Mississauga, ON, L4X 2J4
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-5'>
                <div>
                  {' '}
                  <Avatar alt='Remy Sharp' src={img} />
                </div>
                <div className='leading-5'>
                  <h1>Yogi Pathare</h1>
                  <p className='text-darkBlue-main font-light text-[13px]'>19 July 2023 </p>
                  <p className='text-darkBlue-main font-light text-[13px]'>10:15 AM to 11:00 AM</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <IconButton>
                <ChatOutlinedIcon
                  sx={{
                    color: theme.palette.mWhite?.main,
                    backgroundColor: theme.palette.mDarkGray?.main,
                    padding: '4px',
                    borderRadius: '9999px',
                  }}
                />
              </IconButton>
              <IconButton>
                <LocationOnOutlinedIcon
                  sx={{
                    color: theme.palette.mWhite?.main,
                    backgroundColor: theme.palette.mDarkGray?.main,
                    padding: '4px',
                    borderRadius: '9999px',
                  }}
                />
              </IconButton>
              <IconButton>
                <EmailOutlinedIcon
                  sx={{
                    color: theme.palette.mWhite?.main,
                    backgroundColor: theme.palette.mDarkGray?.main,
                    padding: '4px',
                    borderRadius: '9999px',
                  }}
                />
              </IconButton>
              {upcoming && (
                <IconButton>
                  <HighlightOffOutlinedIcon
                    sx={{
                      color: theme.palette.mWhite?.main,
                      backgroundColor: theme.palette.mDarkGray?.main,
                      padding: '4px',
                      borderRadius: '9999px',
                    }}
                  />
                </IconButton>
              )}
              {complete && (
                <IconButton>
                  <ThumbUpOutlinedIcon
                    sx={{
                      color: theme.palette.mWhite?.main,
                      backgroundColor: theme.palette.mBlue?.main,
                      padding: '4px',
                      borderRadius: '9999px',
                    }}
                  />
                </IconButton>
              )}
              {cancel && (
                <IconButton>
                  <MovieOutlinedIcon
                    sx={{
                      color: theme.palette.mWhite?.main,
                      backgroundColor: theme.palette.mPink?.main,
                      padding: '4px',
                      borderRadius: '9999px',
                    }}
                  />
                </IconButton>
              )}
            </div>
          </div>
        </div>
        <span className='flex justify-end text-darkBlue-main font-light'>
          <button>view all</button>
        </span>
      </div>
    </>
  )
}

export default AppointmentCard
