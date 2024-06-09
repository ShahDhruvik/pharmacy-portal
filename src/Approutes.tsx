import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import UnAuthorized from './components/UnAuthorized'
import { COMMON_PATH, MAIN_PATH } from './paths'
import Loader from './components/Loader'
import { useLoading } from './context/LoadingContext'
import DashboardRoutes from './pages/dashboard/route'

type Props = {}

const AppRoutes = ({}: Props) => {
  const { loading } = useLoading()
  return (
    <>
      <Routes>
        <Route path={MAIN_PATH.DASHBOARD} element={<DashboardRoutes />} />
        <Route path={MAIN_PATH.UNAUTHORIZED} element={<UnAuthorized />} />
        <Route path={COMMON_PATH.NOTFOUND} element={<NotFound />} />
      </Routes>
      <Loader loading={loading} />
    </>
  )
}

export default AppRoutes
