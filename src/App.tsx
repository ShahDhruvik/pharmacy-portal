// This resembles whole 'APP'.
import { Link } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { AUTH_PATH, COMMON_PATH, MAIN_PATH } from './Paths'

function App() {
  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to={COMMON_PATH.DEFAULT} style={{ padding: 5 }}>
          Home
        </Link>
        <Link to={MAIN_PATH.POST.split('/*')[0]} style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to={MAIN_PATH.ABOUT.split('/*')[0]} style={{ padding: 5 }}>
          About
        </Link>
        <Link to={MAIN_PATH.USER.split('/*')[0]} style={{ padding: 5 }}>
          User
        </Link>
        <Link to={`${MAIN_PATH.AUTH.split('/*')[0]}${AUTH_PATH.LOGOUT}`} style={{ padding: 5 }}>
          Logout
        </Link>
        <Link to={`${MAIN_PATH.AUTH.split('/*')[0]}${AUTH_PATH.LOGIN}`} style={{ padding: 5 }}>
          Login
        </Link>
      </nav>
      <AppRoutes />
    </>
  )
}

export default App
