import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@/styles/swipper-assist.css'
type Props = {}

const AssistSlider = (props: Props) => {
  return (
    <div className='sticky top-0 h-max'>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='bg-pink-light max-w-xs h-[450px]'
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
  )
}

export default AssistSlider
