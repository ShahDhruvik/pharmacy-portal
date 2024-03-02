/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { theme } from '@/context/ThemeProvider'
import { Drawer, Button, Divider, Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import Spinner from '@/components/spinner'
import TxtInput from '@/components/TxtInput'
import OTPForm from '../dashboard/container/auth-forms/otp-form'
import { dropdownFamily } from '@/lib/DropDownApis'
import { MANAGE_STATE } from '@/components/SmallCard'
import SelectInput from '@/components/SelectInput'
import { acDefaultValue, searchSelectValidation, txtFieldValidation } from '@/utils/form.validation'
import OtpInput from '@/components/OtpInput'
import LoopIcon from '@mui/icons-material/Loop'

type Props = {
  handleClose: () => void
  open: boolean
  manageState: any
}

const HealthManageBar = ({ open, handleClose, manageState }: Props) => {
  const [entity, setEntity] = useState<any | undefined>()
  const [item, setItems] = useState(false)
  const [type, setType] = useState('')
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const [data, setData] = useState<any[]>([])
  const [familyData, setFamilyData] = useState<any[]>([])

  const drpFamily = async () => {
    const res = await dropdownFamily(setLoading, showToast)
    if (res) {
      setFamilyData(res)
    }
  }
  useEffect(() => {
    if (manageState === MANAGE_STATE.HEALTH_CARD) {
      drpFamily()
    }
  }, [manageState])

  const { control, setValue, setError, clearErrors, handleSubmit, reset } = useForm({
    defaultValues: {
      family: acDefaultValue,
      firstName: '',
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      mobileNo: '',
    },
  })

  const onSubmitHandle: SubmitHandler<any> = async (data: any) => {
    console.log(data)
    if (type === '') {
      setType('OTP1')
    }
    if (type === 'OTP1') {
      setType('MOBILE')
    }
    if (type === 'MOBILE') {
      reset({ otp0: '', otp1: '', otp2: '', otp3: '', otp4: '', otp5: '' })
      setType('OTP2')
    }
    if (type === 'OTP2') {
      reset()
      setType('')
      handleClose()
    }
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
              onClick={() => {
                handleClose()
                setType('')
              }}
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
              <Divider
                sx={{
                  borderColor: theme.palette.mDarkGray?.main,
                  borderWidth: '1.5px',
                  marginBottom: '20px',
                }}
              />
              {(type === '' || type === 'OTP1') && (
                <form onSubmit={handleSubmit(onSubmitHandle)}>
                  <div className='flex flex-col'>
                    <SelectInput
                      options={familyData as any}
                      name={'family'}
                      control={control}
                      label={'Family Member*'}
                      setValue={setValue}
                      setError={setError}
                      clearErrors={clearErrors}
                      validation={searchSelectValidation('Family Member')}
                    />
                    <TxtInput
                      control={control}
                      name='adharNo'
                      handleChange={() => {}}
                      placeholder='Enter New Aadhar number'
                      validation={txtFieldValidation(true)}
                      sx={{ marginY: '10px' }}
                      label='Aadhar Number*'
                    />
                  </div>
                  {type === '' && (
                    <div className='sticky bottom-0 flex items-end justify-end bg-lightGray-main py-5 w-full'>
                      <Button color='mPink' type='submit'>
                        Submit
                      </Button>
                    </div>
                  )}
                </form>
              )}
              {(type === 'MOBILE' || type === 'OTP2') && (
                <form onSubmit={handleSubmit(onSubmitHandle)}>
                  <div className='flex flex-col'>
                    <TxtInput
                      control={control}
                      name='mobileNo'
                      handleChange={() => {}}
                      placeholder='Enter Mobile Number'
                      validation={txtFieldValidation(true)}
                      sx={{ marginY: '10px' }}
                      label='Mobile Number*'
                    />
                  </div>
                  {type === 'MOBILE' && (
                    <div className='sticky bottom-0 flex items-end justify-end bg-lightGray-main py-5 w-full'>
                      <Button color='mPink' type='submit'>
                        Submit
                      </Button>
                    </div>
                  )}
                </form>
              )}
              {(type === 'OTP1' || type === 'OTP2') && (
                <>
                  <p className='my-5 font-light text-sm'>
                    For security reasons you will be sent an OTP to confirm your Aadhar number.
                  </p>
                  <div>
                    <form onSubmit={handleSubmit(onSubmitHandle)}>
                      <div className='flex flex-col justify-center '>
                        <OtpInput
                          name={['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5']}
                          control={control}
                        />
                        <div className='flex justify-between mb-4'>
                          <p className='ml-2'>You have 30 second left</p>
                          <button
                            className='mr-2 text-mediumBlue-main'
                            onClick={() => {
                              // handleResendOtp(phone)
                            }}
                          >
                            <span>
                              <LoopIcon />
                            </span>
                            Resend otp
                          </button>
                        </div>
                        <Box display={'flex'} justifyContent={'end'} gap={1} marginTop={1}>
                          <Button
                            variant='contained'
                            color='mPink'
                            sx={{
                              maxHeight: 27,
                              maxWidth: 'max-content',
                              minWidth: 'max-content',
                            }}
                            type='submit'
                          >
                            Submit
                          </Button>
                        </Box>
                      </div>
                    </form>
                  </div>
                </>
              )}
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
