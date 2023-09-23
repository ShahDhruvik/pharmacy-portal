/* eslint-disable no-empty-pattern */
import { VITE_APP_TITLE } from '../../../utils/envVariables'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchTodos } from '../../../store/slices/User/todo.fetch'
import { fetchCachedData } from '../../../store/slices/cacheAPI/cache.fetch'
import { CACHE_KEYS } from '../../../utils/constants'
import Delivery from './delivery'
import PlantTrees from './plantTrees'
import SvgIcon from '../../../components/SvgIcon'

type Props = {}

const Dashboard = ({}: Props) => {
  const { cache } = useAppSelector((state) => state.cache)
  const dispatch = useAppDispatch()
  const storeRolesGroups = async () => await dispatch(fetchTodos())
  const cacheData = async () => {
    await dispatch(
      fetchCachedData('https://jsonplaceholder.typicode.com/posts', CACHE_KEYS.POST, cache),
    )
    await dispatch(
      fetchCachedData('https://jsonplaceholder.typicode.com/users', CACHE_KEYS.USER, cache),
    )
  }
  useEffect(() => {
    storeRolesGroups()
    cacheData()
  }, [])
  console.log(VITE_APP_TITLE)
  return (
    <>
      {/* <section>
        <div className='min-h-screen'> */}
      {/* <div>
            <h1 className='text-4xl text-emerald-800'>Users</h1>
            {cache.cacheData[CACHE_KEYS.USER].map((x: any) => {
              return (
                <h4 className='' key={x.id}>
                  {x.name}
                </h4>
              )
            })}
          </div>
          <div>
            <h1 className='text-4xl text-emerald-800'>Posts</h1>
            {cache.cacheData[CACHE_KEYS.POST].map((x: any) => {
              return (
                <h4 className='' key={x.id}>
                  {x.title}
                </h4>
              )
            })}
          </div> */}
      <Delivery />
      {/* <PlantTrees /> */}
      {/* </div>
      </section> */}
    </>
  )
}

export default Dashboard
