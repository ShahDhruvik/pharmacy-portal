/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, Avatar, IconButton } from '@mui/material'
import AppointmentCard from '@/components/AppointmentCard'
import { CONST_APP_IMAGE_URL } from '@/utils/constants'
import { format, parse } from 'date-fns'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'

type Props = {
  handleClose: () => void
  open: boolean
  heading: string
  upcoming?: boolean
  complete?: boolean
  cancel?: boolean
  data?: any
}

const ViewBar = ({ open, handleClose, heading, upcoming, complete, cancel, data }: Props) => {
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        width: '28%',
        '& .MuiDrawer-paper': {
          width: '28%',
          px: '20px',
          backgroundColor: theme.palette.mLightGray?.main,
        },
      }}
    >
      <div>
        <div
          className={`flex justify-end items-center mb-3 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
          id='header'
        >
          <Button
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette.mMidBlue?.main,
              minWidth: 'max-content',
              fontSize: '1rem',

              height: 20,
            }}
            onClick={handleClose}
            disableRipple
          >
            Done
          </Button>
        </div>
        <div className='flex flex-col gap-5 mb-3'>
          <div>
            <h2>{heading}</h2>
            <Divider
              sx={{
                borderColor: theme.palette.mDarkGray?.main,
                borderWidth: '1.5px',
                marginBottom: '15px',
              }}
            />
            {upcoming && (
              <>
                {/* <AppointmentCard
                  heading='Upcoming Appointments'
                  upcoming={true}
                  full={false}
                  data={data}
                /> */}
                {data &&
                  data?.length > 0 &&
                  data?.map((x: any) => (
                    <div
                      className='my-7 rounded-md border-[1px] border-black-main bg-lightGray-main'
                      key={Math.random()}
                    >
                      <div className='relative border-black'>
                        <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                          <span className='rounded-md bg-darkBlue-main px-3'>In-person</span>
                          <span className='rounded-md bg-green-main px-3'>Confirmed</span>
                          <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                            Sexual Health
                          </span>
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
                              <h1>{x?.providerName}</h1>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {x?.practiceName}
                              </p>
                              <p className='text-darkGray-main font-light text-[13px] line-clamp-1'>
                                {/* 3403 Fieldgate Drive, Mississauga, ON, L4X 2J4 */}
                                {`${x?.practiceAddressLineOne}, ${x?.practiceAddressLineTwo}`}
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
                              <h1>{`${x.patientFirstName} ${x.patientLastName}`}</h1>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {format(new Date(x?.appointmentDate), 'dd MMM yyyy')}
                              </p>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {`${format(
                                  parse(x?.appointmentStartTime, 'HH:mm', new Date()),
                                  'hh:mm a',
                                )} to ${format(
                                  parse(x?.appointmentEndTime, 'HH:mm', new Date()),
                                  'hh:mm a',
                                )}`}
                              </p>
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
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <AppointmentCard heading='Upcoming Appointments' upcoming={true} full={false} />
                <AppointmentCard heading='Upcoming Appointments' upcoming={true} full={false} /> */}
              </>
            )}
            {complete && (
              <>
                {data &&
                  data?.length > 0 &&
                  data?.map((x: any) => (
                    <div
                      className='my-7 rounded-md border-[1px] border-black-main bg-lightGray-main'
                      key={Math.random()}
                    >
                      <div className='relative border-black'>
                        <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                          <span className='rounded-md bg-blue-main px-3'>Virtual</span>
                          <span className='rounded-md bg-yellow-main px-3 text-black-main'>
                            Review
                          </span>
                          <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                            Sexual Health
                          </span>
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
                              <h1>{x?.providerName}</h1>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {x?.practiceName}
                              </p>
                              <p className='text-darkGray-main font-light text-[13px] line-clamp-1'>
                                {/* 3403 Fieldgate Drive, Mississauga, ON, L4X 2J4 */}
                                {`${x?.practiceAddressLineOne}, ${x?.practiceAddressLineTwo}`}
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
                              <h1>{`${x.patientFirstName} ${x.patientLastName}`}</h1>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {format(new Date(x?.appointmentDate), 'dd MMM yyyy')}
                              </p>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {`${format(
                                  parse(x?.appointmentStartTime, 'HH:mm', new Date()),
                                  'hh:mm a',
                                )} to ${format(
                                  parse(x?.appointmentEndTime, 'HH:mm', new Date()),
                                  'hh:mm a',
                                )}`}
                              </p>
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
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <AppointmentCard heading='Completed Appointments' complete={true} full={false} />
                <AppointmentCard heading='Completed Appointments' complete={true} full={false} />
                <AppointmentCard heading='Completed Appointments' complete={true} full={false} /> */}
              </>
            )}
            {cancel && (
              <>
                {data &&
                  data?.length > 0 &&
                  data?.map((x: any) => (
                    <div
                      className='my-7 rounded-md border-[1px] border-black-main bg-lightGray-main'
                      key={Math.random()}
                    >
                      <div className='relative border-black'>
                        <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                          <span className='rounded-md bg-orange-main px-3'>Rescheduled</span>
                          <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                            Sexual Health
                          </span>
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
                              <h1>{x?.providerName}</h1>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {x?.practiceName}
                              </p>
                              <p className='text-darkGray-main font-light text-[13px] line-clamp-1'>
                                {/* 3403 Fieldgate Drive, Mississauga, ON, L4X 2J4 */}
                                {`${x?.practiceAddressLineOne}, ${x?.practiceAddressLineTwo}`}
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
                              <h1>{`${x.patientFirstName} ${x.patientLastName}`}</h1>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {format(new Date(x?.appointmentDate), 'dd MMM yyyy')}
                              </p>
                              <p className='text-darkBlue-main font-light text-[13px]'>
                                {`${format(
                                  parse(x?.appointmentStartTime, 'HH:mm', new Date()),
                                  'hh:mm a',
                                )} to ${format(
                                  parse(x?.appointmentEndTime, 'HH:mm', new Date()),
                                  'hh:mm a',
                                )}`}
                              </p>
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
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <AppointmentCard heading='Cancelled Appointments' cancel={true} full={false} />
                <AppointmentCard heading='Cancelled Appointments' cancel={true} full={false} />
                <AppointmentCard heading='Cancelled Appointments' cancel={true} full={false} /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default ViewBar
