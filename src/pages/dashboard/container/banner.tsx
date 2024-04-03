import AppointmentCard from '@/components/AppointmentCard'
import Header from '@/components/Header'
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

interface Props {}

const arr = [
  {
    heading: [
      {
        title: 'In-Person',
        color: '#D4D4D4',
      },
      {
        title: 'Confirmed',
        color: '#D4D4D4',
      },
      {
        title: 'Sexual Health',
        color: '#D4D4D4',
      },
    ],
    img: 'img',
    name: 'Dr Vageesh Sabharwal',
    clinicName: 'Nakshtra Multi-speciality Clinic',
    address: `3403 Fieldgate Drive,
        Mississauga, ON, L4X 2J4`,
    img1: 'string',
    patientName: 'Yogi Pathare',
    date: '19 July 2023',
    time: '10:15 AM to 11:00 AM',
  },
]

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
    <div className='min-h-screen'>
      <Header />
      <section className='bg-pink-main mt-2 mb-5'>
        <div>
          <div className='py-5 text-white-main'>
            <ul className='list-disc scrolling-text'>
              {ribbon?.length > 0 && ribbon?.map((x) => <li key={x._id}>{x?.displayName}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className='flex justify-between flex-wrap'>
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
          {/* <Divider sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }} /> */}
          <div className='w-full'>
            <img src={img} alt='img' className='w-full my-5 h-60' />
          </div>
          <span className='flex justify-end font-extralight text-sm pt-4'>
            Copyright © 2024 Triaina Health. All rights reserved.
          </span>
        </div>
      </section>
    </div>
  )
}

export default Banner
