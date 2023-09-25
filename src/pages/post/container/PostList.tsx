import { Link } from 'react-router-dom'
import { BlogPosts } from '../../../utils/constants'
import { InputAdornment, TextField, Button } from '@mui/material'
import SvgIcon from '../../../components/SvgIcon'
import { useForm } from 'react-hook-form'
import MobileInput from '../../../components/MobileInput'
import TxtInput from '../../../components/TxtInput'
import { acDefaultValue, txtFieldValidation } from '../../../utils/form.validation'
import OtpInput from '../../../components/OtpInput'
import SelectInput from '../../../components/SelectInput'

type Props = {}

const PostList = ({}: Props) => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      phone: 0,
      contryCode: '+1',
      firstName: '',
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      drpVal: acDefaultValue,
    },
  })
  const onSubmitHandle = (data: any) => {
    console.log(data)
  }
  // const drps = [
  //   {
  //     _id: 0,
  //     label: 'hello',
  //   },
  //   {
  //     _id: 1,
  //     label: 'hey',
  //   },
  // ]
  return (
    <>
      <ul className='min-h-screen  p-5 flex flex-col gap-5'>
        {Object.entries(BlogPosts).map(([slug, { title }]) => (
          <li key={slug} className='text-xl font-semibold hover:underline'>
            <Link to={`/posts/${slug}`}>
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
        <form onSubmit={handleSubmit(onSubmitHandle)} className='flex flex-col gap-2'>
          <TextField placeholder='Enter Name' />
          <TextField
            placeholder='Enter Name'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SvgIcon iconName='ser' />
                </InputAdornment>
              ),
            }}
          />
          <OtpInput name={['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']} control={control} />
          <MobileInput
            control={control}
            name={'phone'}
            placeholder='Enter whatsapp number here ...'
            setValue={setValue}
            watch={watch}
            handleChange={() => {}}
          />
          <SelectInput />
          <TxtInput
            name='firstName'
            control={control}
            handleChange={() => {}}
            placeholder='Enter name'
            validation={{ ...txtFieldValidation(true) }}
          />
          <Button type='submit' color='mPink'>
            Submit
          </Button>
        </form>
      </ul>
    </>
  )
}

export default PostList
