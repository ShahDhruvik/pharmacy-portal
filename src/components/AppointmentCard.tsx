import SvgIcon from './SvgIcon'

interface Props {
  heading: string
}

const AppointmentCard = ({ heading }: Props) => {
  return (
    <>
      <div>
        <div className='flex justify-between px-1 pb-3 pt-2'>
          <span className='text-darkBlue-main font-semibold'>{heading}</span>
          <span className='flex'>
            <SvgIcon iconName={'arrow_back'} />
            <SvgIcon iconName={'arrow_forward'} />
          </span>
        </div>
        <div className='mt-5 rounded-md border-[1px] border-black-main bg-lightGray-main'>
          <div className='relative border-black'>
            <div className='absolute inset-0 flex items-center justify-end md:gap-3 gap-1 leading-5 text-white'>
              <span className='rounded-md bg-blue-main md:px-8 px-3'>first</span>
              <span className='rounded-md bg-orange-main md:px-8 px-3'>Second</span>
              <span className='mr-3 rounded-md bg-gray-main md:px-8 px-3'>Third</span>
            </div>
          </div>
          <div className='flex items-center justify-between gap-5  p-5'>
            <div className='flex w-4/5 flex-col gap-5'>
              <div className='flex items-start gap-5'>
                <div>Img</div>
                <div className='leading-5'>
                  <h1>Dr Vageesh Sabharwal</h1>
                  <p className='text-darkBlue-main font-light text-[13px]'>
                    Nakshtra Multi-speciality Clinic
                  </p>
                  <p className='text-darkGray-main font-light text-[13px]'>
                    3403 Fieldgate Drive, Mississauga, ON, L4X 2J4
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-5'>
                <div>Img</div>
                <div className='leading-5'>
                  <h1>Yogi Pathare</h1>
                  <p className='text-darkBlue-main font-light text-[13px]'>19 July 2023 </p>
                  <p className='text-darkBlue-main font-light text-[13px]'>10:15 AM to 11:00 AM</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <span>
                <SvgIcon iconName='home' />
              </span>
              <span>
                <SvgIcon iconName='home' />
              </span>
              <span>
                <SvgIcon iconName='home' />
              </span>
              <span>
                <SvgIcon iconName='home' />
              </span>
            </div>
          </div>
        </div>
        <div className='flex justify-end text-darkBlue-main font-light'>view all</div>
      </div>
    </>
  )
}

export default AppointmentCard
