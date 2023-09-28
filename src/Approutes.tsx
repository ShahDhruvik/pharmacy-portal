// This maintains the routes of the App.
// It will be separated as the routes are more complexed.
// This has an example for nested routing and some normal routes
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import AuthRoute from './pages/auth/route'
import DashboardRoute from './pages/dashboard/route'
import AboutRoute from './pages/about/route'
import PostRoute from './pages/post/route'
import UserRoute from './pages/user/route'
import UnAuthorized from './components/UnAuthorized'
import { COMMON_PATH, MAIN_PATH } from './paths'
import Loader from './components/Loader'
import { useLoading } from './context/LoadingContext'
import Contact from './pages/contactUs/container/page'

type Props = {}

const AppRoutes = ({}: Props) => {
  const { loading } = useLoading()
  return (
    <>
      {' '}
      <Routes>
        <Route path={MAIN_PATH.AUTH} element={<AuthRoute />} />
        <Route path={MAIN_PATH.DASHBOARD} element={<DashboardRoute />} />
        <Route path={MAIN_PATH.ABOUT} element={<AboutRoute />} />
        <Route path={MAIN_PATH.POST} element={<PostRoute />} />
        <Route path={MAIN_PATH.USER} element={<UserRoute />} />
        <Route path={COMMON_PATH.NOTFOUND} element={<NotFound />} />
        <Route path={MAIN_PATH.UNAUTHORIZED} element={<UnAuthorized />} />
        <Route path={MAIN_PATH.CONTACT_US} element={<Contact />} />
      </Routes>
      <Loader loading={loading} />
    </>
  )
}

export default AppRoutes
