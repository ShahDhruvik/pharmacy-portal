import { useAuth } from '@/context/AuthContext'
import Banner from './banner'
import Welcome from './welcome'

type Props = {}

const Dashboard = ({}: Props) => {
  const { authParams } = useAuth()
  return (
    <>
      <Welcome />
      <Banner />
    </>
  )
}

export default Dashboard

//Caching logic
{
  // const { setLoading } = useLoading()
  // const showToast = useToast()
  // const { cache } = useAppSelector((state) => state.cache)
  // const dispatch = useAppDispatch()
  // const storeRolesGroups = async () => {
  // setLoading({ isLoading: true, isPage: false })
  // await dispatch(fetchTodos())
  // setLoading({ isLoading: false, isPage: false })
  // }
  // const cacheData = async () => {
  //   await dispatch(
  //     fetchCachedData('https://jsonplaceholder.typicode.com/posts', CACHE_KEYS.POST, cache),
  //   )
  //   await dispatch(
  //     fetchCachedData('https://jsonplaceholder.typicode.com/users', CACHE_KEYS.USER, cache),
  //   )
  // }
  // useEffect(() => {
  //   storeRolesGroups()
  //   cacheData()
  // }, [])
  /* 
  <Delivery />
      <OnlineScheduling />
      <InPerson />
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
      </section> */
}
