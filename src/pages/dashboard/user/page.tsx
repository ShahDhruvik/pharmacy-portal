import TabComponent from '@/components/common-components/TabComponent'
import { TabPropsType } from '@/types/common'
import UserList from './container/user-list'
import RoleList from './role/role-list'
import { useLoading } from '@/context/LoadingContext'
import { useEffect } from 'react'

type Props = {}

const UserPage = (props: Props) => {
  const tabData: TabPropsType = {
    handleTabChange: (value: string) => {},
    tabList: [
      {
        tabElement: <RoleList />,
        tabName: 'Roles',
        tabValue: '0',
      },
      {
        tabElement: <UserList />,
        tabName: 'Users',
        tabValue: '1',
      },
    ],
  }

  return <TabComponent tabProps={tabData} />
}

export default UserPage
