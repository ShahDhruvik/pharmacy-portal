import TabComponent from '@/components/common-components/TabComponent'
import { TabPropsType } from '@/types/common'
import UserList from './container/user-list'

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
        tabElement: <UserList />,
        tabName: 'Users',
        tabValue: '1',
      },
    ],
  }

  return <TabComponent tabProps={tabData} />
}

export default UserPage
