import SvgIcon from '@/components/SvgIcon'
import CustomDialog from '@/components/Dialog-custom'
import { Button, DialogContentText, DialogTitle, Divider } from '@mui/material'
// import AssessmentWhiteBox from '../../../components/AssessmentWhiteBox'
import { useState } from 'react'
import { FormTypeArray } from '@/types/common'
import { FORMTYPE } from '@/utils/constants'
import SignInForm from '../auth-forms/sign-in-form'
import OTPForm from '../auth-forms/otp-form'
import SignUpForm from '../auth-forms/sign-up-form'
import GuestForm from '../auth-forms/guest-form'
import { theme } from '@/context/ThemeProvider'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { useForm } from 'react-hook-form'
import { txtFieldValidation, dateSelectValidation } from '@/utils/form.validation'
import TxtInput from '@/components/TxtInput'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import FamilyMemberModal from './AddFamilyMemberModal'
import CalendarTabs from './CalendarTabs'
import { family, frequentlyAskedQuestions } from '@/utils/data'
import { Link } from 'react-router-dom'
import {
  OnlineSchedulingFormField,
  SCHEDULING_TYPE,
  SchedulingFormType,
} from '@/types/onlineSchedulingTypes'

type Props = {
  handleClose: () => void
  open: boolean
}

const Appointment = ({ handleClose, open }: Props) => {
  const [signType, setsignType] = useState<FormTypeArray>([])
  const [schedulingType, setSchedulingType] = useState<SchedulingFormType>(undefined)
  const { control, setValue, clearErrors, setError } = useForm({
    defaultValues: {
      speciality: '',
      problem: '',
      date: null as Date | null,
    } as OnlineSchedulingFormField,
  })

  const [open1, setOpen1] = useState(false)
  const handleClickOpen1 = () => () => {
    setOpen1(true)
  }
  const handleClose1 = () => {
    setOpen1(false)
  }

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        maxHeight={510}
        maxWidth={'lg'}
        header={{
          isHeader: true,
          component: (
            <DialogTitle id='scroll-dialog-title'>
              <div className='flex justify-between items-center'>
                <div>
                  <h1 className='leading-3'>Welcome to Virtual Appointment</h1>
                  <span className='text-sm text-blue-main'>Your virtual appointment agent</span>
                </div>
                <div>
                  {schedulingType === undefined ? (
                    <button
                      onClick={() => {
                        handleClose()
                        setsignType([])
                        setSchedulingType(undefined)
                      }}
                    >
                      <SvgIcon
                        iconName='cancel'
                        svgProp={{ fill: theme.palette.mDarkGray?.main }}
                      />
                    </button>
                  ) : (
                    <div className='flex gap-3 pb-3'>
                      <Button
                        variant='contained'
                        color='mPink'
                        sx={{
                          maxWidth: 300,
                          minWidth: 100,
                        }}
                        onClick={() => {
                          if (schedulingType === SCHEDULING_TYPE.FIRST) {
                            setSchedulingType(SCHEDULING_TYPE.SECOND)
                          }
                          if (schedulingType === SCHEDULING_TYPE.SECOND) {
                            setSchedulingType(SCHEDULING_TYPE.THIRD)
                          }
                          if (schedulingType === SCHEDULING_TYPE.THIRD) {
                            setSchedulingType(SCHEDULING_TYPE.FINAL)
                          }
                        }}
                      >
                        {(schedulingType === SCHEDULING_TYPE.THIRD &&
                          'Confirm and Pay (INR 149/-)') ||
                          (schedulingType === SCHEDULING_TYPE.FINAL && 'New Appointment') ||
                          'Next'}
                      </Button>
                      <Button
                        variant='contained'
                        color='mPink'
                        sx={{
                          maxWidth: 100,
                          minWidth: 100,
                        }}
                        onClick={() => setSchedulingType(undefined)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <Divider sx={{ border: '3px solid', color: `${theme.palette.mDarkGray?.main}` }} />
            </DialogTitle>
          ),
        }}
        action={{
          isAction: false,
          component: 'heyy',
        }}
      >
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          <div className='flex w-[1000px] py-5 gap-10'>
            <div className='w-3/5 bg-white-main'>
              {schedulingType === undefined && (
                <div>
                  {(signType.includes(FORMTYPE.SIGNIN) || signType.length === 0) && (
                    <h1 className='bg-black-main text-white-main pl-3'>
                      Please sign in or sign up to proceed
                    </h1>
                  )}
                  {signType.includes(FORMTYPE.SIGNUP) && (
                    <h1 className='bg-black-main text-white-main pl-3'>
                      Please sign up with your mobile number
                    </h1>
                  )}
                  {signType.includes(FORMTYPE.GUEST) && (
                    <h1 className='bg-black-main text-white-main pl-3'>
                      Please proceed as guest with your mobile number
                    </h1>
                  )}
                  <div className='flex flex-col'>
                    <div className='flex flex-col w-fit pr-10 mb-5 p-3 gap-2  rounded-md bg-white-main'>
                      {signType.length === 0 && (
                        <div>
                          <div>Please sign in or sign up using your mobile number</div>
                          <div className='pb-2 flex gap-3'>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 100,
                                minWidth: 100,
                              }}
                              onClick={() => setsignType([FORMTYPE.SIGNIN])}
                            >
                              Sign In
                            </Button>
                            <Button
                              variant='contained'
                              color='mPink'
                              sx={{
                                maxWidth: 100,
                                minWidth: 100,
                              }}
                              onClick={() => setsignType([FORMTYPE.SIGNUP])}
                            >
                              Sign Up
                            </Button>
                          </div>
                          <div>Need time to sign in or sign up, proceed as Guest</div>
                          <div className='pb-2'>
                            <Button
                              variant='contained'
                              color='mPink'
                              onClick={() => setsignType([FORMTYPE.GUEST])}
                            >
                              Process As Guest
                            </Button>
                          </div>
                        </div>
                      )}
                      {signType.includes(FORMTYPE.SIGNIN) && (
                        <SignInForm
                          handleClose={handleClose}
                          setSignType={setsignType}
                          signType={signType}
                        />
                      )}
                      {signType.includes(FORMTYPE.SIGNUP) && (
                        <SignUpForm
                          setSignType={setsignType}
                          handleClose={handleClose}
                          signType={signType}
                        />
                      )}
                      {signType.includes(FORMTYPE.GUEST) && (
                        <GuestForm
                          setSignType={setsignType}
                          handleClose={handleClose}
                          signType={signType}
                        />
                      )}
                      {signType.includes(FORMTYPE.OTP) && <OTPForm />}
                      <span
                        role='button'
                        onClick={() => {
                          setSchedulingType(SCHEDULING_TYPE.FIRST)
                        }}
                      >
                        click
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {schedulingType === SCHEDULING_TYPE.FIRST && (
                <div>
                  <h1 className='bg-black-main text-white-main pl-3'>
                    Please select the treatment method
                  </h1>
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
                    <h1 className='bg-black-main text-white-main pl-3'>
                      Select patient or family member
                    </h1>
                    <span
                      className='flex justify-end pr-2 text-darkBlue-main text-sm py-2 items-center'
                      role='button'
                      onClick={handleClickOpen1()}
                    >
                      <SvgIcon iconName='ser' />
                      Add new family member
                    </span>
                    <table className='flex flex-col mx-3 my-2'>
                      {family.map((x) => (
                        <tr className='flex px-2 justify-between hover:bg-blue-main hover:border-none rounded-md hover:text-white-main text-black-main border-[1px] border-black-main my-1'>
                          <td>{x.name}</td>
                          <td>{x.age}</td>
                          <td>{x.dob}</td>
                          <td>{x.relation}</td>
                          <td>
                            <SvgIcon iconName='ser' />
                          </td>
                        </tr>
                      ))}
                    </table>
                  </form>
                </div>
              )}
              {schedulingType === SCHEDULING_TYPE.SECOND && (
                <div>
                  <h1 className='bg-black-main text-white-main pl-3'>
                    Select your preferred time slot
                  </h1>
                  <CalendarTabs />
                </div>
              )}
              {schedulingType === SCHEDULING_TYPE.THIRD && (
                <div>
                  <h1 className='bg-black-main text-white-main pl-3'>
                    Speciality requested: Sexual Health
                  </h1>
                  <div className='bg-lightBlue-main px-8 py-4 text-darkBlue-main m-3 rounded-md'>
                    <div className='flex justify-between items-center'>
                      <span>Consultation Type: </span>
                      <span>Erectile Disfunction</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Appointment Type:</span>
                      <span>Online Video Call</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Appointment Time:</span>{' '}
                      <span className='underline'>19/10/2023 - 09:15 AM</span>
                    </div>
                  </div>
                  <h2 className='mx-3'>
                    Enter your email if you wish to receive appointment details and the sexual
                    health educational video link on your email address:
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
                      <Button
                        variant='contained'
                        color='mPink'
                        sx={{
                          maxWidth: 300,
                          minWidth: 300,
                          marginY: '10px',
                        }}
                      >
                        Confirm and Pay (INR 149/-)
                      </Button>
                    </form>
                  </div>
                </div>
              )}
              {schedulingType === SCHEDULING_TYPE.FINAL && (
                <div>
                  <h1 className='bg-black-main text-white-main pl-3'>
                    Speciality requested: Sexual Health
                  </h1>
                  <div className='bg-lightBlue-main px-8 py-4 text-darkBlue-main m-3 rounded-md'>
                    <div className='flex justify-between items-center'>
                      <span>Consultation Type: </span>
                      <span>Erectile Disfunction</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Appointment Type:</span>
                      <span>Online Video Call</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Appointment Time:</span>{' '}
                      <span className='underline'>19/10/2023 - 09:15 AM</span>
                    </div>
                  </div>
                  <h2 className='mx-3'>
                    You will receive a notification on your whats app number or through email
                    address, we will also send you reminders and follow ups for your appointment.
                  </h2>
                </div>
              )}
              {(schedulingType === undefined ||
                schedulingType === SCHEDULING_TYPE.FIRST ||
                schedulingType === SCHEDULING_TYPE.THIRD) && (
                <div className='flex gap-3 justify-between px-3'>
                  <div className='h-36 aspect-video'>
                    <img src={img1} alt='img1' />
                  </div>
                  <div className='h-36 aspect-video'>
                    <img src={img1} alt='img1' />
                  </div>
                </div>
              )}
            </div>
            <div className='w-2/5 bg-white-main'>
              <h1 className='bg-black-main text-white-main pl-5'>
                {schedulingType === SCHEDULING_TYPE.THIRD
                  ? 'Here is some more help for you'
                  : 'Your appointment details'}
              </h1>
              {(schedulingType === SCHEDULING_TYPE.FIRST ||
                schedulingType === SCHEDULING_TYPE.SECOND ||
                schedulingType === undefined) && (
                <div className='p-5'>
                  <span className='text-black-main font-semibold'>Health Speciality</span>
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
                      paddingBottom: '8px',
                    }}
                  />
                  <span className='text-black-main font-semibold'>Consultation Type</span>
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
                      paddingBottom: '8px',
                    }}
                  />
                  <span className='text-black-main font-semibold'>Appointment or Visit Type</span>
                  <TxtInput
                    placeholder={'Enter name here'}
                    name={'name'}
                    control={control}
                    handleChange={() => {}}
                    validation={'Required'}
                    sx={{
                      paddingBottom: '8px',
                    }}
                  />
                  <span className='text-black-main font-semibold'>Appointment Time</span>
                  <DateInput
                    clearErrors={clearErrors}
                    control={control}
                    handleChange={() => {}}
                    label='Select Date'
                    name='dob'
                    setError={setError}
                    validation={{ ...dateSelectValidation('Select Date') }}
                    sx={{
                      paddingBottom: '8px',
                    }}
                  />
                  <div className='aspect-video justify-end flex flex-col'>
                    <img src={img1} alt='img1' />
                  </div>
                </div>
              )}
              {(schedulingType === SCHEDULING_TYPE.THIRD ||
                schedulingType === SCHEDULING_TYPE.FINAL) && (
                <div className='p-4'>
                  {frequentlyAskedQuestions.map((x) => (
                    <Link to={'/faq'}>
                      <div className='flex flex-col'>
                        <div className='border-[1px] border-black-main flex w-full mt-3 py-1 gap-2 px-3 rounded-md bg-white-main'>
                          <div>
                            <SvgIcon iconName={'ser'} />
                          </div>
                          <div>{x.que}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className='aspect-video justify-end flex flex-col'>
                    <img src={img1} alt='img1' />
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContentText>
      </CustomDialog>
      <FamilyMemberModal handleClose={handleClose1} open={open1} />
    </>
  )
}

export default Appointment
