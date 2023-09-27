/* eslint-disable no-empty-pattern */
import { useState } from 'react'
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'
// import CustomDialog from '../../../components/Dialog-custom'
import { Button } from '@mui/material'
// import { frequentlyAskedQuestions } from '../../../utils/data'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD_PATH } from '../../../Paths'
import Assessment from './assessmentModal'

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
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <section className='bg-lime-main mt-2 mb-14'>
        <div>
          <div className='flex justify-between items-center py-2 flex-wrap'>
            <div className='font-normal'>
              Earn Rewards and Loyalty points,{' '}
              <a href='' className='underline text-blue-main'>
                learn more
              </a>
            </div>
            <div className='flex gap-3 items-center flex-wrap'>
              <span className='font-normal'>To speak to an advisor for free</span>
              <button className='text-sm bg-orange-main text-white-main rounded-2xl px-2 py-1'>
                CALL TODAY
              </button>
              <span className='font-semibold text-2xl text-darkBlue-main'>90000 00000</span>
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
              <Button
                variant='contained'
                color='mPink'
                sx={{
                  maxWidth: 320,
                  minWidth: 320,
                  marginTop: '12px',
                  marginBottom: '4px',
                }}
                onClick={handleClickOpen()}
              >
                Start Free Assessment
              </Button>
              <span className='text-start font-normal text-xs'>
                *Risk free assessment guarantee
              </span>
            </div>
            <div className='flex flex-col max-w-xs'>
              <span className='text-center font-normal'>
                Dont have time to visit a provider in-person, schedule your online visit
              </span>
              <Button
                variant='contained'
                color='mPink'
                sx={{
                  maxWidth: 320,
                  minWidth: 320,
                  marginTop: '12px',
                  marginBottom: '4px',
                }}
                onClick={() => {
                  nav(DASHBOARD_PATH.BOOK_CONSULTATION)
                }}
              >
                Book Online Consultation
              </Button>
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
              <Button
                variant='contained'
                color='mPink'
                sx={{
                  maxWidth: 320,
                  minWidth: 320,
                  marginTop: '12px',
                  marginBottom: '4px',
                }}
                onClick={() => {
                  nav(DASHBOARD_PATH.BOOK_IN_PERSON)
                }}
              >
                Book in-person Consultation
              </Button>
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
      <section className='bg-gray-main'>
        <div className='flex items-center justify-between'>
          <SvgIcon iconName={'arrow_back'} />
          <div className='flex items-center justify-center py-2 flex-wrap'>
            <div className='font-normal text-sm'>
              Book online or in person consultation through Oopchar - plant 2 trees for every
              booking.{' '}
              <a href='/tree' className='underline text-blue-600'>
                Click here
              </a>{' '}
              to know more about CSR initiatives.
            </div>
          </div>
          <SvgIcon iconName={'arrow_forward'} />
        </div>
      </section>
      <Assessment handleClose={handleClose} open={open} />
    </>
  )
}

export default Delivery
