import SvgIcon from './SvgIcon'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import img from '@/assets/images/Aspect_Ratio.jpg'
import { Divider } from '@mui/material'

interface Props {
  family?: boolean
  medicalForm?: boolean
  healthCard?: boolean
  insurance?: boolean
  heading: string
  para: string
}

const SmallCard = ({ family, medicalForm, healthCard, insurance, heading, para }: Props) => {
  return (
    <>
      <div className='mb-10 rounded-md border-[1px] border-black-main bg-lightGray-main w-64'>
        <div className={insurance ? ' px-3 pt-1' : 'flex flex-wrap justify-between px-3 pt-1'}>
          <h1>{heading}</h1>
          <p className='text-darkBlue-main font-light text-[12px]'>{para}</p>
        </div>
        {family && (
          <div className='flex items-center justify-between px-3 pt-5 pb-2'>
            <AvatarGroup max={4}>
              <Avatar alt='Remy Sharp' src={img} sx={{ height: '60px', width: '60px' }} />
              <Avatar alt='Travis Howard' src={img} sx={{ height: '60px', width: '60px' }} />
              <Avatar alt='Cindy Baker' src={img} sx={{ height: '60px', width: '60px' }} />
              <Avatar alt='Agnes Walker' src={img} sx={{ height: '60px', width: '60px' }} />
            </AvatarGroup>
          </div>
        )}
        {medicalForm && (
          <div className='flex items-center justify-between px-3 pt-5 pb-2'>
            <div>
              <SvgIcon iconName='home' svgProp={{ width: '50px', height: '50px' }} />
            </div>
            <div className='flex flex-col text-darkBlue-main font-light text-[13px]'>
              <span>Medical History Form</span>
              <span>Patient Info Form</span>
              <span>Insurance Form</span>
            </div>
          </div>
        )}
        {healthCard && (
          <div className='flex items-center justify-start px-3 pt-5 pb-2'>
            <div>
              <SvgIcon iconName='home' svgProp={{ width: '80px', height: '80px' }} />
            </div>
          </div>
        )}
        {insurance && (
          <div className='px-3'>
            <Divider sx={{ paddingTop: '10px' }} />
            <div className='flex items-start justify-between pt-3'>
              <div>
                <h2 className='text-base'>My Rewards</h2>
                <p className='flex text-darkBlue-main font-normal items-center gap-1 text-lg'>
                  25050 <span className='text-darkBlue-main font-light text-[12px]'>points</span>
                </p>
              </div>
              <div className='flex flex-col text-darkBlue-main font-light text-[13px] text-right'>
                <span>Refer a Friend</span>
                <span>Redeem Reward</span>
              </div>
            </div>
          </div>
        )}
        {medicalForm && (
          <div className='flex justify-end text-darkBlue-main font-light pr-3'>more...</div>
        )}
      </div>
    </>
  )
}

export default SmallCard
