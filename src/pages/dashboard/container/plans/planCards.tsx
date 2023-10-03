import { Button, Chip } from '@mui/material'
import React from 'react'
import PlanCard from '@/assets/images/plan-card.png'
import { Link } from 'react-router-dom'
import { theme } from '@/context/ThemeProvider'

type Props = {}

const planardsData = [
  {
    heading: '14 Days Medicine',
    imgPath: PlanCard,
    list: ['One free online consultation*', 'Prescribed medicine', 'One free follow up'],
    para: 'Our medical team will dispatch a 14-day supply of the prescribed medication. Following this, one of our healthcare counselors will conduct a follow-up to evaluate your health advancement.',
    amount: '450',
    linkPath: '',
    onClickFnc: () => {},
    type: '',
  },
  {
    heading: '14 Days Medicine',
    imgPath: PlanCard,
    list: ['One free online consultation* ', 'Prescribed lab test', 'One free follow up'],
    para: 'You will receive a prescription for specific laboratory tests. Once the test results are accessible, a medical councillor from our team will reach out to you. They will review the results with you & offer guidance on the next steps',
    amount: '4500',
    linkPath: '',
    onClickFnc: () => {},
    type: 'Recommended',
  },
  {
    heading: '14 Days Medicine',
    imgPath: PlanCard,
    list: [
      ' In-person consultations',
      'All laboratory tests',
      ' Assessments by an expert',
      ' Counselling sessions',
      '3 Months medication',
      'Follow up by medical team',
      ' SH devices for complete care',
      'Comprehensive diet plan',
      'Virtual exercise plan',
      'Money Back Guarantee*',
    ],
    para: '',
    amount: '6000-9000',
    linkPath: '',
    onClickFnc: () => {},
    type: 'Best Value',
  },
]

const PlanCards = (props: Props) => {
  return (
    <div className='mt-5  flex justify-around lg:justify-between flex-wrap gap-6 lg:gap-0'>
      {planardsData.map((x) => {
        return (
          <div>
            <div className='h-[80px] aspect-square rounded-full overflow-hidden  mx-auto mb-2'>
              <img src={x.imgPath} alt='plan-card' className='w-full h-full' />
            </div>
            <div className='border-[1px] border-black-main rounded-xl min-w-[300px]   bg-white-main max-w-[300px] flex flex-col py-3 px-2 '>
              <p className='text-center text-darkBlue-main text-2xl font-semibold'>{x.heading}</p>
              <div className='flex flex-col justify-between min-h-[360px]'>
                <div className='p-5 flex flex-col items-center gap-2 mt-1'>
                  <ul className='flex flex-col justify-evenly items-stretch '>
                    {x.list.map((y) => {
                      return <li className='list-disc text-sm font-normal'>{y}</li>
                    })}
                  </ul>
                  <p className='font-normal text-sm text-left'>{x.para}</p>
                </div>
                <div className='flex justify-center'>
                  {x.type !== '' && (
                    <Chip
                      label={x.type}
                      sx={{
                        height: '20px',
                        backgroundColor: theme.palette.mBlue?.main,
                        color: theme.palette.mWhite?.main,
                        maxWidth: 'max-content',
                      }}
                    />
                  )}
                </div>
                <div>
                  <p className='text-center text-4xl text-darkBlue-main mt-6'>{x.amount}</p>
                  <Link to={x.linkPath}>
                    <p className='text-right text-xs  font-semibold text-darkBlue-main tracking-widest'>
                      read more ...
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <Button
              color='mPink'
              sx={{
                minWidth: '100%',
                maxHeight: 30,
                mt: 1,
              }}
              onClick={x.onClickFnc}
            >
              Select and Continue
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default PlanCards
