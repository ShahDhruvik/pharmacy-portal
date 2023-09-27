import { useForm } from 'react-hook-form'
import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import TxtInput from '../../../components/TxtInput'
import { Button } from '@mui/material'

interface Props {}

const Contact = ({}: Props) => {
  const { control } = useForm({
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
                />
                <TxtInput
                  placeholder={'Select primary reason for contact'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                />
              </div>
              <div className='flex gap-5 mb-5'>
                <TxtInput
                  placeholder={'Enter phone here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                />
                <TxtInput
                  placeholder={'Enter email here'}
                  name={'name'}
                  control={control}
                  handleChange={() => {}}
                  validation={'Required'}
                />
              </div>
              <div className='flex text-sm gap-10 justify-end items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' name='' id='' />
                  <span>I am not a robot</span>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' name='' id='' />
                  <span>
                    Agree to{' '}
                    <a
                      href='
                    '
                    ></a>
                    terms and condition
                  </span>
                </div>
              </div>
              <div className='flex justify-end py-5'>
                <Button variant='contained' color='mPink'>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className='border-b-2 border-gray-300'></div>
      </div>
    </section>
  )
}

export default Contact
