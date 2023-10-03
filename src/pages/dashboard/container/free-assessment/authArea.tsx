import AssessmentWhiteBox from '@/components/AssessmentWhiteBox'
import { Button } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import SignInForm from '../auth-forms/sign-in-form'
import SignUpForm from '../auth-forms/sign-up-form'
import GuestForm from '../auth-forms/guest-form'
import OTPForm from '../auth-forms/otp-form'
import { FormTypeArray } from '@/types/common'
import { FORMTYPE } from '@/utils/constants'

type Props = {
  handleClose: () => void
  signType: FormTypeArray
  setSignType: Dispatch<SetStateAction<FormTypeArray>>
}

const AuthArea = ({ handleClose, setSignType, signType }: Props) => {
  return (
    <div>
      <AssessmentWhiteBox iconName='ser'>
        <div>Hi, I am Virca.</div>
      </AssessmentWhiteBox>
      <AssessmentWhiteBox iconName='ser'>
        <div>
          I am here 24/7 to help with your health issues. If at any point I'm not able to assist
          you, I'll connect you to a consultant who can
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
                onClick={() => setSignType([FORMTYPE.SIGNIN])}
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
                onClick={() => setSignType([FORMTYPE.SIGNUP])}
              >
                Sign Up
              </Button>
            </div>
            <div>Need time to sign in or sign up, proceed as Guest</div>
            <div className='pb-2'>
              <Button
                variant='contained'
                color='mPink'
                onClick={() => setSignType([FORMTYPE.GUEST])}
              >
                Process As Guest
              </Button>
            </div>
          </div>
        )}
        {signType.includes(FORMTYPE.SIGNIN) && (
          <SignInForm handleClose={handleClose} setSignType={setSignType} signType={signType} />
        )}
        {signType.includes(FORMTYPE.SIGNUP) && (
          <SignUpForm setSignType={setSignType} handleClose={handleClose} signType={signType} />
        )}
        {signType.includes(FORMTYPE.GUEST) && (
          <GuestForm setSignType={setSignType} handleClose={handleClose} signType={signType} />
        )}
      </AssessmentWhiteBox>
      {signType.includes(FORMTYPE.OTP) && (
        <AssessmentWhiteBox iconName='ser' left={true}>
          <OTPForm handleClose={handleClose} isAssesstMent={true} />
        </AssessmentWhiteBox>
      )}
    </div>
  )
}

export default AuthArea
