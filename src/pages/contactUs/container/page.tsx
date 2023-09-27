import { useForm } from 'react-hook-form'
import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import TxtInput from '../../../components/TxtInput'
import { Button } from '@mui/material'
import SelectInput from '../../../components/SelectInput'
import PermissionForm from '../../dashboard/container/signIn/permission-form'

interface Props {}

const Contact = ({}: Props) => {
  const { control, setValue } = useForm({
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
        <div className='flex gap-10 px-5 items-center min-h-[600px] '>
          <div className='w-2/5'>
            <img src={img1} alt='image' />
          </div>
          <div className='w-3/5'>
            <h1 className='text-3xl pb-5'>Get in Touch</h1>
            <form>
              <div className='flex gap-5 mb-5'>
                <TxtInput
                  placeholder={'Enter name here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                  sx={{
                    minWidth: '50%',
                  }}
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
                  sx={{
                    minWidth: '50%',
                  }}
                />
              </div>
              <div className='flex gap-5 mb-5'>
                <TxtInput
                  placeholder={'Enter phone here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                  sx={{
                    minWidth: '50%',
                  }}
                />
                <TxtInput
                  placeholder={'Enter email here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                  sx={{
                    minWidth: '50%',
                  }}
                />
              </div>
              <div className='mb-5'>
                <TxtInput
                  placeholder={'Type message here...'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                  sx={{
                    minWidth: '102.5%',
                  }}
                  multiline={15}
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
