/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, Avatar, IconButton, Dialog, DialogContent } from '@mui/material'
import { CONST_APP_IMAGE_URL } from '@/utils/constants'
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
  }, [open])

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

  const currentDate = new Date()
  const formattedDate = format(currentDate, 'do MMMM yyyy')
  const sDate = format(startDate, 'do MMMM yyyy')
  const eDate = endDate !== null && format(endDate, 'do MMMM yyyy')

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
          className={`flex justify-between items-center mb-2 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
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
            disableRipple
          >
            Search by Patient
          </Button>
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
            Cancel
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
            // handleOnChange={(e: any) => setSearch(e.target.value)}
            handleOnChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between my-2'>
          <span className='max-mxs:text-sm text-darkBlue-main' role='button' onClick={() => {}}>
            Today
          </span>
          <Button
            className='max-mxs:text-sm'
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette?.mDarkBlue?.main,
              minWidth: 'max-content',
              fontWeight: 700,
              fontSize: 15,
            }}
            onClick={() => setOpenPicker(!openPicker)}
            onKeyDown={() => setOpenPicker(true)}
          >
            {endDate === null ? `${formattedDate}` : `${sDate} - ${eDate}`}
          </Button>
          <Dialog open={openPicker} onClose={() => setOpenPicker(false)}>
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
                <div className='bg-pink-main flex items-center justify-center my-2'>
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
                {newData !== undefined &&
                  newData?.upcomingAppointments?.length > 0 &&
                  newData?.upcomingAppointments?.map((x: any) => (
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
                            <IconButton>
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
                  ))}
              </>
            )}
            {complete && (
              <>
                {newData !== undefined &&
                  newData?.completedAppointments?.length > 0 &&
                  newData?.completedAppointments?.map((x: any) => (
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
                          {/* <IconButton>
                            <LocationOnOutlinedIcon
                              sx={{
                                color: theme.palette.mWhite?.main,
                                backgroundColor: theme.palette.mDarkGray?.main,
                                padding: '4px',
                                borderRadius: '9999px',
                              }}
                            />
                          </IconButton> */}
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
                          {/* <IconButton>
                            <ThumbUpOutlinedIcon
                              sx={{
                                color: theme.palette.mWhite?.main,
                                backgroundColor: theme.palette.mBlue?.main,
                                padding: '4px',
                                borderRadius: '9999px',
                              }}
                            />
                          </IconButton> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
            {cancel && (
              <>
                {newData !== undefined &&
                  newData?.cancelledAppointments?.length > 0 &&
                  newData?.cancelledAppointments?.map((x: any) => (
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
                          {/* <IconButton>
                            <LocationOnOutlinedIcon
                              sx={{
                                color: theme.palette.mWhite?.main,
                                backgroundColor: theme.palette.mDarkGray?.main,
                                padding: '4px',
                                borderRadius: '9999px',
                              }}
                            />
                          </IconButton> */}
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
                          {/* <IconButton>
                            <MovieOutlinedIcon
                              sx={{
                                color: theme.palette.mWhite?.main,
                                backgroundColor: theme.palette.mPink?.main,
                                padding: '4px',
                                borderRadius: '9999px',
                              }}
                            />
                          </IconButton> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default ViewBar
