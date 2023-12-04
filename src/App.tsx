// This resembles whole 'APP'.
import AppRoutes from './Approutes'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'

function App() {
  const { authParams } = useAuth()
  return (
    <>
      {!authParams?.isAuth && <Navbar />}
      <AppRoutes />
    </>
  )
}

export default App
