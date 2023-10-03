/* eslint-disable no-empty-pattern */
import BookAppointmentCard, { imgArr } from '@/components/BookAppointmentCard'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { theme } from '@/context/ThemeProvider'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { BookInPersonFormField } from '@/types/bookInPersonTypes'
import { useForm } from 'react-hook-form'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation, dateSelectValidation } from '@/utils/form.validation'
import CalendarTabs from '../onlineSch/CalendarTabs'
import SvgIcon from '@/components/SvgIcon'

interface Props {
  children?: React.ReactNode
  index: number
  value: number
}

const data = [
  {
    img: img1,
    name: 'Nakshtra Multi-speciality Clinic',
    address: '3403 Fieldgate Drive, Mississauga, ON, L4X 2J4',
    rating: 4,
    drName: 'Dishank Patel',
    designation: 'MBBS',
  },
  {
    img: img1,
    name: 'Oopchar IVF Clinic',
    address: '3403 Square One Drive, Mississauga, ON, L4X 2J4',
    rating: 4.5,
    drName: 'Vishvajeetsinh Zala',
    designation: 'Ortho',
  },
  {
    img: img1,
    name: 'Nakshtra Multi-speciality Clinic',
    address: '3408 Ganesh Glory Drive, Mississauga, ON, L4X 2J4',
    rating: 4.2,
    drName: 'Dhruvik Shah',
    designation: 'Physio',
  },
]

const CustomTabPanel = (props: Props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: `${theme.palette.mWhite?.main}` }}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const List = () => {
  const [tabValue, setTabValue] = useState(0)
  const [practice, setPractice] = useState('')
  const [flow, setFlow] = useState('')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const { control, setValue, clearErrors, setError } = useForm({
    defaultValues: {
      speciality: '',
      problem: '',
      postalCode: '',
      date: null as Date | null,
    } as BookInPersonFormField,
  })

  return (
    <>
      {/* <div> */}
      <Box
        sx={{
          backgroundColor: practice
            ? `${theme.palette.mLightGray?.main}`
            : `${theme.palette.mWhite?.main}`,
        }}
      >
        <section>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: `${theme.palette.mBlue?.main}`,
              backgroundColor: `${theme.palette.mDarkGreen?.main}`,
              paddingY: '20px',
            }}
          >
            <Tabs value={tabValue} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='List of Practices' {...a11yProps(0)} />
              <Tab label='List of Provides' {...a11yProps(1)} />
              {practice === 'Practice' && <Tab label='Selected of Practice' {...a11yProps(2)} />}
              {practice === 'Provider' && <Tab label='Selected of Provider' {...a11yProps(2)} />}
            </Tabs>
            <form className='flex pt-8 gap-3'>
              <DateInput
                clearErrors={clearErrors}
                control={control}
                handleChange={() => {}}
                label='Select Date'
                name='dob'
                setError={setError}
                validation={{ ...dateSelectValidation('Select Date') }}
                sx={{
                  maxWidth: '250px',
                  backgroundColor: `${theme.palette.mWhite?.main}`,
                  borderRadius: '12px',
                  border: 'none',
                }}
              />
              <SelectInput
                options={[]}
                name={'name'}
                control={control}
                label={'Select health speciality'}
                setValue={setValue}
                setError={() => {}}
                clearErrors={() => {}}
                validation={{ ...txtFieldValidation(true) }}
                sx={{
                  backgroundColor: `${theme.palette.mWhite?.main}`,
                  borderRadius: '12px',
                  border: 'none',
                }}
              />
              <SelectInput
                options={[]}
                name={'name'}
                control={control}
                label={'Select your problem'}
                setValue={setValue}
                setError={() => {}}
                clearErrors={() => {}}
                validation={{ ...txtFieldValidation(true) }}
                sx={{
                  backgroundColor: `${theme.palette.mWhite?.main}`,
                  borderRadius: '12px',
                  border: 'none',
                }}
              />
              <TxtInput
                placeholder={'Enter your postal code'}
                name={'name'}
                control={control}
                handleChange={() => {}}
                validation={'Required'}
                sx={{
                  backgroundColor: `${theme.palette.mWhite?.main}`,
                  borderRadius: '12px',
                  border: 'none',
                }}
              />
            </form>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <div className='flex gap-20'>
              <div className='w-4/6 '>
                {data.map((x) => (
                  <div key={Math.random()}>
                    <BookAppointmentCard
                      img={x.img}
                      name={x.name}
                      address={x.address}
                      rating={x.rating}
                      setPractice={setPractice}
                    />
                  </div>
                ))}
              </div>
              <div className='w-1/3'>
                <img src={img1} />
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <div className='flex gap-20'>
              <div className='w-4/6 '>
                {data.map((x) => (
                  <div key={Math.random()}>
                    <BookAppointmentCard
                      img={x.img}
                      name={x.name}
                      address={x.address}
                      rating={x.rating}
                      drName={x.drName}
                      setPractice={setPractice}
                      designation={x.designation}
                    />
                  </div>
                ))}
              </div>
              <div className='w-1/3'>
                <img src={img1} />
              </div>
            </div>
          </CustomTabPanel>
          {practice && (
            <CustomTabPanel value={tabValue} index={2}>
              <div className='flex gap-20'>
                <div className='w-4/6 '>
                  {data.slice(0, 1).map((x) => (
                    <div key={Math.random()}>
                      <BookAppointmentCard
                        img={x.img}
                        name={x.name}
                        address={x.address}
                        rating={x.rating}
                        setPractice={setPractice}
                        details={true}
                        drName={practice === 'Provider' ? x.drName : ''}
                        designation={practice === 'Provider' ? x.designation : ''}
                      />
                    </div>
                  ))}
                  <h2 className='text-black-main font-semibold text-lg'>
                    Welcome to Nakshtra Multi-speciality clinic
                  </h2>
                  <p className='text-black-main'>
                    Nakshtra Multi-speciality aims to provide individuals with a comfortable and
                    relaxing environment where we strive to exceed your expectations through
                    professional results and our friendly staff
                  </p>
                  <span className='text-blue-main flex justify-end py-3' role='button'>
                    read more....
                  </span>
                  <div className='flex gap-10 justify-between items-center py-5'>
                    {imgArr.map((x) => (
                      <img src={x.imgName} className='w-40 aspect-video' />
                    ))}
                  </div>
                  <div className='flex gap-10 justify-between items-center py-2 text-darkBlue-main'>
                    <span className='flex items-center gap-1'>
                      <SvgIcon iconName={'ser'} />
                      practice@practice.com
                    </span>
                    <span className='flex items-center gap-1'>
                      <SvgIcon iconName={'ser'} />
                      +91 9823608024
                    </span>
                    <span className='flex items-center gap-1'>
                      <SvgIcon iconName={'ser'} />
                      www.nakshtra.com
                    </span>
                  </div>
                </div>
                <div className='w-1/3'>
                  {flow === '' && <CalendarTabs btn={true} setFlow={setFlow} />}
                  {flow === 'One' && (
                    <div>
                      <h1 className='text-black-main pl-3'>Reason for your visit?</h1>
                      <form>
                        <SelectInput
                          options={[]}
                          name={'name'}
                          control={control}
                          label={'Select health speciality'}
                          setValue={setValue}
                          setError={() => {}}
                          clearErrors={() => {}}
                          validation={{ ...txtFieldValidation(true) }}
                          sx={{
                            padding: '8px',
                          }}
                        />
                      </form>
                      <h1 className='bg-black-main text-white-main pl-3 rounded-lg'>
                        Your Appointment for Sexual Health
                      </h1>
                      <div className='bg-lightBlue-main px-8 py-4 text-darkBlue-main m-3 rounded-md'>
                        <div className='flex justify-between items-center'>
                          <span>Appointment For: </span>
                          <span>Mahesh Thakur (Spouse)</span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Appointment Type:</span>
                          <span>In-person at Clinic</span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Appointment Time:</span>{' '}
                          <span className='underline'>19/10/2023 - 09:15 AM</span>
                        </div>
                      </div>
                      <h2 className='mx-3 text-darkBlue-main'>
                        Enter your email if you wish to receive appointment details on your email
                        address:
                      </h2>
                      <div className='mx-3 py-2'>
                        <form>
                          <TxtInput
                            placeholder={'Enter your email address here'}
                            name={'email'}
                            control={control}
                            handleChange={() => {}}
                            validation={'Required'}
                          />
                          <div className='flex justify-between'>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 100,
                                minWidth: 100,
                                marginY: '10px',
                              }}
                              onClick={() => {
                                setFlow('')
                              }}
                            >
                              Back
                            </Button>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 280,
                                minWidth: 280,
                                marginY: '10px',
                              }}
                              onClick={() => {
                                setFlow('Two')
                              }}
                            >
                              Confirm and Pay (INR 499/-)
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  {flow === 'Two' && (
                    <div className='flex flex-col'>
                      <h1 className='text-black-main pl-3'>Reason for your visit?</h1>
                      <form>
                        <SelectInput
                          options={[]}
                          name={'name'}
                          control={control}
                          label={'Select health speciality'}
                          setValue={setValue}
                          setError={() => {}}
                          clearErrors={() => {}}
                          validation={{ ...txtFieldValidation(true) }}
                          sx={{
                            padding: '8px',
                          }}
                        />
                        <Button
                          variant='contained'
                          color='mPink'
                          sx={{
                            maxWidth: 280,
                            minWidth: 280,
                            marginY: '10px',
                          }}
                          onClick={() => {
                            setFlow('Three')
                          }}
                        >
                          Confirm and Pay (INR 499/-)
                        </Button>
                      </form>
                    </div>
                  )}
                  {flow === 'Three' && (
                    <div className='flex flex-col'>
                      <h1 className='text-black-main pl-3'>Reason for your visit?</h1>
                      <form>
                        <SelectInput
                          options={[]}
                          name={'name'}
                          control={control}
                          label={'Select health speciality'}
                          setValue={setValue}
                          setError={() => {}}
                          clearErrors={() => {}}
                          validation={{ ...txtFieldValidation(true) }}
                          sx={{
                            padding: '8px',
                          }}
                        />
                        <h1 className='bg-black-main text-white-main pl-3 rounded-lg'>
                          Your payment is successful and appointment is confirmed
                        </h1>
                        <div className='bg-lightBlue-main px-8 py-4 text-darkBlue-main m-3 rounded-md'>
                          <div className='flex justify-between items-center'>
                            <span>Appointment Type:</span>
                            <span>In-person at Clinic</span>
                          </div>
                          <div className='flex justify-between items-center'>
                            <span>Appointment Time:</span>{' '}
                            <span className='underline'>19/10/2023 - 09:15 AM</span>
                          </div>
                        </div>
                        <h2 className='mx-3 text-darkBlue-main'>
                          You will receive a notification on your whats app number or through email
                          address, we will also send you reminders and follow ups for your
                          appointment.
                        </h2>
                        <div className='flex gap-3 justify-between p-3'>
                          <div className='h-28 aspect-video'>
                            <img src={img1} alt='img1' />
                          </div>
                          <div className='h-28 aspect-video'>
                            <img src={img1} alt='img1' />
                          </div>
                        </div>
                        <div className=' py-2 mx-3'>
                          <div className='flex justify-between gap-2'>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 140,
                                minWidth: 140,
                                marginY: '10px',
                                paddingX: 0,
                              }}
                            >
                              Get Direction
                            </Button>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 140,
                                minWidth: 140,
                                marginY: '10px',
                                paddingX: 0,
                              }}
                            >
                              Book a Ride
                            </Button>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 140,
                                minWidth: 140,
                                marginY: '10px',
                                paddingX: 0,
                              }}
                            >
                              Share Appointment
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </CustomTabPanel>
          )}
        </section>
      </Box>
      {/* </div> */}
    </>
  )
}

export default List
