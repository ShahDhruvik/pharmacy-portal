/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'

export const sidebarList: Record<
  string,
  { icon: ReactNode; name: string; subgroup: { icon: ReactNode; name: string }[] }[]
> = {
  Organization: [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      subgroup: [],
    },
    {
      icon: <DashboardIcon />,
      name: 'Pharmacy Management',
      subgroup: [],
    },
    { icon: <DashboardIcon />, name: 'User', subgroup: [] },
  ],
  'Main Section': [
    {
      icon: <DashboardIcon />,
      name: 'Orders',
      subgroup: [],
    },
    {
      icon: <DashboardIcon />,
      name: 'Help and Support',
      subgroup: [],
    },
  ],
}
