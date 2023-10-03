/* eslint-disable no-empty-pattern */
import HeadContent from '@/components/HeadContent'
import SliderPhotoCard from '@/components/SliderPhotoCard'
import SvgIcon from '@/components/SvgIcon'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import SelectInput from '@/components/SelectInput'
import { DateInput } from '@/components/DateInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { txtFieldValidation, dateSelectValidation } from '@/utils/form.validation'
import { Button } from '@mui/material'
import { useState } from 'react'
import Appointment from './AppointmentModal'
import { OnlineSchedulingFormField } from '@/types/onlineSchedulingTypes'

interface Props {}

const arr = [
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
  {
    imgName: img1,
    name: 'Heyy',
  },
]

const OnlineScheduling = ({}: Props) => {
  const { control, setValue, clearErrors, setError, handleSubmit } = useForm({
    defaultValues: {
      speciality: '',
      problem: '',
      date: null as Date | null,
    } as OnlineSchedulingFormField,
  })
  //form submission
  const onSubmitHandle: SubmitHandler<OnlineSchedulingFormField> = (data) => {
    console.log(data)
  }

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <HeadContent heading={'AI Enabled Online Scheduling'} wrapperClass='mt-14' />
      <SliderPhotoCard arr={arr} />
      <section>
        <div>
          <div className='text-center mb-3'>Book online consultation now</div>
          <form
            onSubmit={handleSubmit(onSubmitHandle)}
            className='flex items-center justify-center mb-5'
          >
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
                '.MuiOutlinedInput-notchedOutline': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
                '.MuiOutlinedInput-input': {
                  textAlign: 'center',
                },
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
                '.MuiOutlinedInput-notchedOutline': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                '.MuiOutlinedInput-input': {
                  textAlign: 'center',
                },
              }}
            />
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
                '.MuiOutlinedInput-notchedOutline': {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
                '.MuiOutlinedInput-input': {
                  textAlign: 'center',
                },
              }}
            />
            <Button
              variant='contained'
              color='mPink'
              sx={{
                maxWidth: 130,
                minWidth: 130,
                gap: '3px',
              }}
              onClick={handleClickOpen()}
            >
              <SvgIcon iconName='ser' svgProp={{ fill: 'white' }} />
              Find Now
            </Button>
          </form>
          <div className='text-center'>
            With over 120,000 patients served, we're confident in delivering a <br /> healthcare
            experience that truly makes you smile.
          </div>
        </div>
      </section>
      <section className='flex justify-end pr-10 pb-2'>
        <div>
          <SvgIcon iconName='ser' />
        </div>
      </section>
      <Appointment handleClose={handleClose} open={open} />
    </>
  )
}

export default OnlineScheduling
