import { Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import PostList from './container/PostList'
import Post from './container/Post'
import Posts from './container/page'
import { COMMON_PATH, POST_PATH } from '../../paths'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path={COMMON_PATH.DEFAULT} element={<Posts />}>
        <Route index element={<PostList />} />{' '}
        {/** index is rendered when the route matches the parent path here that is default */}
        <Route path={POST_PATH.INDPOST} element={<Post />} />
        {/** slug based routing */}
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
