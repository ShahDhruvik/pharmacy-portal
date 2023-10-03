export type OnlineSchedulingFormField = {
  speciality: string
  problem: string
  date: Date | null
  visitType: string
}

export type FamilyMemberFormField = {
  name: string
  relation: string
  dob: Date | null
}

export const enum SCHEDULING_TYPE {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FINAL = 'FINAL',
}

export type SchedulingFormType =
  | SCHEDULING_TYPE.FIRST
  | SCHEDULING_TYPE.SECOND
  | SCHEDULING_TYPE.THIRD
  | SCHEDULING_TYPE.FINAL
  | undefined
