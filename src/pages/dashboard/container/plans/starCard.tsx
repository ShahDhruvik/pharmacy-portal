import SvgIcon from '@/components/SvgIcon'
import React from 'react'

type Props = {}

const StarCard = (props: Props) => {
  return (
    <>
      <div className='flex-1 flex flex-col justify-center  gap-2'>
        <p className='text-xs text-white-main font-light  text-center tracking-[0.2rem]'>
          TILL NOW
        </p>
        <p className='font-bold text-white-main text-center text-5xl'>19,286</p>
      </div>
      <div className='flex-1'>
        <div className='flex items-center justify-center'>
          <SvgIcon iconName='star' svgProp={{ width: '16px', height: '16px' }} />
          <SvgIcon iconName='star' svgProp={{ width: '16px', height: '16px' }} />
          <SvgIcon iconName='star' svgProp={{ width: '16px', height: '16px' }} />
          <SvgIcon iconName='star' svgProp={{ width: '16px', height: '16px' }} />
          <SvgIcon iconName='star' svgProp={{ width: '16px', height: '24px' }} />
        </div>
        <p className='font-normal text-white-main text-sm text-center'>
          PATIENTS HAVE TRUSTED OUR TREATMENT PLANS
        </p>
      </div>
    </>
  )
}

export default StarCard
