// This maintains the routes of the App.
// It will be separated as the routes are more complexed.
// This has an example for nested routing and some normal routes
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import AboutRoute from './pages/about/route'
import DashboardRoute from './pages/dashboard/route'
import PostRoute from './pages/post/route'
import UserRoute from './pages/user/route'
type Props = {}

const AppRoutes = ({}: Props) => {
  return (
    <Routes>
      <Route path='/*' element={<DashboardRoute />} />
      <Route path='/about/*' element={<AboutRoute />} />
      <Route path='/posts/*' element={<PostRoute />} />
      <Route path='/user/*' element={<UserRoute />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
