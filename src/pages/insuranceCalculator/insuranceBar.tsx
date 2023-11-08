/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import TxtInput from '@/components/TxtInput'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, IconButton } from '@mui/material'
import { txtFieldValidation, numberFieldValidation } from '@/utils/form.validation'
import { useForm } from 'react-hook-form'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import WarningIcon from '@mui/icons-material/Warning'

type Props = {
  handleClose: () => void
  open: boolean
}

const InsuranceBar = ({ open, handleClose }: Props) => {
  const [item, setItems] = useState<any>([])
  const { control, getValues, reset } = useForm({
    defaultValues: {
      email: '',
    },
  })
  const handlePlus = () => {
    const arr = []
    const a = getValues('email')
    arr.push(a)
    setItems([...item, a])
    reset()
  }

  const handleRemove = (index: number) => {
    const newItems = [...item]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        width: '25%',
        '& .MuiDrawer-paper': {
          width: '25%',
          px: '20px',
          backgroundColor: theme.palette.mLightGray?.main,
        },
      }}
    >
      <div>
        <div
          className={`flex justify-between items-center mb-3 sticky top-0 z-10 py-[10px] bg-lightGray-main`}
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
            Done
          </Button>
          <Button
            variant='text'
            color='mMidBlue'
            sx={{
              color: theme.palette.mMidBlue?.main,
              minWidth: 'max-content',
              fontSize: '1rem',

              height: 20,
            }}
            disableRipple
          >
            Redeem
          </Button>
        </div>
        <div className='flex flex-col gap-5 mb-3'>
          <div>
            <h2>My Loyalty Rewards Points</h2>
            <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
            <div className='bg-white-main flex mt-3 justify-between font-medium text-start px-2'>
              <div>
                <h3>My Referral Points</h3>
                <span className='text-darkBlue-main text-3xl'>0</span>
              </div>
              <div>
                <Divider
                  orientation='vertical'
                  sx={{
                    borderColor: theme.palette.mDarkGray?.main,
                    borderWidth: '1.5px',
                  }}
                />
              </div>
              <div>
                <h3>Referral Count</h3>
                <Divider />
                <div className='font-normal'>
                  <span>Active :</span>
                  <span> 0</span>
                </div>
                <div>
                  <span>Pending :</span>
                  <span> 18</span>
                </div>
                <div>
                  <span>Expired :</span>
                  <span> 15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 mb-3'>
          <div className='bg-white-main mt-3 justify-between font-medium text-start p-2'>
            <h3>My Loyalty Points</h3>
            <span className='text-darkBlue-main text-3xl'>23050</span>
          </div>
        </div>
        <div className='flex flex-col gap-5 mb-5'>
          <div>
            <div className='flex justify-between'>
              <h3>Refer a Friend</h3>
              <span className='text-darkBlue-main'>Refer Now</span>
            </div>
            <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
            <p className='text-sm mt-2'>Enter email address or 10 digit mobile numbers</p>
            <div className='flex items-center gap-2'>
              <TxtInput
                control={control}
                name='email'
                handleChange={() => {}}
                placeholder='Enter mobile number or email'
                validation={
                  { ...txtFieldValidation(true, 'Email') } || {
                    ...numberFieldValidation(true, 'Phone'),
                  }
                }
                sx={{ marginY: '10px' }}
              />
              <IconButton onClick={handlePlus}>
                <AddCircleIcon
                  sx={{
                    color: theme.palette.mDarkGray?.main,
                  }}
                />
              </IconButton>
            </div>
            <div className='flex flex-col overflow-y-scroll h-40 hideScroll'>
              {item?.map((x: string, i: number) => (
                <div className='flex items-center bg-white-main my-1 px-1 justify-between text-darkBlue-main text-sm font-extralight min-h-7 h-7 rounded-md'>
                  <span>{x}</span>
                  <IconButton
                    onClick={() => {
                      handleRemove(i)
                    }}
                  >
                    <HighlightOffOutlinedIcon sx={{ color: theme.palette.mDarkGray?.main }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 mb-5'>
          <div>
            <div className='flex justify-between'>
              <h3>Invitee List</h3>
            </div>
            <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
            <div className='flex flex-col overflow-y-scroll h-40 hideScroll'>
              {item?.map((x: string) => (
                <div className='flex items-center bg-white-main my-1 px-1 justify-between text-darkBlue-main text-sm font-extralight min-h-7 h-7 rounded-md'>
                  <span>{x}</span>
                  <div className='cursor-pointer'>
                    <ForwardToInboxIcon
                      sx={{ color: theme.palette.mDarkBlue?.main, height: '20px', width: '20px' }}
                    />
                    <WarningIcon
                      sx={{ color: theme.palette.mOrange?.main, height: '20px', width: '20px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default InsuranceBar
