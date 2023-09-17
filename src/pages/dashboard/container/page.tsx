import Card from '../../../components/Card'
import { VITE_APP_TITLE } from '../../../utils/envVariables'
// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '../../../store/hooks'
// import { fetchUsers } from '../../../store/slices/User/user.fetch'

type Props = {}

const Dashboard = ({}: Props) => {
  // const { users } = useAppSelector((state) => state.user)
  // const dispatch = useAppDispatch()
  // const storeRolesGroups = async () => await dispatch(fetchUsers())
  // useEffect(() => {
  //   console.log('object use')
  //   storeRolesGroups()
  // }, [])
  // console.log(users)
  console.log(VITE_APP_TITLE)
  return (
    <div className='min-h-screen bg-red-400 flex justify-center items-center'>
      <h1 className='text-4xl'>Dashboard </h1>
      <Card />
    </div>
  )
}

export default Dashboard
