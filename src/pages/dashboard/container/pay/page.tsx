import React, { useState } from 'react'
import PlanCard from '@/assets/images/plan-card.png'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Divider, FormControlLabel, FormHelperText, Typography } from '@mui/material'
import CheckBoxInput from '@/components/CheckBoxInput'
import { Link } from 'react-router-dom'
import { theme } from '@/context/ThemeProvider'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import AddressDialog from './addressDialog'

type Props = {}
type PayFormFields = {
  robo: boolean
  tNc: boolean
  guarantee: boolean
  delivered: boolean
  instructions: string
}
const Pay = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      robo: false,
      tNc: false,
      guarantee: false,
      delivered: false,
      instructions: '',
    },
  })
  const { errors } = formState
  const onSubmitHandle: SubmitHandler<PayFormFields> = (data) => {
    if (!data.delivered || !data.guarantee || !data.robo || !data.tNc) {
      return
    } else {
      console.log(data)
      setOpen(true)
    }
  }
  return (
    <section>
      <div className='flex flex-col min-h-screen py-5'>
        <div className='flex-1'>
          <div className='flex items-center'>
            <div className='w-32 aspect-square'>
              <img src={PlanCard} alt='' className='h-full w-full' />
            </div>
            <div>
              <p>You have selected:</p>
              <h1 className='text-4xl text-darkBlue-main font-bold'>
                <span className='text-pink-main'>Oopchar</span> 14 Day Medicine{' '}
                <span className='text-pink-main'>Package </span>
              </h1>
              <p className='text-right'>Trusted by thousands of patients</p>
            </div>
          </div>
          <div className='bg-darkBlue-main py-2 px-2 mt-3'>
            <h1 className='text-white-main text-xl font-light'>What is included in your plan:</h1>
          </div>
          <div className='p-5'>
            <ul className='list-disc mb-5'>
              <li>One free online consultation*</li>
              <li>Prescribed medicine - 14 days dose</li>
              <li>One free follow up</li>
            </ul>
            <p>
              One of our advisors will call you to schedule free online consultation. Post
              consultation our medical team will dispatch a 14-day supply of the prescribed
              medication. Following this, one of our healthcare counselors will conduct a follow-up
              to evaluate your health advancement
            </p>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmitHandle)}>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-2'>
                <div>
                  <FormControlLabel
                    sx={{
                      '.MuiButtonBase-root': {
                        py: 0,
                        px: '2px',
                      },
                    }}
                    control={<CheckBoxInput control={control} name={'robo'} />}
                    label={
                      <Typography sx={{ fontSize: '14px', ml: 1 }}>I am not a robot</Typography>
                    }
                  />
                  {errors.robo && (
                    <FormHelperText
                      sx={{
                        color: 'red',
                      }}
                    >
                      {errors.robo.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <FormControlLabel
                    sx={{
                      '.MuiButtonBase-root': {
                        py: 0,
                        px: '2px',
                      },
                    }}
                    control={<CheckBoxInput control={control} name={'tNc'} />}
                    label={
                      <Typography sx={{ fontSize: '14px', ml: 1 }}>
                        {`Agree to `}
                        <Link to={'/'} className='text-blue-main'>
                          terms and conditions
                        </Link>
                      </Typography>
                    }
                  />
                  {errors.tNc && (
                    <FormHelperText
                      sx={{
                        color: 'red',
                      }}
                    >
                      {errors.tNc.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <FormControlLabel
                    sx={{
                      '.MuiButtonBase-root': {
                        py: 0,
                        px: '2px',
                      },
                    }}
                    control={<CheckBoxInput control={control} name={'guarantee'} />}
                    label={
                      <Typography sx={{ fontSize: '14px', ml: 1 }}>
                        Agree to money back guarantee
                      </Typography>
                    }
                  />
                  {errors.guarantee && (
                    <FormHelperText
                      sx={{
                        color: 'red',
                      }}
                    >
                      {errors.guarantee.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <FormControlLabel
                    sx={{
                      '.MuiButtonBase-root': {
                        py: 0,
                        px: '2px',
                      },
                    }}
                    control={<CheckBoxInput control={control} name={'delivered'} />}
                    label={
                      <Typography
                        sx={{ fontSize: '14px', ml: 1 }}
                      >{`I want medicines to be delivered to me (requires ID check)`}</Typography>
                    }
                  />
                  {errors.delivered && (
                    <FormHelperText
                      sx={{
                        color: 'red',
                      }}
                    >
                      {errors.delivered.message}
                    </FormHelperText>
                  )}
                </div>
                <p></p>
              </div>
              <div>
                <p className='text-left text-orange-light font-light text-sm'>26% OFF</p>
                <p className='text-center text-4xl text-darkBlue-main'>
                  <span className='line-through text-darkGray-main text-3xl'>600</span>
                  450
                </p>
                <Button color='mPink' type='submit'>
                  Confirm and Pay
                </Button>
                <p className='text-sm mt-2 text-blue-main'>Delivered by: 04th Aug 2023</p>
              </div>
            </div>
          </form>
          <Divider
            sx={{
              border: `3px solid ${theme.palette.mMediumGray?.main}`,
              borderRadius: '8px',
              my: 2,
            }}
          />
          <TxtInput
            control={control}
            handleChange={() => {}}
            name='instructions'
            placeholder='Add delivery instructions'
            validation={txtFieldValidation(false, 'Description')}
            sx={{
              mb: 2,
            }}
          />
          <p className='text-sm'>
            This is return policy statement, indicating return policy is only applicable to unused
            medicines. return policy is not applicable to lab test. This is return policy statement,
            indicating return policy is only applicable to unused medicines. return policy is not
            applicable to lab test
          </p>
        </div>
        <AddressDialog open={open} setOpen={setOpen} />
      </div>
    </section>
  )
}

export default Pay
