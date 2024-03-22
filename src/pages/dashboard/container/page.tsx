import { useAuth } from '@/context/AuthContext'
import Banner from './banner'
import Welcome from './welcome'

type Props = {}

const Dashboard = ({}: Props) => {
  const { authParams } = useAuth()
  return <>{authParams?.isAuth ? <Banner /> : <Welcome />}</>
}

export default Dashboard
