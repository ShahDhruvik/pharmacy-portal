import React from 'react'
import PayLater from '@/assets/images/pay-later.avif'
import { Button } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@/styles/swipper-assist.css'
import StarCard from '../plans/starCard'
import PackageCards from './packageCard'
import PlanFotter from '../plans/planFotter'
type Props = {}

const Packages = (props: Props) => {
  return (
    <section className='bg-lightGray-main'>
      <div className='flex  flex-col-reverse xl:flex-row gap-2 py-5'>
        <div className='flex-1'>
          <div className='bg-darkBlue-main py-2 px-2 '>
            <h1 className='text-white-main text-xl font-light'>
              Select Treatment Package for Chandrashekhar Deshpande Now!
            </h1>
          </div>
          <p>All our treatment packages come with money back guarantee** </p>
          <PackageCards />
          <PlanFotter />
        </div>
        <div className='bg-white-main hidden lg:flex flex-row justify-evenly   xl:flex-col xl:justify-center xl:items-center pb-3'>
          <div>
            <div className='bg-darkGray-main  py-3 rounded-md xl:self-stretch  '>
              <h1 className='text-white-main text-center '>Need Second Opinion</h1>
            </div>
            <div className=' max-w-xs py-3 rounded-lg mx-2 '>
              <img src={PayLater} alt='pay-later' />
              <Button
                variant='outlined'
                color='mLightBlack'
                sx={{
                  color: theme.palette.mLightBlack?.main,
                  minWidth: '100%',
                  mt: 1,
                }}
              >
                Book Appoiment
              </Button>
            </div>
          </div>
          <div className=''>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              className='bg-pink-light max-w-xs min-h-full rounded-lg xl:aspect-video  '
            >
              <SwiperSlide>
                <div className='flex justify-center items-center h-full'>Slide 1</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex justify-center items-center h-full'>Slide 2</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex justify-center items-center h-full'>Slide 3</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex justify-center items-center h-full'>Slide 4</div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className='max-w-xs bg-darkBlue-main px-3 py-6 xl:py-2 xl:mt-2 rounded-lg flex items-center '>
            <StarCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Packages
