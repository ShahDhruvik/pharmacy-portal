import { SelectDDL } from './common'

export interface User {
  id: number
  organizationId: number
  name: string
  resetPasswordTokenTime: string
  internalId: string
  email: string
  otpGeneratedAt: string | null
  phone: string
  mobile: string
  roleId: number
  selectedPharmacyId: string | null
  pharmacyIds: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdBy: CreatedBy
  updatedBy: string | null
  deletedBy: string | null
  defaultPassword: boolean
  isActive: boolean
  isDefault: boolean
  icon: string
  isDeleted: boolean
  PharmaOrgRole: PharmaOrgRole
  pharmacyData: any[] // You can replace `any` with the actual type if you have one for pharmacy data
}

interface CreatedBy {
  userType: string
  userRole: string
  userId: number
  userName: string
}

interface PharmaOrgRole {
  id: number
  internalId: string
  name: string
  displayName: string
}

export interface UserFormFields {
  name: string
  phone: string
  mobile: string
  email: string
  roleId: SelectDDL
  pharmacyIds: SelectDDL[]
  icon: { file: File | null; url: string }
  active: boolean
  data: {
    name: string
    phone: string
    mobile: string
    email: string
    roleId: SelectDDL
    pharmacyIds: SelectDDL[]
    icon: { file: File | null; url: string }
    active: boolean
  }[]
}
