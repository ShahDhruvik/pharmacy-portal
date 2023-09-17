import { useNavigate } from 'react-router-dom'

interface Props {}

const LogOut = ({}: Props) => {
  const nav = useNavigate()
  return (
    <section className='bg-red-400'>
      <div className='flex justify-center items-center'>
        <button
          onClick={() => {
            localStorage.clear()
            nav('/auth/log-in')
            alert('SuccesFull LogOut')
          }}
        >
          signOut
        </button>
      </div>
    </section>
  )
}

export default LogOut
