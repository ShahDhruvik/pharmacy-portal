import { Link } from 'react-router-dom'
import { BlogPosts } from '../../../utils/constants'

type Props = {}

const PostList = ({}: Props) => {
  return (
    <ul className='min-h-screen bg-blue-400 p-5'>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug} className='text-xl font-semibold hover:underline'>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
