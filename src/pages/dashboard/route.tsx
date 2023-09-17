import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import Services from './container/services'
import RouteWrapper from '../../middleware/routeWrapper'
import { COMMON_PATH, DASHBOARD_PATH } from '../../Paths'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path={COMMON_PATH.DEFAULT} element={<Dashboard />} />
      <Route path={DASHBOARD_PATH.SERVICES} element={<Services />} /> {/* Nested route */}
    </RouteWrapper>
  )
}

export default DashboardRoute
