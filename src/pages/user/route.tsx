import { Route } from 'react-router-dom'
import User from './container/page'
import RouteWrapper from '../../middleware/routeWrapper'
import Help from '../dashboard/container/help'

interface Props {}

const UserRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Help />} />
    </RouteWrapper>
  )
}

export default UserRoute
