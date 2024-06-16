import DataGridComponent from '@/components/common-components/DataGridComponent'
import TabComponent from '@/components/common-components/TabComponent'
import { TabPropsType } from '@/types/common'

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
        tabElement: <DataGridComponent />,
        tabName: 'Users',
        tabValue: '1',
      },
    ],
  }

  return <TabComponent tabProps={tabData} />
}

export default UserPage
