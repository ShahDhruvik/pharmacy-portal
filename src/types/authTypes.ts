export type OtpFormFields = {
    otp0: string
    otp1: string
    otp2: string
    otp3: string
    otp4: string
    otp5: string
}

export type SignInFormFields = {
    phone: number | string
    contryCode: string
}

export type SignUpFormFields = {
    phone: number | string
    contryCode: string
    name: string
    dob: Date | null
    email: string
}

