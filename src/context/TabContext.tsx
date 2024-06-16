/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
export interface TabContextType {
  setTabIndex: Dispatch<SetStateAction<string>>
  tabIndex: string
}
export const TabContextInitialVal: TabContextType = {
  setTabIndex: () => {},
  tabIndex: '0',
}
const TabContext = createContext<TabContextType>(TabContextInitialVal)

export function TabProvider({ children }: { children: ReactNode }) {
  const [tabIndex, setTabIndex] = useState<TabContextType['tabIndex']>(
    TabContextInitialVal['tabIndex'],
  )

  return <TabContext.Provider value={{ tabIndex, setTabIndex }}>{children}</TabContext.Provider>
}

export function useTab() {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTab must be used within TabProvider')
  }
  return context
}
