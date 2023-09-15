import { x } from '../../../utils/constants'

type Props = {}

const UserPage = ({}: Props) => {
  return (
    <section className='bg-green-400'>
      <div className='flex flex-col gap-btw-container'>
        <h1 className='bg-red-400'>
          {x} Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laboriosam, quos
          incidunt voluptates quidem nobis aperiam magnam dolores nam repellat temporibus voluptatem
          autem dicta, consequuntur ab eligendi quod! Quos, facere?
        </h1>
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
        <div className='grid grid-cols-auto-fit gap-btw-container '>
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
      </div>
    </section>
  )
}

export default UserPage
