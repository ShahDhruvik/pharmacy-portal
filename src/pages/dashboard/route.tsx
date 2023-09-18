import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import Services from './container/services'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '../../Paths'
import withAuth from '../../middleware/auth.middleware'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Dashboard />} />
      <Route path={DASHBOARD_PATH.SERVICES} element={<Services />} /> {/* Nested route */}
    </RouteWrapper>
  )
}

export default withAuth(DashboardRoute)
