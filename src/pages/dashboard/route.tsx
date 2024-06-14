import RouteWrapper from '@/middleware/routeWrapper'
import { Route } from 'react-router-dom'
import DashboardPage from './page'

type Props = {}

const DashboardRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<DashboardPage />} />
    </RouteWrapper>
  )
}

export default DashboardRoutes
