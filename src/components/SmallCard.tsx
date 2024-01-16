import React, { useState } from 'react'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import img from '@/assets/images/Aspect_Ratio.jpg'
import { Divider } from '@mui/material'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import { theme } from '@/context/ThemeProvider'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import InsuranceBar from '@/pages/insuranceCalculator/insuranceBar'
import MedicalFormBar from '@/pages/medical-form/medical-form-bar'
import FamilyManageBar from '@/pages/familyManage/familyManageBar'
import HealthManageBar from '@/pages/healthManage/healthBar'

interface Props {
  family?: boolean
  medicalForm?: boolean
  healthCard?: boolean
  insurance?: boolean
  heading: string
  para: string
}

const SmallCard = ({ family, medicalForm, healthCard, insurance, heading, para }: Props) => {
  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  //Manage states
  const enum MANAGE_STATE {
    MEDICAL_FORM = 'medicalForm',
    HEALTH_CARD = 'healthCard',
    INSURANCE = 'insurance',
    FAMILY = 'family',
  }
  type ManageState =
    | MANAGE_STATE.FAMILY
    | MANAGE_STATE.HEALTH_CARD
    | MANAGE_STATE.INSURANCE
    | MANAGE_STATE.MEDICAL_FORM
    | undefined
  const [manageState, setManageState] = useState<ManageState>(undefined)

  return (
    <>
      <div className='mb-10 rounded-md border-[1px] border-black-main bg-lightGray-main min-w-64 w-80 h-40 md:shadow-xl shadow-lg'>
        {family && (
          <>
            <div className={insurance ? ' px-3 pt-1' : 'flex flex-wrap justify-between px-3 pt-1'}>
              <h1>{heading}</h1>
              <button
                className='text-darkBlue-main font-light text-[12px]'
                onClick={() => {
                  handleOpenDrawer()
                  setManageState(MANAGE_STATE.FAMILY)
                }}
              >
                {para}
              </button>
            </div>
            <div className='flex items-center justify-center px-3 h-28'>
              <AvatarGroup max={4}>
                <Avatar alt='Remy Sharp' src={img} sx={{ height: '60px', width: '60px' }} />
                <Avatar alt='Travis Howard' src={img} sx={{ height: '60px', width: '60px' }} />
                <Avatar alt='Cindy Baker' src={img} sx={{ height: '60px', width: '60px' }} />
                <Avatar alt='Agnes Walker' src={img} sx={{ height: '60px', width: '60px' }} />
              </AvatarGroup>
            </div>
          </>
        )}
        {medicalForm && (
          <>
            <div className={insurance ? ' px-3 pt-1' : 'flex flex-wrap justify-between px-3 pt-1'}>
              <h1>{heading}</h1>
              <button
                className='text-darkBlue-main font-light text-[12px]'
                onClick={() => {
                  handleOpenDrawer()
                  setManageState(MANAGE_STATE.MEDICAL_FORM)
                }}
              >
                {para}
              </button>
            </div>
            <div className='flex items-center justify-evenly px-3 h-[105px]'>
              <div>
                <PermMediaIcon
                  sx={{ width: '80px', height: '80px', color: theme.palette.mDarkGray?.main }}
                />
              </div>
              <div className='flex flex-col text-darkBlue-main font-light text-[13px] items-start'>
                <button>Medical History Form</button>
                <button>Patient Info Form</button>
                <button>Insurance Form</button>
              </div>
            </div>
            <span className='flex justify-end text-darkBlue-main font-light pr-3 h-[7px]'>
              <button>more...</button>
            </span>
          </>
        )}
        {healthCard && (
          <>
            <div className={insurance ? ' px-3 pt-1' : 'flex flex-wrap justify-between px-3 pt-1'}>
              <h1>{heading}</h1>
              <button
                className='text-darkBlue-main font-light text-[12px]'
                onClick={() => {
                  handleOpenDrawer()
                  setManageState(MANAGE_STATE.HEALTH_CARD)
                }}
              >
                {para}
              </button>
            </div>
            <div className='flex items-center justify-start px-3 h-28'>
              <div>
                {/* <SvgIcon iconName='home' svgProp={{ width: '80px', height: '80px' }} /> */}
                <img src={img1} alt='' className='relative full aspect-video h-24' />
              </div>
            </div>
          </>
        )}
        {insurance && (
          <>
            <div className={insurance ? ' px-3 pt-1' : 'flex flex-wrap justify-between px-3 pt-1'}>
              <h1>{heading}</h1>
              <button
                className='text-darkBlue-main font-light text-[12px]'
                onClick={() => {
                  handleOpenDrawer()
                  setManageState(MANAGE_STATE.INSURANCE)
                }}
              >
                {para}
              </button>
            </div>
            <div className='px-3'>
              <Divider sx={{ paddingTop: '10px' }} />
            </div>
            <div className='px-3 h-24'>
              <div className='flex items-center justify-between pt-3 h-20'>
                <div>
                  <h2 className='text-base'>My Rewards</h2>
                  <p className='flex text-darkBlue-main font-normal items-center gap-1 text-lg'>
                    25050 <span className='text-darkBlue-main font-light text-[12px]'>points</span>
                  </p>
                </div>
                <div className='flex flex-col text-darkBlue-main font-light text-[13px] text-right'>
                  <div>
                    <button onClick={handleOpenDrawer}>Refer a Friend</button>
                  </div>
                  <button onClick={handleOpenDrawer}>Redeem Reward</button>
                  <div></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <FamilyManageBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.FAMILY}
      />
      <MedicalFormBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.MEDICAL_FORM}
      />
      <HealthManageBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.HEALTH_CARD}
      />
      <InsuranceBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.INSURANCE}
      />
    </>
  )
}

export default SmallCard
