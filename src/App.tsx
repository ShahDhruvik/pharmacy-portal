// This resembles whole 'APP'.
import { Link } from 'react-router-dom'
import AppRoutes from './Approutes'

function App() {
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
        <Link to='/user' style={{ padding: 5 }}>
          User
        </Link>
        <Link to='/auth/log-out' style={{ padding: 5 }}>
          Logout
        </Link>
        <Link to='/auth/log-in' style={{ padding: 5 }}>
          Login
        </Link>
      </nav>
      <AppRoutes />
    </>
  )
}

export default App
