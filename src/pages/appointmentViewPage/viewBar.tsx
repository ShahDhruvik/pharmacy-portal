/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, Avatar, IconButton, Dialog, DialogContent } from '@mui/material'
import { CONST_APP_IMAGE_URL, MARKETING_EMAIL, PracticeModeEnum } from '@/utils/constants'
import { addMonths, format, parse } from 'date-fns'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import { useForm } from 'react-hook-form'
import { acDefaultValue } from '@/utils/form.validation'
import TxtInput from '@/components/TxtInput'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { getAllAppointmentsForViewBar } from '@/lib/Appointment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DuoIcon from '@mui/icons-material/Duo'
import { debounce } from 'lodash'
import Spinner from '@/components/spinner'
import { useDrawerWidth } from '@/components/DrawerWidth'
import { ChatAreaType, useChat } from '@/context/ChatContext'

type Props = {
  handleClose: () => void
  open: boolean
  heading: string
  upcoming?: boolean
  complete?: boolean
  cancel?: boolean
  // data?: any
  manageState: any
}

const ViewBar = ({
  open,
  handleClose,
  heading,
  upcoming,
  complete,
  cancel,
  manageState,
}: Props) => {
  const { setOpenChatDrawer, setChatArea } = useChat()
  const [newData, setNewData] = useState<any>(undefined)
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [search, setSearch] = useState<string>('')
  const [openPicker, setOpenPicker] = useState<boolean>(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const onChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    getAppData('')
  }

  const { control, setValue, setError, clearErrors, handleSubmit, reset, getValues, watch } =
    useForm({
      defaultValues: {
        patient: acDefaultValue,
      },
    })

  const getAppData = async (s: string) => {
    const data: any = {
      startDate: startDate,
      endDate: endDate === null ? new Date() : endDate,
      search: s,
    }
    const response = await getAllAppointmentsForViewBar(setLoading, showToast, data)
    if (response) {
      setNewData(response)
    }
  }

  useEffect(() => {
    setNewData(undefined)
    setSearch('')
    if (open) {
      getAppData('')
    }
  }, [open, endDate])

  // useEffect(() => {
  //   setSearch('')
  //   setNewData(undefined)
  //   if (search !== '') {
  //     getAppData()
  //   }
  // }, [search])

  const handleSearch = debounce((term: string) => {
    setNewData(undefined)
    setSearch(term)
    getAppData(term)
  }, 300)

  // const getAppDataForToday = async () => {
  //   setNewData(undefined)
  //   setStartDate(new Date())
  //   const data: any = {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     search: '',
  //   }
  //   const response = await getAllAppointmentsForViewBar(setLoading, showToast, data)
  //   if (response) {
  //     setNewData(response)
  //   }
  // }

  const currentDate = new Date()
  const formattedDate = format(currentDate, 'do MMM yy')
  const sDate = format(startDate, 'do MMM yy')
  const eDate = endDate !== null && format(endDate, 'do MMM yy')
  const drawerWidth = useDrawerWidth()
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          px: '20px',
          backgroundColor: theme.palette.mWhite?.main,
        },
      }}
    >
      <div>
        <div
          className={`flex justify-end items-end mb-2 sticky top-0 z-10 py-[10px] bg-white-main`}
          id='header'
        >
          <Button
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette.mMidBlue?.main,
              minWidth: 'max-content',
              height: 20,
            }}
            onClick={() => {
              handleClose()
              setSearch('')
            }}
            disableRipple
          >
            Done
          </Button>
        </div>
        <div className='mb-3'>
          <TxtInput
            control={control}
            name='userName'
            handleChange={() => {}}
            placeholder='Enter patient name, mobile#'
            validation={{}}
            label='Search*'
            handleOnChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between my-2 '>
          <span className='max-mxs:text-sm text-darkBlue-main underline' role='button'>
            Today
          </span>
          <button
            className='text-darkBlue-main font-normal text-sm max-mxs:text-sm text-end'
            onClick={() => setOpenPicker(!openPicker)}
            onKeyDown={() => setOpenPicker(true)}
          >
            {endDate === null ? `${formattedDate}` : `${sDate} - ${eDate}`}
          </button>
          <Dialog
            open={openPicker}
            onClose={() => setOpenPicker(false)}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'end',
              height: '100%',
            }}
          >
            <DialogContent sx={{ display: 'flex', gap: '15px' }}>
              <div className='flex flex-col'>
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  maxDate={addMonths(new Date(), 5)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  showDisabledMonthNavigation
                />
                <div className='bg-pink-main flex items-center justify-center my-2 text-white-main'>
                  <button
                    className=' text-center'
                    onClick={() => {
                      setOpenPicker(false)
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className='flex flex-col gap-5 mb-3'>
          <div>
            <h2 className='text-darkBlue-main font-semibold'>{heading}</h2>
            <Divider
              sx={{
                borderColor: theme.palette.mMediumGray?.main,
                borderWidth: '1/2px',
                marginBottom: '15px',
              }}
            />
            {upcoming && (
              <>
                {newData !== undefined && newData?.upcomingAppointments?.length > 0 ? (
                  newData?.upcomingAppointments?.map((x: any) => (
                    <div
                      className='my-7 rounded-md border-[1px] border-black-main bg-lightGray-main'
                      key={Math.random()}
                    >
                      <div className='relative border-black'>
                        <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                          <span className='rounded-md bg-darkBlue-main px-3'>
                            {x?.appointmentMode}
                          </span>
                          <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                            {x?.specialty[0]?.displayName}
                          </span>
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
                                alt={x.patientFirstName}
                                src={`${CONST_APP_IMAGE_URL}${x?.patientProfilePicture}`}
                                sx={{ backgroundColor: theme.palette.mGray?.main, borderRadius: 0 }}
                              />
                            </div>
                            <div className='leading-5'>
                              <h1>{`${x.patientFirstName} ${x.patientLastName}`}</h1>
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
                                  x?.appointmentMode !== PracticeModeEnum.VIRTUAL_CARE
                                    ? true
                                    : false
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
                          )}
                          <IconButton
                            onClick={() => {
                              // setChatArea(ChatAreaType.Message)
                              setOpenChatDrawer(true)
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
                  ))
                ) : (
                  <div className='flex items-center justify-center h-[202px] mt-3'>
                    There is nothing to show here!
                  </div>
                )}
              </>
            )}
            {complete && (
              <>
                {newData !== undefined && newData?.completedAppointments?.length > 0 ? (
                  newData?.completedAppointments?.map((x: any) => (
                    <div
                      className='my-7 rounded-md border-[1px] border-black-main bg-lightGray-main'
                      key={Math.random()}
                    >
                      <div className='relative border-black'>
                        <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                          <span className='rounded-md bg-darkBlue-main px-3'>
                            {x?.appointmentMode}
                          </span>
                          <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                            {x?.specialty[0]?.displayName}
                          </span>
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
                              <h1>{`${x.patientFirstName} ${x.patientLastName}`}</h1>
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
                          <IconButton
                            onClick={() => {
                              handleClose()
                              // setChatArea(ChatAreaType.Message)
                              setOpenChatDrawer(true)
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
                  ))
                ) : (
                  <div className='flex items-center justify-center h-[202px] mt-3'>
                    There is nothing to show here!
                  </div>
                )}
              </>
            )}
            {cancel && (
              <>
                {newData !== undefined && newData?.cancelledAppointments?.length > 0 ? (
                  newData?.cancelledAppointments?.map((x: any) => (
                    <div
                      className='my-7 rounded-md border-[1px] border-black-main bg-lightGray-main'
                      key={Math.random()}
                    >
                      <div className='relative border-black'>
                        <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white-main text-[12px]'>
                          <span className='rounded-md bg-darkBlue-main px-3'>
                            {x?.appointmentStatus?.enumType}
                          </span>
                          <span className='mr-3 rounded-md bg-darkGray-main px-3'>
                            {x?.specialty[0]?.displayName}
                          </span>
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
                                alt={x.patientFirstName}
                                src={`${CONST_APP_IMAGE_URL}${x?.patientProfilePicture}`}
                                sx={{ backgroundColor: theme.palette.mGray?.main, borderRadius: 0 }}
                              />
                            </div>
                            <div className='leading-5'>
                              <h1>{`${x.patientFirstName} ${x.patientLastName}`}</h1>
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
                          <IconButton
                            onClick={() => {
                              handleClose()
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
                  ))
                ) : (
                  <div className='flex items-center justify-center h-[202px] mt-3'>
                    There is nothing to show here!
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className='h-full text-xs'>
        <span className='flex items-end justify-end h-[265px] text-xs'>
          Ask about our marketing package today and get more appointments in your schedule. Contact
          us at
        </span>
        <a
          aria-label='gmail'
          href={`mailto:${MARKETING_EMAIL}`}
          target='_blank'
          className='text-darkBlue-main text-sm'
        >
          marketing@oopchar.com
        </a>
      </div>
    </Drawer>
  )
}

export default ViewBar
