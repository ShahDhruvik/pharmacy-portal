import { useRef } from 'react'
import { FAQData } from '../utils/data'
import SvgIcon from './SvgIcon'

type Props = {
  handleToggle: (index: number) => void
  active: number | null
  faq: FAQData
}

const AccordianItem = ({ handleToggle, active, faq }: Props) => {
  const contentEl = useRef<any>()
  const { header, id, text } = faq
  return (
    <div className='overflow-hidden max-w-4xl'>
      <div>
        <div
          className={` flex items-center justify-between transition-all duration-1000 border-2 border-gray-main border-opacity-60 px-6 py-2 ${
            active === id ? 'active' : ''
          }`}
          onClick={() => handleToggle(id)}
        >
          <h5 className='relative text-sm text-black-main font-semibold mb-0 transition-all duration-700 basis-3/4 '>
            {header}
          </h5>
          <SvgIcon iconName='ser' wrapperStyle=' transform rotate-180' />
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div
          ref={contentEl}
          className={`bg-grey-main bg-lightBlue-main relative h-0 overflow-hidden transition-all duration-500 ease-in-out ${
            active === id ? 'h-auto' : ''
          }`}
          style={active === id ? { height: contentEl?.current?.scrollHeight } : { height: '0px' }}
        >
          <div className='text-xs px-6 py-3 '>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccordianItem
