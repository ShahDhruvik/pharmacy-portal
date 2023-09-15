import { Route } from 'react-router-dom'
import Dashboard from './container/page'
import Services from './container/services'
import RouteWrapper from '../../middleware/routeWrapper'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path='/' element={<Dashboard />} />
      <Route path='/services' element={<Services />} /> {/* Nested route */}
    </RouteWrapper>
  )
}

export default DashboardRoute
