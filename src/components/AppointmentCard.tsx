import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
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
import ViewBar from '@/pages/appointmentViewPage/viewBar'
import { CONST_APP_IMAGE_URL, uuid } from '@/utils/constants'
import { format, parse } from 'date-fns'
import Spinner from './spinner'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import DuoIcon from '@mui/icons-material/Duo'
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
  const [openDrawer, setOpenDrawer] = useState(false)
  const { setLoading, loading } = useLoading()
  const showToast = useToast()

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

  if (!loading.isLoading && !loading.isAppointmentLoader) {
    return (
      <>
        <div className='w-[425px]'>
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
            className=' max-w-xs lg:max-w-sm xl:max-w-md  '
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
                            <span className='rounded-md bg-green-main px-3'>
                              {x?.appointmentStatus?.enumType}
                            </span>
                            <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                              Sexual Health
                            </span>
                          </>
                        )}
                        {complete && (
                          <>
                            <span className='rounded-md bg-blue-main px-3'>
                              {x?.appointmentMode}
                            </span>
                            <span className='rounded-md bg-yellow-main px-3 text-black-main'>
                              {x?.appointmentStatus?.enumType}
                            </span>
                            <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                              Sexual Health
                            </span>
                          </>
                        )}
                        {cancel && (
                          <>
                            <span className='rounded-md bg-orange-main px-3'>
                              {x?.appointmentMode}
                            </span>
                            <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                              Sexual Health
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center justify-between gap-5 p-5'>
                      <div className='flex w-4/5 flex-col gap-5'>
                        <div className='flex items-start gap-5 flex-1'>
                          <div>
                            <Avatar
                              alt='Remy Sharp'
                              src={`${CONST_APP_IMAGE_URL}${x?.practiceLogo}`}
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
                          <div>
                            <Avatar
                              alt='Remy Sharp'
                              src={`${CONST_APP_IMAGE_URL}${x?.patientProfilePicture}`}
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
                        {upcoming && (
                          <IconButton onClick={() => {}}>
                            <DuoIcon
                              sx={{
                                color: theme.palette.mWhite?.main,
                                backgroundColor: theme.palette.mDarkGray?.main,
                                padding: '4px',
                                borderRadius: '9999px',
                              }}
                            />
                          </IconButton>
                        )}
                        {!upcoming && (
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
                        )}
                        <a aria-label='gmail' href={`mailto:${x?.practiceEmail}`} target='_blank'>
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
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className='flex items-center justify-center border-black-main rounded-md border-[1px] bg-yellowLight-main h-[202px] mt-3'>
                There is nothing to show here!
              </div>
            )}
            {upcoming && full && (
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
            {complete && full && (
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
            {cancel && full && (
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
        <ViewBar
          handleClose={handleCloseDrawer}
          open={openDrawer && manageState === MANAGE_STATE.UPCOMING}
          heading='Upcoming Scheduled Appointments'
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
        />
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
