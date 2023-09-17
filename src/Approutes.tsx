// This maintains the routes of the App.
// It will be separated as the routes are more complexed.
// This has an example for nested routing and some normal routes
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import AuthRoute from './pages/auth/route'
import DashboardRoute from './pages/dashboard/route'
import { withAuthen, withAutho } from './middleware/auth.middleware'
import AboutRoute from './pages/about/route'
import PostRoute from './pages/post/route'
import UserRoute from './pages/user/route'
import { ROLES } from './utils/constants'
import UnAuthorized from './components/UnAuthorized'
import { COMMON_PATH, MAIN_PATH } from './Paths'
type Props = {}
const AppRoutes = ({}: Props) => {
  const ProtectedDashboardRoute = withAuthen(DashboardRoute)
  const ProtectedAboutRoute = withAutho(AboutRoute, [ROLES.ADMIN, ROLES.USER])
  return (
    <Routes>
      <Route path={MAIN_PATH.AUTH} element={<AuthRoute />} />
      <Route path={MAIN_PATH.DASHBOARD} element={<ProtectedDashboardRoute />} />
      <Route path={MAIN_PATH.ABOUT} element={<ProtectedAboutRoute />} />
      <Route path={MAIN_PATH.POST} element={<PostRoute />} />
      <Route path={MAIN_PATH.USER} element={<UserRoute />} />
      <Route path={COMMON_PATH.NOTFOUND} element={<NotFound />} />
      <Route path={MAIN_PATH.UNAUTHORIZED} element={<UnAuthorized />} />
    </Routes>
  )
}

export default AppRoutes
