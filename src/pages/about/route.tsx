import { Route } from 'react-router-dom'
import About from './container/page'
import Contact from './container/contact'
import RouteWrapper from '../../middleware/routeWrapper'
import { ABOUT_PATH, COMMON_PATH } from '../../Paths'

interface Props {}

const AboutRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path={COMMON_PATH.DEFAULT} element={<About />} />
      <Route path={ABOUT_PATH.CONTACT} element={<Contact />} /> {/* Nested route */}
    </RouteWrapper>
  )
}

export default AboutRoute
