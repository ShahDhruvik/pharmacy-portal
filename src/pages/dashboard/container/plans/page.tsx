import SvgIcon from '@/components/SvgIcon'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { Button } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import PlanCards from './planCards'
import StarCard from './starCard'
import PlanFotter from './planFotter'

type Props = {}

const Plans = (props: Props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
    },
  })
  const onSubmitHandle: SubmitHandler<{ email: string }> = (data) => {}
  return (
    <section className='bg-lightGray-main pb-6'>
      <div className='bg-darkBlue-main py-2 p-container'>
        <h1 className='text-white-main text-xl font-light'>
          Select Treatment Plan for Chandrashekhar Deshpande Now!
        </h1>
      </div>
      <div className='flex flex-col xl:flex-row gap-6'>
        <div className='mt-8 flex flex-row justify-evenly xl:flex-col gap-4'>
          <div className='hidden md:flex flex-col gap-5 lg:flex-row lg:gap-10 xl:flex-col xl:gap-5 '>
            <div className=' max-w-xs bg-white-main p-3 rounded-lg'>
              <p className='text-sm text-green-main font-light'>
                Thank you for completing the assessment
              </p>
              <p className='font-normal'>
                Based on assessment diagnosis we recommend you to select one of our treatment plans
              </p>
            </div>
            <div className='max-w-xs bg-darkBlue-main px-3 py-12 rounded-lg flex justify-center'>
              <StarCard />
            </div>
          </div>
          <div className=' md:max-w-xs bg-white-main p-3 rounded-lg'>
            <p className='text-sm'>
              Please provide your email address if you would like to receive a comprehensive
              assessment report delivered to your email inbox, along with a notification via
              WhatsApp.{' '}
            </p>
            <form className='mt-5 flex flex-col gap-3' onSubmit={handleSubmit(onSubmitHandle)}>
              <TxtInput
                control={control}
                handleChange={() => {}}
                name='email'
                placeholder='Enter email'
                validation={{ ...txtFieldValidation(true, 'Email') }}
              />
              <div>
                <Button
                  color='mPink'
                  sx={{
                    minWidth: 'max-content',
                    maxHeight: 20,
                  }}
                  type='submit'
                >
                  Get Report On Email
                </Button>
                <Link to={'/'}>
                  <p className='text-xs text-blue-main mt-1'>Give feedback</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1'>
          <PlanCards />
          <PlanFotter />
        </div>
      </div>
    </section>
  )
}

export default Plans
