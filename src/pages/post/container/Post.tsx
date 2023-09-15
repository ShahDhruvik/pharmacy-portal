import { useParams } from 'react-router-dom'
import { BlogPosts } from '../../../utils/constants'

type Props = {}

const Post = ({}: Props) => {
  const { slug } = useParams()
  const post = BlogPosts[slug as string]
  if (!post) {
    return <span>The blog post you've requested doesn't exist.</span>
  }
  const { title, description } = post
  return (
    <section className='min-h-screen bg-blue-400 '>
      <div style={{ padding: 20 }}>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-2xl font-medium'>{description}</p>
      </div>
    </section>
  )
}

export default Post
