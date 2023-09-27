/* eslint-disable no-empty-pattern */
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../../../../src/assets/images/Aspect_Ratio.jpg'
import SelectInput from '../../../components/SelectInput'
import { DateInput } from '../../../components/DateInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { txtFieldValidation, dateSelectValidation } from '../../../utils/form.validation'
import { Button } from '@mui/material'

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
                minWidth: '33%',
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
                minWidth: '33%',
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
                minWidth: '33%',
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
    </>
  )
}

export default OnlineScheduling
