/* eslint-disable no-empty-pattern */
import img1 from '../../../../src/assets/images/Aspect_Ratio.jpg'
import { faqs } from '../../../utils/data'
import AccordionBox from './AccordionBox'

interface Props {}

const Help = ({}: Props) => {
  return (
    <>
      <section>
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-3xl pb-5'>How can we help you?</h1>
          <input
            type='text'
            className='bg-[#f6f9f7] border-2 border-gray-500 w-8/12'
            placeholder='Describe your issue'
          />
          <div className='flex justify-between items-baseline w-full pt-1'>
            <div>
              <img src={img1} alt='' width={'200px'} />
            </div>
            <div className='text-start px-24'>
              <p className='pb-2'>Browse help topics</p>
              <div className='flex flex-col items-center justify-center '>
                <AccordionBox faqs={faqs} />
              </div>
            </div>
            <div>
              <img src={img1} alt='' width={'200px'} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Help
