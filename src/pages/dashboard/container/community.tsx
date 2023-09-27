/* eslint-disable no-empty-pattern */
import img1 from '../../../../src/assets/images/Aspect_Ratio.jpg'
import { communityArr } from '../../../utils/data'

interface Props {}

const Community = ({}: Props) => {
  return (
    <>
      <section>
        <div className='flex justify-center flex-col items-center'>
          <div className='flex justify-evenly items-center w-full pt-1 flex-wrap'>
            <div>
              <img src={img1} alt='' width={'200px'} />
            </div>
            <div className='text-start'>
              <h1 className='md:text-3xl text-xl md:pb-5 sm:py-5'>Community Forums</h1>
            </div>
            <div>
              <img src={img1} alt='' width={'200px'} />
            </div>
          </div>
          <div className='flex justify-around items-center w-full py-20 gap-5 text-white-main flex-wrap'>
            {communityArr.map((x) => (
              <div
                className=' w-[320px] max-h-60 rounded-md h-40 bg-${x.color}'
                style={{ backgroundColor: x.color }}
              >
                <h2 className='border-b-2 px-5 py-2'>{x.heading}</h2>
                <span className='border-b-2' />
                <p className='text-xs px-5 py-4'>{x.para}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Community
