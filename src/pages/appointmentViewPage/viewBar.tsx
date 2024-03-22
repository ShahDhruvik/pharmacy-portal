/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, Avatar, IconButton, Dialog, DialogContent } from '@mui/material'
import { CONST_APP_IMAGE_URL } from '@/utils/constants'
import { format, parse } from 'date-fns'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import SelectInput from '@/components/SelectInput'
import { useForm } from 'react-hook-form'
import {
  acDefaultValue,
  dateSelectValidation,
  searchSelectValidation,
} from '@/utils/form.validation'
import TxtInput from '@/components/TxtInput'
import { dropdownPractice } from '@/lib/DropDownApis'
import { SelectDDL } from '@/types/common'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { getAllAppointments, getAllAppointmentsForViewBar } from '@/lib/Appointment'
import { MANAGE_STATE } from '@/components/AppointmentCard'
import { LocalizationProvider, StaticDatePicker, pickersLayoutClasses } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enGB } from 'date-fns/locale'
import { DateInput } from '@/components/DateInput'
import { values } from 'lodash'

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
  const [show, setShow] = useState(false)
  const [practice, setPractice] = useState<SelectDDL[]>([])
  const [newData, setNewData] = useState<any>(undefined)
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [search, setSearch] = useState<string>('')
  const [openPicker, setOpenPicker] = useState<boolean>(false)
  const [sDate, setSDate] = useState<any>(undefined)
  const [eDate, setEDate] = useState<any>(undefined)

  const { control, setValue, setError, clearErrors, handleSubmit, reset, getValues, watch } =
    useForm({
      defaultValues: {
        practiceId: acDefaultValue,
        patient: acDefaultValue,
      },
    })

  const practiceWatch = watch('practiceId')

  const drpPractice = async () => {
    const res = await dropdownPractice(setLoading, showToast)
    if (res) {
      setPractice(res)
    }
  }

  const getAppData = async (pId: any) => {
    const data: any = {
      startDate: sDate === undefined ? new Date() : sDate,
      endDate: eDate === undefined ? new Date() : eDate,
      practiceId: pId,
      search: search,
    }
    const response = await getAllAppointmentsForViewBar(setLoading, showToast, data)
    if (response) {
      setNewData(response)
    }
  }

  useEffect(() => {
    if (manageState === MANAGE_STATE.UPCOMING) {
      drpPractice()
    }
  }, [manageState])

  useEffect(() => {
    setNewData(undefined)
    if (open) {
      getAppData(-1)
    }
  }, [open])

  useEffect(() => {
    setNewData(undefined)
    if (practiceWatch._id !== '00') {
      getAppData(practiceWatch?._id as any)
    }
  }, [practiceWatch])

  useEffect(() => {
    setSearch('')
    setNewData(undefined)
    if (search !== '') {
      getAppData(-1)
    }
  }, [search])

  const dateClick = () => {
    setOpenPicker(false)
    if (practiceWatch._id !== '00') {
      getAppData(practiceWatch?._id as any)
    } else {
      getAppData(-1)
    }
  }

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
            onClick={() => {
              setShow(!show)
            }}
            disableRipple
          >
            {!show ? `Search by Patient` : `Search by Practice`}
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
          {!show ? (
            <SelectInput
              options={practice as any}
              name={'practiceId'}
              control={control}
              label={'PracticeId*'}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              validation={searchSelectValidation('PracticeId')}
              // handleChange={() => {
              //   setPracId(getValues('practiceId')?._id as any)
              // }}
            />
          ) : (
            <TxtInput
              control={control}
              name='userName'
              handleChange={() => {}}
              placeholder='Enter patient name, mobile#'
              validation={{}}
              label='Search*'
              handleOnChange={(e: any) => setSearch(e.target.value)}
            />
          )}
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
            {`${new Date().toLocaleDateString()}`}
          </Button>
          <Dialog open={openPicker} onClose={() => setOpenPicker(false)}>
            <DialogContent sx={{ display: 'flex', gap: '15px' }}>
              <DateInput
                name='startDate'
                control={control}
                clearErrors={clearErrors}
                handleChange={() => {}}
                validation={dateSelectValidation('Start Date')}
                label={'Start Date*'}
                setError={setError}
                handleOnChange={(e: any) => setSDate(e)}
              />
              <DateInput
                name='endDate'
                control={control}
                clearErrors={clearErrors}
                handleChange={() => {}}
                validation={dateSelectValidation('End Date')}
                label={'End Date*'}
                setError={setError}
                handleOnChange={(e: any) => setEDate(e)}
              />
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
                onClick={dateClick}
              >
                Submit
              </Button>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                <StaticDatePicker
                  value={new Date()}
                  onClose={() => setOpenPicker(false)}
                  sx={{ width: '100%' }}
                  slotProps={{
                    actionBar: {
                      actions: ['clear', 'accept'],
                      sx: {
                        '& .MuiButtonBase-root': {
                          color: 'white !important',
                          minWidth: 100,
                          maxWidth: 100,
                          maxHeight: 20,
                          background: theme.palette.mPink?.main,
                          ':hover': {
                            background: theme.palette.mPink?.main,
                          },
                        },
                      },
                    },
                  }}
                  onAccept={(date) => {
                    // handleSlotChangeInPicker(date)
                    // setSelectedDateFromPicker({ date, updateUsingMain: false })
                  }}
                />
              </LocalizationProvider> */}
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
                {/* <AppointmentCard
                  heading='Upcoming Appointments'
                  upcoming={true}
                  full={false}
                  data={data}
                /> */}
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
            {/* {complete && (
              <>
                {newData &&
                  newData?.length > 0 &&
                  newData?.map((x: any) => (
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
              </>
            )}
            {cancel && (
              <>
                {newData &&
                  newData?.length > 0 &&
                  newData?.map((x: any) => (
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
              </>
            )} */}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default ViewBar
