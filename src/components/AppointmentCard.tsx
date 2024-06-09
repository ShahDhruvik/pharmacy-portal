/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, useMediaQuery } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { theme } from '@/context/ThemeProvider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import '@/styles/Manage-card-Slider.css'
import { CONST_APP_IMAGE_URL, uuid } from '@/utils/constants'
import { format, parse } from 'date-fns'
import Spinner from './spinner'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import DuoIcon from '@mui/icons-material/Duo'
import { ChatAreaType, useChat } from '@/context/ChatContext'
interface Props {
  heading: string
  upcoming?: boolean
  complete?: boolean
  cancel?: boolean
  prevClassName?: string
  nextClassName?: string
  state?: string
  full?: boolean
  setManageState?: any
  manageState?: string
  data?: any[]
}

//Manage states
export const enum MANAGE_STATE {
  UPCOMING = 'upcoming',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

const AppointmentCard = ({
  heading,
  upcoming,
  complete,
  cancel,
  nextClassName,
  prevClassName,
  state,
  setManageState,
  manageState,
  full,
  data,
}: Props) => {
  const { setOpenChatDrawer, setChatArea } = useChat()

  const [openDrawer, setOpenDrawer] = useState(false)
  const { setLoading, loading } = useLoading()
  const showToast = useToast()

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(1024, 1307))
  const isFullCardScreen = useMediaQuery(theme.breakpoints.down(965))

  if (!loading.isLoading && !loading.isAppointmentLoader) {
    return (
      <>
        <div
          className={`w-full h-72 ${isMediumScreen || isFullCardScreen ? '' : 'max-w-[425px]'} `}
        >
          {full && (
            <>
              {' '}
              <div className='flex justify-between px-1 items-center py-2 '>
                <span className='text-darkBlue-main font-semibold'>{heading}</span>
                <span className='flex '>
                  <IconButton className={prevClassName}>
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
                  <IconButton className={nextClassName}>
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
            </>
          )}
          <Swiper
            navigation={{
              prevEl: `.${prevClassName}`,
              nextEl: `.${nextClassName}`,
            }}
            modules={[Navigation]}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 2000 }}
            // className='md:max-w-sm xl:max-w-md max-w-xs'
          >
            {data && data?.length > 0 ? (
              data?.map((x) => (
                <SwiperSlide className='pb-2'>
                  <div className='mt-3 rounded-md border-[1px] border-black-main bg-lightGray-main'>
                    <div className='relative border-black'>
                      <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                        {upcoming && (
                          <>
                            <span className='rounded-md bg-darkBlue-main px-3'>
                              {x?.appointmentMode}
                            </span>
                            <span className='rounded-md bg-green-main px-3 lg:block hidden'>
                              {x?.appointmentStatus?.enumType}
                            </span>
                            <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                              {x?.specialty[0]?.displayName}
                            </span>
                          </>
                        )}
                        {complete && (
                          <>
                            <span className='rounded-md bg-darkBlue-main px-3'>
                              {x?.appointmentMode}
                            </span>
                            <span className='rounded-md bg-blue-main px-3 lg:block hidden'>
                              {x?.appointmentStatus?.enumType}
                            </span>
                            <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                              {x?.specialty[0]?.displayName}{' '}
                            </span>
                          </>
                        )}
                        {cancel && (
                          <>
                            <span className='rounded-md bg-darkBlue-main px-3'>
                              {x?.appointmentMode}
                            </span>
                            <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                              {x?.specialty[0]?.displayName}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center justify-between gap-5 p-5'>
                      <div className='flex w-4/5 flex-col gap-5'>
                        <div className='flex items-start gap-5 flex-1'>
                          <div className='bg-gray-main'>
                            <Avatar
                              alt={x?.practiceName}
                              src={`${CONST_APP_IMAGE_URL}${x?.practiceLogo}`}
                              sx={{ borderRadius: 0 }}
                            />
                          </div>
                          <div className='leading-5'>
                            <h1>{x?.practiceName}</h1>
                            <p className='text-darkBlue-main font-light text-[13px]'>
                              {x?.providerName}
                            </p>
                            <p className='text-darkGray-main font-light text-[13px] line-clamp-1'>
                              {`${x?.practiceCityName}, ${x?.practiceStateName}`}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-5 flex-1'>
                          <div className='bg-gray-main'>
                            <Avatar
                              alt={x?.patientFirstName}
                              src={`${CONST_APP_IMAGE_URL}${x?.patientProfilePicture}`}
                              sx={{ backgroundColor: theme.palette.mGray?.main, borderRadius: 0 }}
                            />
                          </div>
                          <div className='leading-5'>
                            <h1>{`${x?.patientFirstName} ${x?.patientLastName}`}</h1>
                            <p className='text-darkBlue-main font-light text-[13px]'>
                              {format(new Date(x?.date), 'dd MMM yyyy')}
                            </p>
                            <p className='text-darkBlue-main font-light text-[13px]'>
                              {`${format(
                                parse(x?.startTime, 'HH:mm', new Date()),
                                'hh:mm a',
                              )} to ${format(parse(x?.endTime, 'HH:mm', new Date()), 'hh:mm a')}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 h-40 items-start justify-start'>
                        {/* {upcoming && (
                          <a
                            href={
                              x?.appointmentMode === PracticeModeEnum.VIRTUAL_CARE &&
                              x?.meetStartLink
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <IconButton
                              onClick={() => {}}
                              disabled={
                                x?.appointmentMode !== PracticeModeEnum.VIRTUAL_CARE ? true : false
                              }
                              sx={
                                x?.appointmentMode !== PracticeModeEnum.VIRTUAL_CARE
                                  ? { cursor: 'not-allowed' }
                                  : { cursor: 'pointer' }
                              }
                            >
                              <DuoIcon
                                sx={{
                                  color: theme.palette.mWhite?.main,
                                  backgroundColor:
                                    x?.appointmentMode !== PracticeModeEnum.VIRTUAL_CARE
                                      ? theme.palette.mGray?.main
                                      : theme.palette.mDarkBlue?.main,
                                  padding: '4px',
                                  borderRadius: '9999px',
                                }}
                              />
                            </IconButton>
                          </a>
                        )} */}
                        <IconButton
                          onClick={() => {
                            setOpenChatDrawer(true)
                            // setChatArea(ChatAreaType.Message)
                          }}
                        >
                          <ChatOutlinedIcon
                            sx={{
                              color: theme.palette.mWhite?.main,
                              backgroundColor: theme.palette.mDarkBlue?.main,
                              padding: '4px',
                              borderRadius: '9999px',
                            }}
                          />
                        </IconButton>
                        <a aria-label='gmail' href={`mailto:${x?.practiceEmail}`} target='_blank'>
                          <IconButton>
                            <EmailOutlinedIcon
                              sx={{
                                color: theme.palette.mWhite?.main,
                                backgroundColor: theme.palette.mDarkBlue?.main,
                                padding: '4px',
                                borderRadius: '9999px',
                              }}
                            />
                          </IconButton>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div
                className={`flex items-center justify-center border-black-main rounded-md border-[1px] bg-yellowLight-main h-[205px] mt-2 w-full ${
                  isMediumScreen || isFullCardScreen ? '' : 'max-w-[425px]'
                } min-w-[320px]`}
              >
                There is nothing to show here!
              </div>
            )}
            {upcoming && full && data && data?.length > 1 && (
              <span className='flex justify-end text-darkBlue-main font-light'>
                <button
                  onClick={() => {
                    handleOpenDrawer()
                    setManageState(MANAGE_STATE.UPCOMING)
                  }}
                >
                  view all
                </button>
              </span>
            )}
            {complete && full && data && data?.length > 1 && (
              <span className='flex justify-end text-darkBlue-main font-light'>
                <button
                  onClick={() => {
                    handleOpenDrawer()
                    setManageState(MANAGE_STATE.COMPLETE)
                  }}
                >
                  view all
                </button>
              </span>
            )}
            {cancel && full && data && data?.length > 1 && (
              <span className='flex justify-end text-darkBlue-main font-light'>
                <button
                  onClick={() => {
                    handleOpenDrawer()
                    setManageState(MANAGE_STATE.CANCEL)
                  }}
                >
                  view all
                </button>
              </span>
            )}
          </Swiper>
        </div>
        {/* <ViewBar
          handleClose={handleCloseDrawer}
          open={openDrawer && manageState === MANAGE_STATE.UPCOMING}
          heading='Upcoming Appointments'
          upcoming={true}
          // data={data}
          manageState={manageState}
        />
        <ViewBar
          handleClose={handleCloseDrawer}
          open={openDrawer && manageState === MANAGE_STATE.COMPLETE}
          heading='Complete Appointments'
          complete={true}
          // data={data}
          manageState={manageState}
        />
        <ViewBar
          handleClose={handleCloseDrawer}
          open={openDrawer && manageState === MANAGE_STATE.CANCEL}
          heading='Cancel Appointments'
          cancel={true}
          // data={data}
          manageState={manageState}
        /> */}
      </>
    )
  } else {
    if (loading.isAppointmentLoader) {
      return (
        <div className='h-80 flex items-center justify-center px-10'>
          <Spinner />
        </div>
      )
    }
  }
}

export default AppointmentCard
