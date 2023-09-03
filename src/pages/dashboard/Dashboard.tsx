import Card from '../../components/Card'
import { VITE_APP_TITLE } from '../../utils/envVariables'

type Props = {}

const Dashboard = ({}: Props) => {
  console.log(VITE_APP_TITLE)
  return (
    <div>
      <h1>Dashboard</h1>
      <Card />
    </div>
  )
}

export default Dashboard
