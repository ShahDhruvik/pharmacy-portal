import { useForm } from 'react-hook-form'
import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import TxtInput from '../../../components/TxtInput'
import { Button } from '@mui/material'
import SelectInput from '../../../components/SelectInput'
import PermissionForm from '../../dashboard/container/auth-forms/permission-form'
import { DateInput } from '../../../components/DateInput'

interface Props {}

const Contact = ({}: Props) => {
  const { control, setValue, setError, clearErrors } = useForm({
    defaultValues: {
      type: '',
      code: '',
      active: true,
      note: '',
      details: '',
    },
  })
  return (
    <section className='min-h-screen'>
      <div>
        <div className='flex gap-10 px-5  min-h-[600px] items-center'>
          <div className='flex-1'>
            <img src={img1} alt='image' />
          </div>
          <div className='flex-1'>
            <h1 className='text-3xl pb-5'>Get in Touch</h1>
            <form>
              <div className='flex gap-4 mb-5'>
                <TxtInput
                  placeholder={'Enter name here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                />
                <SelectInput
                  options={[]}
                  name={'name'}
                  control={control}
                  label={'Select primary reason for contact'}
                  setValue={setValue}
                  setError={() => {}}
                  clearErrors={() => {}}
                  validation={'Required'}
                />
              </div>
              <div className='flex gap-5 mb-5'>
                <SelectInput
                  control={control}
                  name='drpVal'
                  label='Drp'
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                  validation={{}}
                  handleChange={() => {}}
                  options={[]}
                />
                <DateInput
                  name='dateVal'
                  control={control}
                  clearErrors={clearErrors}
                  handleChange={() => {}}
                  validation={'Required'}
                  label={'Date'}
                  setError={setError}
                />
              </div>
              <div className='mb-5'>
                <TxtInput
                  placeholder={'Type message here...'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                  multiline={3}
                />
              </div>
              <div className='flex text-sm gap-10 justify-end items-center w-full'>
                <PermissionForm signType={[]} />
              </div>
              <div className='flex justify-end py-5 w-full'>
                <Button variant='contained' color='mPink'>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className='border-b-2 border-gray-main'></div>
      </div>
    </section>
  )
}

export default Contact
