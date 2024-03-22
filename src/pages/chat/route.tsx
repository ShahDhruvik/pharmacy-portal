import { Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import { MAIN_PATH } from '../../paths'
import withAuth from '../../middleware/auth.middleware'
import Chat from '../chat/page'

interface Props {}

const ChatRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path={MAIN_PATH.CHAT} element={<Chat />} />
    </RouteWrapper>
  )
}

export default ChatRoute
