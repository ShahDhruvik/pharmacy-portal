import Card from '../../components/Card'
import { VITE_APP_TITLE } from '../../utils/envVariables'

type Props = {}

const Dashboard = ({}: Props) => {
  console.log(VITE_APP_TITLE)
  return (
    <div className='min-h-screen bg-red-400 flex justify-center items-center'>
      <h1 className='text-4xl'>Dashboard </h1>
      <Card />
    </div>
  )
}

export default Dashboard
