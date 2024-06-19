import { SelectDDL } from './common'

export interface User {
  id: number
  organizationId: number
  name: string
  phone: string
  mobile: string
  email: string
  internalId: string
  order: number
  icon: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdBy: string
  updatedBy: string | null
  deletedBy: string | null
  isDefault: boolean
  isActive: boolean
  isDeleted: boolean
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
