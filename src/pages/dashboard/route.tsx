/* eslint-disable react-refresh/only-export-components */
import RouteWrapper from '@/middleware/routeWrapper'
import { Outlet, Route } from 'react-router-dom'
import DashboardPage from './container/page'
import DashBoardLayout from './container/dashboard-layout'
import withAuth from '@/middleware/auth.middleware'
import { DASHBOARD_PATH } from '@/paths/index'
import UserPage from './user/page'

type Props = {}

const DashboardRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route
        element={
          <DashBoardLayout>
            <Outlet />
          </DashBoardLayout>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path={DASHBOARD_PATH.user} element={<UserPage />} />
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoutes
