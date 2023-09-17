import { Route } from 'react-router-dom'
import User from './container/page'
import RouteWrapper from '../../middleware/routeWrapper'
import { COMMON_PATH } from '../../Paths'

interface Props {}

const UserRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path={COMMON_PATH.DEFAULT} element={<User />} />
    </RouteWrapper>
  )
}

export default UserRoute
