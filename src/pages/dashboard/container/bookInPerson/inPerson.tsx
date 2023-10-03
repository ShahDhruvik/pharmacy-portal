/* eslint-disable no-empty-pattern */
import HeadContent from '@/components/HeadContent'
import SliderPhotoCard from '@/components/SliderPhotoCard'
import SvgIcon from '@/components/SvgIcon'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import { SubmitHandler, useForm } from 'react-hook-form'
import SelectInput from '@/components/SelectInput'
import { txtFieldValidation, dateSelectValidation } from '@/utils/form.validation'
import { DateInput } from '@/components/DateInput'
import { Button } from '@mui/material'
import TxtInput from '@/components/TxtInput'
import { BookInPersonFormField } from '@/types/bookInPersonTypes'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD_PATH } from '@/paths/index'

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
  const nav = useNavigate()

  const { control, setValue, clearErrors, setError, handleSubmit } = useForm({
    defaultValues: {
      speciality: '',
      problem: '',
      postalCode: '',
      date: null as Date | null,
    } as BookInPersonFormField,
  })
  //form submission
  const onSubmitHandle: SubmitHandler<BookInPersonFormField> = (data) => {
    console.log(data)
  }
  return (
    <>
      <HeadContent heading={'Meet Providers in person and Get Diagnosed'} wrapperClass='mt-14' />
      <SliderPhotoCard arr={arr} />
      <section>
        <div>
          <div className='text-center mb-3'>Book in-person consultation now</div>
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
            <TxtInput
              placeholder={'Enter your postal code'}
              name={'name'}
              control={control}
              handleChange={() => {}}
              validation={'Required'}
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
              onClick={() => {
                nav(DASHBOARD_PATH.LIST_OF_BOOK_IN_PERSON)
              }}
            >
              <SvgIcon iconName='ser' svgProp={{ fill: 'white' }} />
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
