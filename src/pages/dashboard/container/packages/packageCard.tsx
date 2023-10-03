import { Button, Chip } from '@mui/material'
import React from 'react'
import PlanCard from '@/assets/images/plan-card.png'
import { Link } from 'react-router-dom'
import { theme } from '@/context/ThemeProvider'

type Props = {}

const packageCardsData = [
  {
    heading: 'Sliver',
    imgPath: PlanCard,
    list: [
      '1 Doctor Consultation',
      '2 Assessment',
      'Medication',
      ' Extensive lab test',
      'Two follow ups',
      'Basic SH device',
      ' Counselling session',
      'Exercise and Diet plans',
      '10 Days Money Back* ',
    ],
    amount: '7000',
    checkedAmt: '9000',
    percentage: '26',
    linkPath: '',
    onClickFnc: () => {},
    type: '',
  },
  {
    heading: 'Gold',
    imgPath: PlanCard,
    list: [
      ' Doctor Consultation',
      ' Assessment',
      'Medication',
      'Extensive lab test',
      'Four follow ups',
      ' Deluxe SH device',
      ' Counselling session',
      ' Exercise and Diet plans',
      '20 Days Money Back*',
    ],
    amount: '9000',
    checkedAmt: '10000',
    percentage: '26',
    linkPath: '',
    onClickFnc: () => {},
    type: 'Recommended',
  },
  {
    heading: 'Platinum',
    imgPath: PlanCard,
    list: [
      'Doctor Consultation',
      'Assessment',
      'Medication',
      'Extensive lab test',
      'Six follow ups',
      'Premium SH device',
      'Counselling session',
      'Exercise and Diet plans',
      '30 Days Money Back*',
    ],
    amount: '9900',
    checkedAmt: '12000',
    percentage: '26',
    linkPath: '',
    onClickFnc: () => {},
    type: 'Best Value',
  },
]

const PackageCards = (props: Props) => {
  return (
    <div className='mt-5  flex justify-around flex-wrap gap-6 lg:gap-0 '>
      {packageCardsData.map((x) => {
        return (
          <div className='relative mt-3'>
            <div className='h-[80px] aspect-square rounded-full overflow-hidden  mx-auto mb-2 absolute right-0 -top-6'>
              <img src={x.imgPath} alt='plan-card' className='w-full h-full' />
            </div>
            <div>
              <h1 className='text-2xl ml-3'>{x.heading}</h1>
            </div>
            <div className='border-[1px] border-black-main rounded-xl min-w-[280px]   bg-white-main max-w-[300px] flex flex-col py-3 px-2 '>
              <div className='flex flex-col justify-between min-h-[380px]'>
                <div className='pr-5 py-5 flex flex-col items-center gap-2 mt-1'>
                  <ul className='flex flex-col justify-evenly items-stretch '>
                    {x.list.map((y) => {
                      return <li className='list-disc text-sm font-normal'>{y}</li>
                    })}
                  </ul>
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
                  <p className='text-right text-4xl text-darkBlue-main mt-6'>
                    <span className='line-through text-darkGray-main text-3xl'>{x.checkedAmt}</span>
                    {x.amount}
                  </p>
                  <p className='text-center text-orange-light font-light text-sm'>
                    {x.percentage}% OFF
                  </p>
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

export default PackageCards
