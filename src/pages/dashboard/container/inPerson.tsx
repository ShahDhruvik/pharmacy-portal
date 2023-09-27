/* eslint-disable no-empty-pattern */
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../../../../src/assets/images/Aspect_Ratio.jpg'
import { SubmitHandler, useForm } from 'react-hook-form'
import SelectInput from '../../../components/SelectInput'
import { txtFieldValidation, dateSelectValidation } from '../../../utils/form.validation'
import { DateInput } from '../../../components/DateInput'
import { Button } from '@mui/material'
import TxtInput from '../../../components/TxtInput'

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

const InPerson = ({}: Props) => {
  const { control, setValue, clearErrors, setError, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
      contryCode: '+1',
      name: '',
      dob: null as Date | null,
      email: '',
    } as any,
  })
  //form submission
  const onSubmitHandle: SubmitHandler<any> = (data) => {
    console.log(data)
  }
  return (
    <>
      <HeadContent heading={'Meet Providers in person and Get Diagnosed'} wrapperClass='mt-14' />
      <SliderPhotoCard arr={arr} />
      <section>
        <div>
          <div className='text-center mb-3'>Book in-person consultation now</div>
          {/* <div className='flex items-center justify-center mb-5'>
            <input
              type='text'
              className='bg-[#f6f9f7] border-2 border-r-0 border-gray-500 w-80'
              placeholder='Select health speciality'
            />
            <input
              type='text'
              className='bg-[#f6f9f7] border-2 border-r-0 border-gray-500 w-80'
              placeholder='Select your problem'
            />
            <input
              type='text'
              className='bg-[#f6f9f7] border-2 border-r-0 border-gray-500 w-80'
              placeholder='Enter your postal code'
            />
            <input
              type='text'
              className='bg-[#f6f9f7] border-2 border-r-0 border-gray-500 w-40'
              placeholder='Select Date'
            />
            <button className='bg-pink-500 border-2 border-gray-500'>Find Now</button>
          </div> */}
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
                minWidth: '22%',
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
                minWidth: '22%',
              }}
            />
            <TxtInput
              placeholder={'Enter your postal code'}
              name={'name'}
              control={control}
              handleChange={() => {}}
              validation={'Required'}
              sx={{
                minWidth: '22%',
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
                minWidth: '22%',
              }}
            />
            <Button
              variant='contained'
              color='mPink'
              sx={{
                maxWidth: 100,
                minWidth: 100,
              }}
            >
              Find Now
            </Button>
          </form>
          <div className='text-center'>
            With over 120,000 patients served, we're confident in delivering a healthcare experience
            that truly makes you smile.
          </div>
        </div>
      </section>
      <section className='flex justify-end pr-10 pb-2'>
        <div>
          <SvgIcon iconName='ser' />
        </div>
      </section>
    </>
  )
}

export default InPerson
