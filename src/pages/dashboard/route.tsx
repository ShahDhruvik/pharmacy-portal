import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '../../paths'
import withAuth from '../../middleware/auth.middleware'
import PlantTrees from './container/plantTrees'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Dashboard />} />
      <Route path={DASHBOARD_PATH.TREE} element={<PlantTrees />} />
      {/* Nested route */}
    </RouteWrapper>
  )
}

export default DashboardRoute
