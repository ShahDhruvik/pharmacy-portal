import { useRef } from 'react'
import { FAQData } from '../utils/data'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { theme } from '@/context/ThemeProvider'

type Props = {
  handleToggle: (index: string) => void
  active: string
  faq: FAQData
  isLastItem: boolean
}

const AccordianItem = ({ handleToggle, active, faq, isLastItem }: Props) => {
  const contentEl = useRef<any>()
  const { question, _id, answer } = faq

  return (
    <div className='overflow-hidden'>
      <div
        className={` flex items-center justify-between transition-all duration-1000 border-opacity-60 px-6 py-2 ${
          active === _id ? 'active' : ''
        }`}
        onClick={() => handleToggle(_id)}
      >
        <h5 className='relative text-sm text-black-main font-semibold mb-0 transition-all duration-700 '>
          {question}
        </h5>
        {active === _id ? (
          <KeyboardArrowUpIcon sx={{ color: theme.palette.mDarkBlue?.main }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ color: theme.palette.mDarkBlue?.main }} />
        )}
      </div>
      <div className='flex items-center justify-center'>
        <div
          ref={contentEl}
          className={`bg-grey-main bg-lightBlue-main relative h-0 overflow-hidden transition-all duration-500 ease-in-out w-full ${
            active === _id ? 'h-auto' : ''
          } ${isLastItem ? 'rounded-b-lg' : 'border-b-2 border-gray-main'}`}
          style={active === _id ? { height: contentEl?.current?.scrollHeight } : { height: '0px' }}
        >
          <div className='px-6 py-3'>
            <div
              dangerouslySetInnerHTML={{
                __html: answer,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccordianItem
