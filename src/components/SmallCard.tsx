import React, { useEffect, useState } from 'react'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Abha from '@/assets/images/abha.png'
import { Divider } from '@mui/material'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import { theme } from '@/context/ThemeProvider'
import InsuranceBar from '@/pages/insuranceCalculator/insuranceBar'
import MedicalFormBar from '@/pages/medical-form/medical-form-bar'
import FamilyManageBar from '@/pages/familyManage/familyManageBar'
import HealthManageBar from '@/pages/healthManage/healthBar'
import CoverageAndExpenseBar from '@/pages/insuranceCalculator/coverageAndExpense'
import { getAllFamily } from '@/lib/Family'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { FamilyField } from '@/types/FamilyTypes'
import { CONST_APP_IMAGE_URL } from '@/utils/constants'
import { useAuth } from '@/context/AuthContext'

interface Props {
  family?: boolean
  medicalForm?: boolean
  healthCard?: boolean
  insurance?: boolean
  heading: string
  para: string
  familyData?: any
}

export const enum MANAGE_STATE {
  MEDICAL_FORM = 'medicalForm',
  HEALTH_CARD = 'healthCard',
  INSURANCE = 'insurance',
  FAMILY = 'family',
  COVERAGE_AND_EXPENSE = 'CoverageAndExpense',
}

const SmallCard = ({
  family,
  medicalForm,
  healthCard,
  insurance,
  heading,
  para,
  familyData,
}: Props) => {
  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  //Manage states

  type ManageState =
    | MANAGE_STATE.FAMILY
    | MANAGE_STATE.HEALTH_CARD
    | MANAGE_STATE.INSURANCE
    | MANAGE_STATE.MEDICAL_FORM
    | MANAGE_STATE.COVERAGE_AND_EXPENSE
    | undefined
  const [manageState, setManageState] = useState<ManageState>(undefined)
  // const [data, setData] = useState<FamilyField[]>([])

  const { setLoading, loading } = useLoading()
  const { authParams } = useAuth()
  const showToast = useToast()

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
                {familyData?.map((x: any) => (
                  <Avatar
                    src={
                      x?.account?.profilePicture !== ''
                        ? `${CONST_APP_IMAGE_URL}${x?.account?.profilePicture}`
                        : 'a'
                    }
                    alt={String(x?.account?.firstName)
                      .charAt(0)
                      .toUpperCase()}
                    sx={{ height: '60px', width: '60px' }}
                  />
                ))}
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
            <div className='flex items-center justify-between gap-3 px-3 h-[105px]'>
              <div>
                <PermMediaIcon
                  sx={{ width: '80px', height: '80px', color: theme.palette.mDarkGray?.main }}
                />
              </div>
              <div className='flex flex-col text-darkBlue-main font-light text-[13px] items-start'>
                <span>Manage and share your health information digitally.</span>
              </div>
            </div>
            {/* <span className='flex justify-end text-darkBlue-main font-light pr-3 h-[7px]'>
              <button>more...</button>
            </span> */}
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
                <img src={Abha} alt='' className='relative full aspect-video h-24' />
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
                  setManageState(MANAGE_STATE.COVERAGE_AND_EXPENSE)
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
                    <button
                      onClick={() => {
                        handleOpenDrawer()
                        setManageState(MANAGE_STATE.INSURANCE)
                      }}
                    >
                      Refer a Friend
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      handleOpenDrawer()
                      setManageState(MANAGE_STATE.INSURANCE)
                    }}
                  >
                    Redeem Reward
                  </button>
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
        manageState={manageState as any}
      />
      <MedicalFormBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.MEDICAL_FORM}
      />
      <HealthManageBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.HEALTH_CARD}
        manageState={manageState as any}
      />
      <InsuranceBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.INSURANCE}
      />
      <CoverageAndExpenseBar
        handleClose={handleCloseDrawer}
        open={openDrawer && manageState === MANAGE_STATE.COVERAGE_AND_EXPENSE}
        manageState={manageState as any}
      />
    </>
  )
}

export default SmallCard
