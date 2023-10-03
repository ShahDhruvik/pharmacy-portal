import { theme } from '@/context/ThemeProvider'
import { Button, Radio } from '@mui/material'
import React from 'react'

type Props = {}

const AddressBlock = (props: Props) => {
  return (
    <div className='bg-white-main flex '>
      <Radio
        onChange={() => {}}
        value='a'
        name='radio-buttons'
        inputProps={{ 'aria-label': 'A' }}
        sx={{
          alignSelf: 'start',
        }}
      />
      <div className='max-w-xs'>
        <p className='text-black-main font-semibold'>Ramit Kamate</p>
        <p className='text-darkBlue-main font-light'>
          Flat No. 2, Plot No. 16, Amrit Apartment Sukhwani Park, Near Vastu Udyog Pimpri, Pune,
          Maharashtra, 411 018 - India
        </p>
      </div>
      <Button
        variant='text'
        sx={{
          color: theme.palette.mBlue?.main,
          alignSelf: 'start',
          minWidth: 'max-content',
        }}
      >
        Edit
      </Button>
    </div>
  )
}

export default AddressBlock
