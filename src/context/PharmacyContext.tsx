/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { SelectDDL } from '@/types/common'
import { acDefaultValue } from '@/utils/form.validation'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
type ExpandMenuType = { grpName: string; index: number } | undefined
export interface PharmacyContextType {
  setPharmacyList: Dispatch<SetStateAction<SelectDDL[]>>
  pharmacyList: SelectDDL[]
  setSelectedPharmacy: Dispatch<SetStateAction<SelectDDL>>
  selectedPharmacy: SelectDDL
}
export const PharmacyContextInitialVal: PharmacyContextType = {
  setPharmacyList: () => {},
  pharmacyList: [acDefaultValue],
  setSelectedPharmacy: () => {},
  selectedPharmacy: acDefaultValue,
}
const PharmacyContext = createContext<PharmacyContextType>(PharmacyContextInitialVal)

export function PharmacyProvider({ children }: { children: ReactNode }) {
  const defaultSelectedPharmacy =
    localStorage.getItem('selectedPharmacy') !== null
      ? JSON.parse(localStorage.getItem('selectedPharmacy') as string)
      : PharmacyContextInitialVal['selectedPharmacy']
  const [pharmacyList, setPharmacyList] = useState<PharmacyContextType['pharmacyList']>(
    defaultSelectedPharmacy
      ? [
          {
            _id: defaultSelectedPharmacy?.id,
            label: defaultSelectedPharmacy?.name,
            data: defaultSelectedPharmacy,
          },
        ]
      : PharmacyContextInitialVal['pharmacyList'],
  )
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyContextType['selectedPharmacy']>(
    defaultSelectedPharmacy
      ? {
          _id: defaultSelectedPharmacy?.id,
          label: defaultSelectedPharmacy?.name,
          data: defaultSelectedPharmacy,
        }
      : PharmacyContextInitialVal['selectedPharmacy'],
  )

  return (
    <PharmacyContext.Provider
      value={{ pharmacyList, selectedPharmacy, setPharmacyList, setSelectedPharmacy }}
    >
      {children}
    </PharmacyContext.Provider>
  )
}

export function usePharmacy() {
  const context = useContext(PharmacyContext)
  if (!context) {
    throw new Error('usePharmacy must be used within PharmacyProvider')
  }
  return context
}
