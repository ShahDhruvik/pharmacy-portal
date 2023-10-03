import { Button } from '@mui/material'
import React from 'react'
import { CloseCardType } from './assistModal'

type Props = {
  cardProps: CloseCardType
}

const CloseCard = ({ cardProps }: Props) => {
  return (
    <div className=' flex flex-col  '>
      <div className='max-w-xs'>
        <img src={cardProps.image} alt='hello' />
        <Button
          onClick={cardProps.onClickFnc}
          color='mPink'
          sx={{
            minWidth: '100%',
            mt: 2,
          }}
        >
          {cardProps.btnTxt}
        </Button>
      </div>
      <span className='self-start text-sm text-black-main pl-1 w-max'>{cardProps.btnBelowtxt}</span>
    </div>
  )
}

export default CloseCard
