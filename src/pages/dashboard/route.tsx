import RouteWrapper from '@/middleware/routeWrapper'
import { Route } from 'react-router-dom'
import DashboardPage from './page'
import Help from './help'
import { DASHBOARD_PATH } from '@/paths/index'

type Props = {}

const DashboardRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<DashboardPage />} />
      <Route path={DASHBOARD_PATH.help_and_faq} element={<Help />} />
    </RouteWrapper>
  )
}

export default DashboardRoutes
