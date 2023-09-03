import { Link } from 'react-router-dom'
import { BlogPosts } from '../../utils/constants'

type Props = {}

const PostList = ({}: Props) => {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
