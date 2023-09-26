/* eslint-disable no-empty-pattern */
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../../../../src/assets/images/Aspect_Ratio.jpg'

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
  return (
    <>
      <HeadContent heading={'Meet Providers in person and Get Diagnosed'} wrapperClass='mt-14' />
      <SliderPhotoCard arr={arr} />
      <section>
        <div>
          <div className='text-center mb-3'>Book in-person consultation now</div>
          <div className='flex items-center justify-center mb-5'>
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
          </div>
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
