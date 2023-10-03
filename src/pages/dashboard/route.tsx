import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '../../paths'
import withAuth from '../../middleware/auth.middleware'
import Help from './container/tabs'
import PlantTrees from './container/plantTrees'
import FAQTabs from './container/tabs'
import OnlineScheduling from './container/onlineSch/onlineScheduling'
import InPerson from './container/bookInPerson/inPerson'
import List from './container/bookInPerson/list'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Dashboard />} />
      <Route path={DASHBOARD_PATH.TREE} element={<PlantTrees />} />
      <Route path={DASHBOARD_PATH.FAQTABS} element={<FAQTabs />} />
      <Route path={DASHBOARD_PATH.BOOK_CONSULTATION} element={<OnlineScheduling />} />
      <Route path={DASHBOARD_PATH.BOOK_IN_PERSON} element={<InPerson />} />
      <Route path={DASHBOARD_PATH.LIST_OF_BOOK_IN_PERSON} element={<List />} />
      {/* </Route> */}
      <Route path={DASHBOARD_PATH.DISHANK} element={<Help />}>
        {/* <Route path={DASHBOARD_PATH.DISHANK1} element={<Help />} /> */}
      </Route>{' '}
      {/* Nested route */}
    </RouteWrapper>
  )
}

export default withAuth(DashboardRoute)
