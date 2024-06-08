/* eslint-disable react-hooks/exhaustive-deps */
import AppointmentCard from '@/components/AppointmentCard'
import { theme } from '@/context/ThemeProvider'
import { getAllAppointments } from '@/lib/Appointment'
import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { useLoading } from '@/context/LoadingContext'
import { useAuth } from '@/context/AuthContext'
import img from '@/assets/images/Aspect_Ratio.jpg'
import { RibbonField } from '@/types/ribbonTypes'
import { getAllRibbon } from '@/lib/DashboardContent'
import { subYears } from 'date-fns'
import TriainaBanner from '@/assets/images/Triaina-Banner.png'

interface Props {}

const enum SliderString {
  UP = 'up',
  COM = 'com',
  CAN = 'can',
}

const Banner = ({}: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  //Manage states
  const enum MANAGE_STATE {
    UPCOMING = 'upcoming',
    COMPLETE = 'complete',
    CANCEL = 'cancel',
  }

  type ManageState = MANAGE_STATE.UPCOMING | MANAGE_STATE.COMPLETE | MANAGE_STATE.CANCEL | undefined
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)
  const { authParams } = useAuth()
  const [manageState, setManageState] = useState<ManageState>(undefined)
  const [ribbon, setRibbon] = useState<RibbonField[]>([])

  const getAppData = async () => {
    const response = await getAllAppointments(setLoading, showToast)
    if (response) {
      setAppointmentDetails(response)
    }
  }
  const getRibbonData = async () => {
    const response = await getAllRibbon(setLoading, showToast)
    if (response) {
      setRibbon(response)
    }
  }

  useEffect(() => {
    if (authParams?.isAuth) {
      getRibbonData()
      getAppData()
    }
  }, [authParams?.isAuth])

  return (
    <div className='min-h-screen overflow-hidden'>
      <section className='bg-pink-main mt-2 mb-5'>
        <div>
          <ul className='list-disc text-white-main h-16 flex items-center md:justify-between w-max gap-10 scrollable-list'>
            {ribbon?.length > 0 && ribbon?.map((x) => <li key={x._id}>{x?.displayName}</li>)}
          </ul>
        </div>
      </section>
      <section>
        <div>
          <div
            className={`flex justify-center ${
              appointmentDetails?.upcomingAppointments &&
              appointmentDetails?.upcomingAppointments?.length > 1
                ? ''
                : 'items-center'
            } md:justify-evenly lg:justify-between flex-wrap`}
          >
            <AppointmentCard
              heading='Upcoming Appointments'
              upcoming={true}
              nextClassName={`${SliderString.UP}Next`}
              prevClassName={`${SliderString.UP}Prev`}
              setManageState={setManageState}
              manageState={manageState}
              full={true}
              data={appointmentDetails?.upcomingAppointments?.slice(0, 5)}
            />
            <AppointmentCard
              heading='Completed Appointments'
              complete={true}
              nextClassName={`${SliderString.COM}Next`}
              prevClassName={`${SliderString.COM}Prev`}
              setManageState={setManageState}
              manageState={manageState}
              full={true}
              data={appointmentDetails?.completedAppointments?.slice(0, 5)}
            />
            <AppointmentCard
              heading='Cancelled Appointments'
              cancel={true}
              nextClassName={`${SliderString.CAN}Next`}
              prevClassName={`${SliderString.CAN}Prev`}
              setManageState={setManageState}
              manageState={manageState}
              full={true}
              data={appointmentDetails?.cancelledAppointments?.slice(0, 5)}
            />
          </div>
          <div className='w-full'>
            <img src={TriainaBanner} alt='TriainaBanner' className='w-full my-5 h-60' />
          </div>
          <span className='flex justify-end font-light sm:text-sm text-xs pt-4 pb-2'>
            {`Copyright © ${subYears(new Date(), 1).getFullYear()}-${new Date()
              .getFullYear()
              .toString()
              .slice(-2)} Triaina Health. All rights reserved.`}
          </span>
        </div>
      </section>
    </div>
  )
}

export default Banner
