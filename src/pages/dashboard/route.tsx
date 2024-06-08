import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import RouteWrapper from '../../middleware/routeWrapper'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Dashboard />} />
    </RouteWrapper>
  )
}

export default DashboardRoute
