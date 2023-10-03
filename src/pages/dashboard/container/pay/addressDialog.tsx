import CustomDialog from '@/components/Dialog-custom'
import { theme } from '@/context/ThemeProvider'
import { Button, Divider, Tab, Tabs } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import AddressBlock from './addressBlock'
import SvgIcon from '@/components/SvgIcon'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddressDialog = ({ open, setOpen }: Props) => {
  const [value, setValue] = useState(0)
  const handleChange = (e: any, val: number) => {
    setValue(val)
  }
  return (
    <CustomDialog
      open={open}
      action={{
        isAction: true,
        component: (
          <div className='py-4 px-4 flex justify-end bg-white-main'>
            {value === 0 && (
              <Button
                color='mPink'
                sx={{
                  maxHeight: 20,
                }}
              >
                Ship to this address
              </Button>
            )}
            {value === 1 && (
              <Button
                color='mPink'
                sx={{
                  maxHeight: 20,
                }}
              >
                Bill to this address
              </Button>
            )}
          </div>
        ),
      }}
      handleClose={() => {
        setOpen(false)
      }}
      header={{ component: null, isHeader: false }}
      maxWidth={'md'}
      maxHeight={1024}
    >
      <div className='flex gap-2'>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            TabIndicatorProps={{
              sx: {
                backgroundColor: '#ffbb00',
              },
            }}
          >
            <Tab
              label='Shipping addresses'
              value={0}
              sx={{
                color: theme.palette.mBlack?.main,
                '&.Mui-selected': {
                  color: theme.palette.mYellow?.main,
                },
                textTransform: 'none',
                padding: 0,
                minHeight: '20px',
              }}
            />
            <Tab
              label='Billing addresses'
              value={1}
              sx={{
                color: theme.palette.mBlack?.main,
                '&.Mui-selected': {
                  color: theme.palette.mYellow?.main,
                },
                textTransform: 'none',
              }}
            />
          </Tabs>
          {value === 1 && (
            <div className='min-w-[400px] bg-lightGray-main p-2 flex flex-col gap-2'>
              <AddressBlock />
              <AddressBlock />
              <AddressBlock />
              <AddressBlock />
            </div>
          )}
          {value === 0 && (
            <div className='min-w-[400px] bg-lightGray-main p-2 flex flex-col gap-2'>
              <AddressBlock />
              <AddressBlock />
              <AddressBlock />
            </div>
          )}
        </div>
        <div>
          <div className='flex  justify-between items-center py-3 '>
            <div className='flex gap-2'>
              <SvgIcon iconName='ser' />
              <p>Pick up locations near you</p>
            </div>
            <SvgIcon iconName='cancel' />
          </div>
          <div className='bg-pink-main min-w-[350px] aspect-square  flex justify-center items-center mb-2'>
            <p>Map</p>
          </div>
          <AddressBlock />
        </div>
      </div>
    </CustomDialog>
  )
}

export default AddressDialog
