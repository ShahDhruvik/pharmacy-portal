import SvgIcon from '@/components/SvgIcon'
import { frequentlyAskedQuestions } from '@/utils/data'
import { Link } from 'react-router-dom'

type Props = {}

const AssistSlider = (props: Props) => {
  return (
    <div className='sticky top-0 h-max'>
      <h2 className='w-max text-xl text-black-main'>Frequently Asked Questions</h2>
      {frequentlyAskedQuestions.map((x) => (
        <Link to={'/faq'}>
          <div className='flex flex-col w-max '>
            <div className='border-[1px] border-black-main flex w-full mt-3 py-1 gap-2 px-3 rounded-md bg-white-main'>
              <div>
                <SvgIcon iconName={'ser'} />
              </div>
              <div>{x.que}</div>
            </div>
          </div>
        </Link>
      ))}
      <span className='text-blue-main flex justify-end py-3'>read more....</span>
    </div>
  )
}

export default AssistSlider
