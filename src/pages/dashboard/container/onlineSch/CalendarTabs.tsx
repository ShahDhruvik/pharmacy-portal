import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

type Props = {
  btn?: boolean
  setFlow?: (item: string) => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const timeSlot = [
  {
    date: 'July 19',
    slots: ['09:30 AM', '10:30 AM', '11:30 AM', '12:30 AM', '01:00 AM', '02:30 AM'],
  },
  {
    date: 'July 21',
    slots: [
      '09:30 AM',
      '10:30 AM',
      '11:30 AM',
      '12:30 AM',
      '01:00 AM',
      '02:30 AM',
      '12:30 AM',
      '01:00 AM',
      '02:30 AM',
    ],
  },
  {
    date: 'July 22',
    slots: [
      '09:30 AM',
      '10:30 AM',
      '11:30 AM',
      '12:30 AM',
      '01:00 AM',
      '02:30 AM',
      '12:30 AM',
      '01:00 AM',
      '02:30 AM',
      '12:30 AM',
      '01:00 AM',
      '02:30 AM',
      '12:30 AM',
      '01:00 AM',
      '02:30 AM',
    ],
  },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const time = ['Morning', 'Afternoon', 'Evening', 'Anytime']

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const CalendarTabs = ({ btn, setFlow }: Props) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='1st Available' {...a11yProps(0)} />
          <Tab label='Calendar View' {...a11yProps(1)} />
          <Tab label='Cannot find preferred time' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {timeSlot.map((x) => (
          <>
            <span className='text-darkBlue-main font-semibold'>{x.date}</span>
            <div className='flex gap-2 flex-wrap pb-5' role='button'>
              {x.slots.map((y) => (
                <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm text-darkGray-main'>
                  {y}
                </div>
              ))}
            </div>
          </>
        ))}
        {btn && (
          <div className='flex justify-end pt-3'>
            <Button
              variant='contained'
              color='mPink'
              onClick={() => {
                setFlow && setFlow('One')
              }}
            >
              Continue
            </Button>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <div className='flex justify-between text-darkGray-main'>
            <span>Today</span>
            <span>19/07/2023</span>
          </div>
          <div className='flex gap-2 text-darkGray-main'>
            <div className='flex flex-col '>
              <span>Tue</span>
              <span>July 19</span>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
            </div>
            <div className='flex flex-col'>
              <span>Wed</span>
              <span>July 20</span>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
            </div>
            <div className='flex flex-col'>
              <span>Thu</span>
              <span>July 21</span>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
            </div>
            <div className='flex flex-col'>
              <span>Fri</span>
              <span>July 22</span>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
            </div>
            <div className='flex flex-col'>
              <span>Sat</span>
              <span>July 23</span>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
              <div className='border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm'>
                09:30 AM
              </div>
            </div>
          </div>
        </div>
        {btn && (
          <div className='flex justify-end pt-3'>
            <Button variant='contained' color='mPink' onClick={() => {}}>
              Continue
            </Button>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <span className='text-darkBlue-main font-normal underline'>Select Preferred Days</span>
        <div className='flex gap-4 justify-between'>
          {days.map((y) => (
            <div className='w-full text-center border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm mb-4 text-darkGray-main'>
              {y}
            </div>
          ))}
        </div>
        <span className='text-darkBlue-main font-normal underline'>Select Preferred Timeslot</span>
        <div className='flex gap-4 justify-between'>
          {time.map((y) => (
            <div className='w-full text-center border-[1px] p-2 rounded-md hover:bg-blue-main hover:text-white-main text-sm text-darkGray-main'>
              {y}
            </div>
          ))}
        </div>
        {btn && (
          <div className='flex justify-end pt-3'>
            <Button variant='contained' color='mPink'>
              Continue
            </Button>
          </div>
        )}
      </CustomTabPanel>
    </Box>
  )
}

export default CalendarTabs
