import { useEffect } from 'react'
import { CACHE_KEYS } from '../../../utils/constants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchCachedData } from '../../../store/slices/cacheAPI/cache.fetch'
import SvgIcon from '../../../components/SvgIcon'
type Props = {}

const UserPage = ({}: Props) => {
  // const ImportedSvg = useSvgImport('ser')
  const dispatch = useAppDispatch()
  const { cache } = useAppSelector((state) => state.cache)
  const cacheData = async () => {
    await dispatch(
      fetchCachedData('https://jsonplaceholder.typicode.com/todos/1', CACHE_KEYS.TODO1, cache),
    )
  }
  useEffect(() => {
    cacheData()
  }, [])
  return (
    <section className='bg-green-400'>
      <div className='flex flex-col gap-btw-container'>
        {cache.cacheData[CACHE_KEYS.TODO1] && <h1>{cache.cacheData[CACHE_KEYS.TODO1].title}</h1>}
        <div className='w-full aspect-sliderDragableImage bg-slate-500'>
          <p className='font-sans font-thin'>hello</p>
          <p className='font-sans font-extralight'>hello</p>
          <p className='font-sans font-light'>hello</p>
          <p className='font-sans font-normal'>hello</p>
          <p className='font-sans font-medium'>hello</p>
          <p className='font-sans font-semibold'>hello</p>
          <p className='font-sans font-bold'>hello</p>
          <p className='font-sans font-extrabold'>hello</p>
          <p className='font-sans font-black'>hello</p>
        </div>
        <div className='grid grid-cols-auto-fit gap-btw-container text-gray-700'>
          <div className='bg-red-400'>
            <h1>hello</h1>
          </div>
          <div className='bg-red-400 '>
            <h1>1</h1>
          </div>
          <div className='bg-red-400 '>
            <h1>1</h1>
          </div>
          <div className='bg-red-400 '>
            <h1>1</h1>
          </div>
        </div>
        <SvgIcon
          iconName='loading'
          svgProp={{ className: 'w-8 h-8 animate-loading text-gray-950' }}
        />
        <SvgIcon iconName='ser' />
      </div>
    </section>
  )
}

export default UserPage
