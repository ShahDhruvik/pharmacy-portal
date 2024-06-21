import TabComponent from '@/components/common-components/TabComponent'
import { TabPropsType } from '@/types/common'
import { useLoading } from '@/context/LoadingContext'
import { useEffect } from 'react'
import PharmacyList from './container/pharmacy-list'

type Props = {}

const PharmacyManagement = (props: Props) => {
  const tabData: TabPropsType = {
    handleTabChange: (value: string) => {},
    tabList: [
      {
        tabElement: <PharmacyList />,
        tabName: 'Pharmacy Onboarding',
        tabValue: '0',
      },
    ],
  }

  return <TabComponent tabProps={tabData} />
}

export default PharmacyManagement
