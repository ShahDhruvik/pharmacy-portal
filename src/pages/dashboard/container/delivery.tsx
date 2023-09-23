/* eslint-disable no-empty-pattern */
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'

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

const Delivery = ({}: Props) => {
  return (
    <>
      <section className='bg-[#f6f9f7] mt-2 mb-14'>
        <div>
          <div className='flex justify-between items-center py-2 flex-wrap'>
            <div className='font-normal'>
              Earn Rewards and Loyalty points,{' '}
              <a href='' className='underline text-blue-600'>
                learn more
              </a>
            </div>
            <div className='flex gap-3 items-center flex-wrap'>
              <span className='font-normal'>To speak to an advisor for free</span>
              <button className='text-sm bg-red-600 text-white rounded-2xl px-2 py-1'>
                CALL TODAY
              </button>
              <span className='font-semibold text-2xl text-blue-800'>90000 00000</span>
            </div>
          </div>
        </div>
      </section>
      <HeadContent heading={'Delivering top rated health care'} />
      <SliderPhotoCard arr={arr} />
      <section>
        <div>
          <div className='flex py-10 flex-wrap justify-evenly gap-10'>
            <div className='flex flex-col max-w-xs'>
              <span className='text-center font-normal'>
                Unsure of your health issue, take two minute assessment
              </span>
              <button className='text-sm bg-pink-600 text-white rounded-2xl px-2 py-1 mt-3 mb-1'>
                Start Free Assessment
              </button>
              <span className='text-start font-normal text-xs'>
                *Risk free assessment guarantee
              </span>
            </div>
            <div className='flex flex-col max-w-xs'>
              <span className='text-center font-normal'>
                Dont have time to visit a provider in-person, schedule your online visit
              </span>
              <button className='text-sm bg-pink-600 text-white rounded-2xl px-2 py-1 mt-3 mb-1'>
                Book Online Consultation
              </button>
              <span className='text-start font-normal text-xs'>
                *Risk free assessment guarantee
              </span>

              <span className='text-start font-normal text-xs'>
                *Sign up and get first online consultation for free
              </span>
            </div>
            <div className='flex flex-col max-w-xs'>
              <span className='text-center font-normal'>
                Want to see a Doctor in-person, schedule your clinic visit
              </span>{' '}
              <button className='text-sm bg-pink-600 text-white rounded-2xl px-2 py-1 mt-3 mb-1'>
                Book in-person Consultation
              </button>
              <span className='text-start font-normal text-xs'>
                *Risk free assessment guarantee
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className='flex justify-end pr-10 pb-2'>
        <div>
          <SvgIcon iconName='ser' />
        </div>
      </section>
      <section className='bg-gray-400'>
        <div className='flex items-center justify-between'>
          <SvgIcon iconName={'arrow_back'} />
          <div className='flex items-center justify-center py-2 flex-wrap'>
            <div className='font-normal text-sm'>
              Book online or in person consultation through Oopchar - plant 2 trees for every
              booking.{' '}
              <a href='' className='underline text-blue-600'>
                Click here
              </a>{' '}
              to know more about CSR initiatives.
            </div>
          </div>
          <SvgIcon iconName={'arrow_forward'} />
        </div>
      </section>
    </>
  )
}

export default Delivery
