/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
type AskConfirmationType = {
  isConfirmation: boolean
  confirmProps:
    | {
        confirmationText: string
        handleConfirm: () => void
        handleCancel: () => void
        confirmBtnTxt?: string
        cancelBtnTxt?: string
      }
    | undefined
}
export interface AskConfirmationContextType {
  setAskConfirmation: Dispatch<SetStateAction<AskConfirmationType>>
  askConfirmation: AskConfirmationType
}
export const AskConfirmationContextInitialVal: AskConfirmationContextType = {
  setAskConfirmation: () => {},
  askConfirmation: {
    isConfirmation: false,
    confirmProps: undefined,
  },
}
const AskConfirmationContext = createContext<AskConfirmationContextType>(
  AskConfirmationContextInitialVal,
)

export function AskConfirmationProvider({ children }: { children: ReactNode }) {
  const [askConfirmation, setAskConfirmation] = useState<
    AskConfirmationContextType['askConfirmation']
  >(AskConfirmationContextInitialVal['askConfirmation'])
  return (
    <AskConfirmationContext.Provider value={{ askConfirmation, setAskConfirmation }}>
      {children}
    </AskConfirmationContext.Provider>
  )
}

export function useAskConfirmation() {
  const context = useContext(AskConfirmationContext)
  if (!context) {
    throw new Error('useAskConfirmation must be used within AskConfirmationProvider')
  }
  return context
}
