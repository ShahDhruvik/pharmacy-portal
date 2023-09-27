import SvgIcon from '../../../components/SvgIcon'
import CustomDialog from '../../../components/Dialog-custom'
import { Button, DialogContentText, DialogTitle } from '@mui/material'
import { frequentlyAskedQuestions } from '../../../utils/data'
import { Link } from 'react-router-dom'
import AssessmentWhiteBox from '../../../components/AssessmentWhiteBox'
import { useState } from 'react'
import { FormTypeArray } from '../../../types/common'
import { FORMTYPE } from '../../../utils/constants'
import SignInForm from './signIn/sign-in-form'
import OTPForm from './signIn/otp-form'
import SignUpForm from './signIn/sign-up-form'
import GuestForm from './signIn/guest-form'
import { theme } from '../../../context/ThemeProvider'
type Props = {
  handleClose: () => void
  open: boolean
}

const Assessment = ({ handleClose, open }: Props) => {
  const [signType, setsignType] = useState<FormTypeArray>([])
  return (
    <>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        maxHeight={510}
        maxWidth={'lg'}
        header={{
          isHeader: true,
          component: (
            <DialogTitle id='scroll-dialog-title'>
              <div className='flex justify-between items-center'>
                <div>
                  <h1 className='leading-3'>Welcome to Virtual Assessment</h1>
                  <span className='text-sm text-blue-main'>Daisy: Your virtual health agent</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleClose()
                      setsignType([])
                    }}
                  >
                    <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mDarkGray?.main }} />
                  </button>
                </div>
              </div>
            </DialogTitle>
          ),
        }}
        action={{
          isAction: false,
          component: 'heyy',
        }}
      >
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          <div className='flex w-[1000px] py-5'>
            <div className='w-3/5'>
              <div className='flex flex-col'>
                <AssessmentWhiteBox iconName='ser'>
                  <div>Hi, I am Virca.</div>
                </AssessmentWhiteBox>
                <AssessmentWhiteBox iconName='ser'>
                  <div>
                    {' '}
                    I am here 24/7 to help with your health issues. If at any point I'm not able to
                    assist you, I'll connect you to a consultant who can
                  </div>
                </AssessmentWhiteBox>
                <AssessmentWhiteBox iconName='ser'>
                  {signType.length === 0 && (
                    <div>
                      <div>Please sign in or sign up using your mobile number</div>
                      <div className='pb-2 flex gap-3'>
                        <Button
                          variant='contained'
                          color='mPink'
                          sx={{
                            maxWidth: 100,
                            minWidth: 100,
                          }}
                          onClick={() => setsignType([FORMTYPE.SIGNIN])}
                        >
                          Sign In
                        </Button>
                        <Button
                          variant='contained'
                          color='mPink'
                          sx={{
                            maxWidth: 100,
                            minWidth: 100,
                          }}
                          onClick={() => setsignType([FORMTYPE.SIGNUP])}
                        >
                          Sign Up
                        </Button>
                      </div>
                      <div>Need time to sign in or sign up, proceed as Guest</div>
                      <div className='pb-2'>
                        <Button
                          variant='contained'
                          color='mPink'
                          onClick={() => setsignType([FORMTYPE.GUEST])}
                        >
                          Process As Guest
                        </Button>
                      </div>
                    </div>
                  )}
                  {signType.includes(FORMTYPE.SIGNIN) && (
                    <SignInForm
                      handleClose={handleClose}
                      setSignType={setsignType}
                      signType={signType}
                    />
                  )}
                  {signType.includes(FORMTYPE.SIGNUP) && (
                    <SignUpForm
                      setSignType={setsignType}
                      handleClose={handleClose}
                      signType={signType}
                    />
                  )}
                  {signType.includes(FORMTYPE.GUEST) && (
                    <GuestForm
                      setSignType={setsignType}
                      handleClose={handleClose}
                      signType={signType}
                    />
                  )}
                </AssessmentWhiteBox>
                {signType.includes(FORMTYPE.OTP) && (
                  <AssessmentWhiteBox iconName='ser' left={true}>
                    <OTPForm />
                  </AssessmentWhiteBox>
                )}
              </div>
            </div>
            <div className='border-x-2 border-gray-main mx-5 '></div>
            <div className='w-2/5'>
              <h2>Frequently Asked Questions</h2>
              {frequentlyAskedQuestions.map((x) => (
                <Link to={'/faq'}>
                  <div className='flex flex-col'>
                    <div className='border-[1px] border-black-main flex w-full mt-3 py-1 gap-2 px-3 rounded-md bg-white-main'>
                      <div>
                        <SvgIcon iconName={'ser'} />
                      </div>
                      <div>{x.que}</div>
                    </div>
                  </div>
                </Link>
              ))}
              <span className='text-blue-main flex justify-end py-3'>read more....</span>
            </div>
          </div>
        </DialogContentText>
      </CustomDialog>
    </>
  )
}

export default Assessment
