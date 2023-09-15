import { Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import PostList from './container/PostList'
import Post from './container/Post'
import Posts from './container/page'

interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path='/' element={<Posts />}>
        <Route index element={<PostList />} />
        <Route path=':slug' element={<Post />} />
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
