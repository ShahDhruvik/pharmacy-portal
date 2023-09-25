import { Outlet } from 'react-router-dom'

type Props = {}

const Posts = ({}: Props) => {
  return (
    <div>
      <h2 className='bg-green-400  text-3xl p-5 font-bold'>BLOG : -</h2>

      <Outlet />
    </div>
  )
}

export default Posts
