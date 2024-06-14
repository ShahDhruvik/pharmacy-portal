import RedirectToPrevious from '@/components/other-components/RedirectToPreviousRoute'
import RouteWrapper from '@/middleware/routeWrapper'
import { AUTH_PATH } from '@/paths/index'
import { Route } from 'react-router-dom'
import LoginPage from './login'
type Props = {}

const AuthRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<RedirectToPrevious />} />
      <Route path={AUTH_PATH.LOGIN} element={<LoginPage />} />
    </RouteWrapper>
  )
}

export default AuthRoutes
