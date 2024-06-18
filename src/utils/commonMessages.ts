// Common messages are decalared here
export const enum COMMON_MESSAGE {
  Success = 'Success',
  Error = 'Error',
  Login = 'Sign ‘in successful',
  LogOut = 'Sign out successful',
  Updated = 'Updated',
  Deleted = 'Deleted',
  Cancel = 'Canceled',
  Change_Password = 'A password reset link has been sent to your registered email address.',
  Resend_otp = 'Your OTP has been successfully resent.',
  loadingMessage = 'You and me, both have memories.',
  UnAuthorized = 'UnAuthorized',
  NotFound = 'not found',
  InternalServerError = 'Internal Server Error'
}

export const enum VALIDATION_MESSAGE {
  checkBoxValidation = '*Please verify your response.',
  required = '*required',
}

export enum ContextMessage {
  LoadingMessage = "useLoading must be used within LoadingProvider",
  AuthMessage = "useAuth must be used within AuthProvider",
}