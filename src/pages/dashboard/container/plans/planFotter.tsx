import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const PlanFotter = (props: Props) => {
  return (
    <div className='mt-4'>
      <p className='text-xs '>You will be routed to detail page before finalizing your option</p>
      <p className='text-sm '>
        *Read our money back guarantee{' '}
        <Link to={'/'} className='underline'>
          here
        </Link>{' '}
      </p>
    </div>
  )
}

export default PlanFotter
