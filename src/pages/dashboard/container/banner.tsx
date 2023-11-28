import AppointmentCard from '@/components/AppointmentCard'
import Header from '@/components/Header'
import SmallCard from '@/components/SmallCard'
import { theme } from '@/context/ThemeProvider'
import { Divider } from '@mui/material'
import { useState } from 'react'

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
  //Manage states
  const enum MANAGE_STATE {
    UPCOMING = 'upcoming',
    COMPLETE = 'complete',
    CANCEL = 'cancel',
  }

  type ManageState = MANAGE_STATE.UPCOMING | MANAGE_STATE.COMPLETE | MANAGE_STATE.CANCEL | undefined

  const [manageState, setManageState] = useState<ManageState>(undefined)

  return (
    <div className='min-h-screen'>
      <Header />
      <section className='bg-pink-main mt-2 mb-5'>
        <div>
          <div className='py-5 text-white-main'>
            <ul className='flex justify-between items-center list-disc'>
              <li>Latest news/updates in healthcare for patients</li>
              <li>Medicine Reminders</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className='flex justify-between gap-3 flex-wrap'>
            <SmallCard family={true} heading='My Family' para='Manage' />
            <SmallCard medicalForm={true} heading='Medical Forms' para='Manage' />
            <SmallCard healthCard={true} heading='Health Card' para='Update ' />
            <SmallCard
              insurance={true}
              heading='Insurance Calculator'
              para='Manage coverage and expenses'
            />
          </div>
          <Divider sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }} />
          <div className='flex justify-between flex-wrap'>
            <AppointmentCard
              heading='Upcoming Appointments'
              upcoming={true}
              nextClassName={`${SliderString.UP}Next`}
              prevClassName={`${SliderString.UP}Prev`}
              setManageState={setManageState}
              manageState={manageState}
              full={true}
            />
            <AppointmentCard
              heading='Completed Appointments'
              complete={true}
              nextClassName={`${SliderString.COM}Next`}
              prevClassName={`${SliderString.COM}Prev`}
              setManageState={setManageState}
              manageState={manageState}
              full={true}
            />
            <AppointmentCard
              heading='Cancelled Appointments'
              cancel={true}
              nextClassName={`${SliderString.CAN}Next`}
              prevClassName={`${SliderString.CAN}Prev`}
              setManageState={setManageState}
              manageState={manageState}
              full={true}
            />
          </div>
          <span className='flex justify-end font-extralight text-sm pt-4'>
            Copyright © 2023 Triaina Health. All rights reserved.
          </span>
        </div>
      </section>
    </div>
  )
}

export default Banner
