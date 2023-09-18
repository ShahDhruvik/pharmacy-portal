import { Route } from 'react-router-dom'
import About from './container/page'
import Contact from './container/contact'
import RouteWrapper from '../../middleware/routeWrapper'
import { ABOUT_PATH } from '../../Paths'
import withAuth from '../../middleware/auth.middleware'
import { ROLES } from '../../utils/constants'

interface Props {}

const AboutRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<About />} />
      <Route path={ABOUT_PATH.CONTACT} element={<Contact />} /> {/* Nested route */}
    </RouteWrapper>
  )
}

export default withAuth(AboutRoute, [ROLES.ADMIN])
