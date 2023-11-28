/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider } from '@mui/material'
import AppointmentCard from '@/components/AppointmentCard'

type Props = {
  handleClose: () => void
  open: boolean
  heading: string
  upcoming?: boolean
  complete?: boolean
  cancel?: boolean
}

const ViewBar = ({ open, handleClose, heading, upcoming, complete, cancel }: Props) => {
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        width: '28%',
        '& .MuiDrawer-paper': {
          width: '28%',
          px: '20px',
          backgroundColor: theme.palette.mLightGray?.main,
        },
      }}
    >
      <div>
        <div
          className={`flex justify-end items-center mb-3 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
          id='header'
        >
          <Button
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette.mMidBlue?.main,
              minWidth: 'max-content',
              fontSize: '1rem',

              height: 20,
            }}
            onClick={handleClose}
            disableRipple
          >
            Cancel
          </Button>
        </div>
        <div className='flex flex-col gap-5 mb-3'>
          <div>
            <h2>{heading}</h2>
            <Divider
              sx={{
                borderColor: theme.palette.mDarkGray?.main,
                borderWidth: '1.5px',
                marginBottom: '15px',
              }}
            />
            {upcoming && (
              <>
                <AppointmentCard heading='Upcoming Appointments' upcoming={true} full={false} />
                <AppointmentCard heading='Upcoming Appointments' upcoming={true} full={false} />
                <AppointmentCard heading='Upcoming Appointments' upcoming={true} full={false} />
              </>
            )}
            {complete && (
              <>
                <AppointmentCard heading='Completed Appointments' complete={true} full={false} />
                <AppointmentCard heading='Completed Appointments' complete={true} full={false} />
                <AppointmentCard heading='Completed Appointments' complete={true} full={false} />
              </>
            )}
            {cancel && (
              <>
                <AppointmentCard heading='Cancelled Appointments' cancel={true} full={false} />
                <AppointmentCard heading='Cancelled Appointments' cancel={true} full={false} />
                <AppointmentCard heading='Cancelled Appointments' cancel={true} full={false} />
              </>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default ViewBar
