/* eslint-disable no-empty-pattern */
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../assets/images/Aspect_Ratio.jpg'

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
  return (
    <>
      <HeadContent heading={'AI Enabled Online Scheduling'} wrapperClass='mt-14' />
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
    </>
  )
}

export default OnlineScheduling
