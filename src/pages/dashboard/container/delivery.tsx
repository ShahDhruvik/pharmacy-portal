/* eslint-disable no-empty-pattern */
import { useState } from 'react'
import SvgIcon from '../../../components/SvgIcon'
import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import HeadContent from '../../../components/HeadContent'
import SliderPhotoCard from '../../../components/SliderPhotoCard'
import CustomDialog from '../../../components/Dialog-custom'
import { Button, DialogContentText, DialogTitle } from '@mui/material'
import { frequentlyAskedQuestions } from '../../../utils/data'

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
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
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
      <CustomDialog
        open={open}
        handleClose={handleClose}
        maxHeight={510}
        maxWidth={'lg'}
        header={{
          isHeader: true,
          component: (
            <DialogTitle id='scroll-dialog-title' className='border-b-2 border-black'>
              <div className='flex justify-between items-center'>
                <div>
                  <h1 className='leading-3'>Welcome to Virtual Assessment</h1>
                  <span className='text-sm text-blue-950'>Daisy: Your virtual health agent</span>
                </div>
                <div>
                  <button onClick={() => handleClose()}>
                    <SvgIcon iconName='ser' />
                  </button>
                </div>
              </div>
            </DialogTitle>
          ),
        }}
        action={{
          isAction: false,
          component: 'heyy',
        }}
      >
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          <div className='flex w-[1000px] py-5'>
            <div className='w-3/5'>
              <div className='flex flex-col'>
                <div className='flex items-baseline gap-1'>
                  <div className='border-2 border-black flex w-fit pr-10 mt-3 py-1 gap-2 px-3 rounded-md bg-slate-200'>
                    <div>Hi, I am Virca.</div>
                  </div>
                  <div>
                    <SvgIcon iconName={'ser'} />
                  </div>
                </div>
                <div className='flex items-baseline gap-1'>
                  <div className='border-2 border-black flex w-fit pr-10 mt-3 py-1 gap-2 px-3 rounded-md bg-slate-200'>
                    <div>
                      I am here 24/7 to help with your health issues. If at any point I'm not able
                      to assist you, I'll connect you to a consultant who can
                    </div>
                  </div>
                  <div>
                    <SvgIcon iconName={'ser'} />
                  </div>
                </div>
                <div className='flex items-baseline gap-1'>
                  <div className='border-2 border-black w-fit mt-3 py-1 pr-10 gap-2 px-3 rounded-md bg-slate-200'>
                    <div>Please sign in or sign up using your mobile number</div>
                    <div className='pb-2 flex gap-3'>
                      <Button
                        variant='contained'
                        color='mPink'
                        sx={{
                          maxWidth: 100,
                          minWidth: 100,
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        variant='contained'
                        color='mPink'
                        sx={{
                          maxWidth: 100,
                          minWidth: 100,
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                    <div>Need time to sign in or sign up, proceed as Guest</div>
                    <div className='pb-2'>
                      <Button variant='contained' color='mPink'>
                        Process As Guest
                      </Button>
                    </div>
                  </div>
                  <div>
                    <SvgIcon iconName={'ser'} />
                  </div>
                </div>
              </div>
            </div>
            <div className='border-x-2 border-gray-300 mx-5'></div>
            <div className='w-2/5'>
              <h2>Frequently Asked Questions</h2>
              {frequentlyAskedQuestions.map((x) => (
                <div className='flex flex-col'>
                  <div className='border-2 border-black flex w-full mt-3 py-1 gap-2 px-3 rounded-md bg-slate-200'>
                    <div>
                      <SvgIcon iconName={'ser'} />
                    </div>
                    <div>{x.que}</div>
                  </div>
                </div>
              ))}
              <span className='text-blue-950 flex justify-end py-3'>read more....</span>
            </div>
          </div>
        </DialogContentText>
      </CustomDialog>
    </>
  )
}

export default Delivery
