import { useRef } from 'react'
import { users } from '../../user/container/data'
interface Props {}

const LogIn = ({}: Props) => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(emailRef.current?.value)
    console.log(passRef.current?.value)
    const email = emailRef.current?.value
    const user = users.find((x) => x.email === email)
    if (user) {
      localStorage.setItem('token', String(Math.random()))
      localStorage.setItem('role', 'USER')
      console.log('authenticated')
    } else {
      console.log('please authenticate')
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
