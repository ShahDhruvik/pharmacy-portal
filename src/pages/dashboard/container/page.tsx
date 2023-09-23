import { VITE_APP_TITLE } from '../../../utils/envVariables'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchTodos } from '../../../store/slices/User/todo.fetch'
import { fetchCachedData } from '../../../store/slices/cacheAPI/cache.fetch'
import { CACHE_KEYS } from '../../../utils/constants'
import { useToast } from '../../../hooks/useToast'
import { useLoading } from '../../../context/LoadingContext'
type Props = {}
const Dashboard = ({}: Props) => {
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { cache } = useAppSelector((state) => state.cache)
  const dispatch = useAppDispatch()
  const storeRolesGroups = async () => {
    setLoading({ isLoading: true, isPage: false })
    await dispatch(fetchTodos())
    setLoading({ isLoading: false, isPage: false })
  }
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
      <section>
        <div className='min-h-screen bg-white  '>
          <div>
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
          </div>
          <div>
            <h1 className='text-4xl text-emerald-800'>Toasts</h1>
            <button
              onClick={() => showToast('info', 'hello', { closeButton: false })}
              className='mr-5'
            >
              Notify
            </button>
            <button onClick={() => showToast('error', 'hello')} className='mr-5'>
              Error
            </button>
            <button onClick={() => showToast('success', 'hello')} className='mr-5'>
              Success
            </button>
            <button onClick={() => showToast('warning', 'hello')} className='mr-5'>
              Warn
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
