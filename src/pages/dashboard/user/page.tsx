import TabComponent from '@/components/common-components/TabComponent'
import { TabPropsType } from '@/types/common'
import { TabContext, TabList, TabPanel, TabPanelProps } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'

type Props = {}

const UserPage = (props: Props) => {
  const tabData: TabPropsType = {
    handleTabChange: (value: string) => {},
    tabList: [
      {
        tabElement: <div>Roles</div>,
        tabName: 'Roles',
        tabValue: '0',
      },
      {
        tabElement: <div>Users</div>,
        tabName: 'Users',
        tabValue: '1',
      },
    ],
  }

  return <TabComponent tabProps={tabData} />
}

export default UserPage
