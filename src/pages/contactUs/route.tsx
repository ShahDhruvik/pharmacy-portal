import { Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
// import withAuth from '../../middleware/auth.middleware'
import Contact from './container/page'

interface Props {}

const ContactPath = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<Contact />} />
      {/* Nested route */}
    </RouteWrapper>
  )
}

export default ContactPath
