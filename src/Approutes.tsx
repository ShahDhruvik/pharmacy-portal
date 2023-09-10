// This maintains the routes of the App.
// It will be separated as the routes are more complexed.
// This has an example for nested routing and some normal routes
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import NotFound from './components/NotFound'
import About from './pages/about/About'
import Posts from './pages/post/Posts'
import PostList from './pages/post/PostList'
import Post from './pages/post/Post'
type Props = {}

const AppRoutes = ({}: Props) => {
  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to='/' style={{ padding: 5 }}>
          Home
        </Link>
        <Link to='/posts' style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to='/about' style={{ padding: 5 }}>
          About
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Posts />}>
          <Route index element={<PostList />} />
          <Route path=':slug' element={<Post />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRoutes
