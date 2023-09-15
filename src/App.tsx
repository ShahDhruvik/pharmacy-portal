// This resembles whole 'APP'.
import { Link } from 'react-router-dom'
import AppRoutes from './Approutes'

function App() {
  return (
    <>
      {/** Header or any sidebar layout */}
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
      </nav>
      <AppRoutes />
      {/** Footer */}
    </>
  )
}

export default App
