import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import Services from './container/services'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '../../Paths'
import withAuth from '../../middleware/auth.middleware'
import Help from './container/tabs'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Dashboard />} />
      <Route path={DASHBOARD_PATH.SERVICES} element={<Services />} />
      <Route path={DASHBOARD_PATH.DISHANK} element={<Help />}>
        {/* <Route path={DASHBOARD_PATH.DISHANK1} element={<Help />} /> */}
      </Route>{' '}
      {/* Nested route */}
    </RouteWrapper>
  )
}

export default withAuth(DashboardRoute)
