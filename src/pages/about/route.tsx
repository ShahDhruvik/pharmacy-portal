import { Route } from 'react-router-dom'
import About from './container/page'
import Contact from './container/contact'
import RouteWrapper from '../../middleware/routeWrapper'

interface Props {}

const AboutRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path='/' element={<About />} />
      <Route path='/contact' element={<Contact />} /> {/* Nested route */}
    </RouteWrapper>
  )
}

export default AboutRoute
