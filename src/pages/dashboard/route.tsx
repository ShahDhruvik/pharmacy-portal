/* eslint-disable react-refresh/only-export-components */
import RouteWrapper from '@/middleware/routeWrapper'
import { Outlet, Route } from 'react-router-dom'
import DashboardPage from './page'
import DashBoardLayout from './dashboard-layout'
import withAuth from '@/middleware/auth.middleware'

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
      </Route>
    </RouteWrapper>
  )
}

export default withAuth(DashboardRoutes)
