import { useRef } from 'react'
import { users } from '../../user/container/data'
import { useNavigate } from 'react-router-dom'
import { COMMON_PATH } from '../../../Paths'
import { useAuth } from '../../../context/AuthContext'
interface Props {}

const LogIn = ({}: Props) => {
  const { addStorage } = useAuth()
  const nav = useNavigate()
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const email = emailRef.current?.value
      const user = users.find((x) => x.email === email)
      if (user) {
        addStorage(String(Math.random()), 'USER')
        nav(COMMON_PATH.DEFAULT)
        console.log('authenticated')
      } else {
        console.log('please authenticate')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='bg-red-400'>
      <div>
        <h1 className='text-center mb-5 text-4xl'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-btw-container lg: max-w-xs'>
          <div className='flex gap-1'>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' ref={emailRef} className='border-2 border-blue-500' />
          </div>
          <div className='flex gap-1'>
            <label htmlFor='pass'>Password</label>
            <input type='text' id='pass' ref={passRef} className='border-2 border-blue-500' />
          </div>
          <button type='submit'>Submit</button>
          <button type='reset'>Reset</button>
        </form>
      </div>
    </section>
  )
}

export default LogIn
