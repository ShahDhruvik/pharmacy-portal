/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import Spinner from '@/components/spinner'
import TxtInput from '@/components/TxtInput'
import OTPForm from '../dashboard/container/auth-forms/otp-form'

type Props = {
  handleClose: () => void
  open: boolean
}

const HealthManageBar = ({ open, handleClose }: Props) => {
  const [entity, setEntity] = useState<any | undefined>()
  const [item, setItems] = useState(false)
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [data, setData] = useState<any[]>([])

  const { control, setValue, setError, clearErrors, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
    },
  })

  const onSubmitHandle: SubmitHandler<any> = async (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    if (entity) {
      //   setValue('firstName', entity?.firstName)
    } else {
      reset()
    }
  }, [entity])

  if (!loading.isLoading && !loading.isIndependentLoader) {
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
              <div className='flex justify-between items-center'>
                <h2>Register ABHA</h2>
              </div>
              <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
              <div className='flex items-center gap-2 my-4'>
                <TxtInput
                  control={control}
                  name='adharNo'
                  handleChange={() => {}}
                  placeholder='Enter new Adhar number'
                  validation={{}}
                  sx={{ marginY: '10px' }}
                  label='Aadhar Number'
                />
              </div>
              <p className='my-5 font-light text-sm'>
                For security reasons you will be sent an OTP to confirm your Adhar number.
              </p>
              <div>
                <OTPForm handleClose={handleClose} isAssesstMent={true} phone={''} />
              </div>
              <p className='flex flex-col font-light text-sm h-72 justify-end'>
                I am authorized by my dependents (family members for whom I am responsible for
                making payments) to edit their information on their behalf..
              </p>
            </div>
          </div>
        </div>
      </Drawer>
    )
  } else {
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
        <div className='min-h-screen flex items-center justify-center'>
          <Spinner />
        </div>
      </Drawer>
    )
  }
}

export default HealthManageBar
