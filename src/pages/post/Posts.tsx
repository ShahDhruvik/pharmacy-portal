import { Outlet } from 'react-router-dom'

type Props = {}

const Posts = ({}: Props) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      <Outlet />
    </div>
  )
}

export default Posts
