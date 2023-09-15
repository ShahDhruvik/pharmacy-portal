import { Route } from 'react-router-dom'
import User from './container/page'
import RouteWrapper from '../../middleware/routeWrapper'

interface Props {}

const UserRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path='/' element={<User />} />
    </RouteWrapper>
  )
}

export default UserRoute
