/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
type ExpandMenuType = { grpName: string; index: number } | undefined
export interface SidebarContextType {
  setExpandMenu: Dispatch<SetStateAction<ExpandMenuType>>
  expandMenu: ExpandMenuType
  setOpenMenu: Dispatch<SetStateAction<boolean>>
  openMenu: boolean
}
export const SidebarContextInitialVal: SidebarContextType = {
  setExpandMenu: () => {},
  expandMenu: undefined,
  setOpenMenu: () => {},
  openMenu: false,
}
const SidebarContext = createContext<SidebarContextType>(SidebarContextInitialVal)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [expandMenu, setExpandMenu] = useState<SidebarContextType['expandMenu']>(
    SidebarContextInitialVal['expandMenu'],
  )
  const [openMenu, setOpenMenu] = useState<SidebarContextType['openMenu']>(
    SidebarContextInitialVal['openMenu'],
  )
  return (
    <SidebarContext.Provider value={{ expandMenu, setExpandMenu, openMenu, setOpenMenu }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}
