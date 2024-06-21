/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { DASHBOARD_PATH } from '../paths'

export const sidebarList: Record<
  string,
  { icon: ReactNode; name: string; subgroup: { icon: ReactNode; name: string }[]; path: string }[]
> = {
  Organization: [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      subgroup: [],
      path: '/',
    },
    {
      icon: <DashboardIcon />,
      name: 'Pharmacy Management',
      subgroup: [],
      path: DASHBOARD_PATH.pharmacy_management,
    },
    { icon: <DashboardIcon />, name: 'User', subgroup: [], path: DASHBOARD_PATH.user },
  ],
  'Main Section': [
    {
      icon: <DashboardIcon />,
      name: 'Orders',
      subgroup: [],
      path: '/',
    },
    {
      icon: <DashboardIcon />,
      name: 'Help and Support',
      subgroup: [],
      path: '/',
    },
  ],
}
