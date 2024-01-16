export type OtpFormFields = {
  otp0: string
  otp1: string
  otp2: string
  otp3: string
  otp4: string
  otp5: string
}

export type SignInFormFields = {
  contactNo: number | string
  contryCode: string
  robo: boolean
  tNc: boolean
  phone: number | string
  name: string
  dob: Date | null
  email: string
}

export type SignUpFormFields = {
  phone: number | string
  contryCode: string
  name: string
  dob: Date | null
  email: string
  robo: boolean
  tNc: boolean
}

export type GuestFormFields = {
  phone: number | string
  contryCode: string
  name: string
  dob: Date | null
  email: string
  robo: boolean
  tNc: boolean
}
