import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import DashboardRoute from './pages/dashboard/route'
import UnAuthorized from './components/UnAuthorized'
import { COMMON_PATH, MAIN_PATH } from './paths'
import Loader from './components/Loader'
import { useLoading } from './context/LoadingContext'
import Help from './pages/dashboard/container/help'

type Props = {}

const AppRoutes = ({}: Props) => {
  const { loading } = useLoading()
  return (
    <>
      {' '}
      <Routes>
        <Route path={MAIN_PATH.DASHBOARD} element={<DashboardRoute />} />
        <Route path={MAIN_PATH.HELP} element={<Help />} />
        <Route path={COMMON_PATH.NOTFOUND} element={<NotFound />} />
        <Route path={MAIN_PATH.UNAUTHORIZED} element={<UnAuthorized />} />
      </Routes>
      <Loader loading={loading} />
    </>
  )
}

export default AppRoutes
