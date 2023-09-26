import { useState } from 'react'
import AccordianItem from './AccordionItem'
import { FAQData } from '../utils/data'

type Props = { faqs: FAQData[] }

const AccordionBox = ({ faqs }: Props) => {
  const [active, setActive] = useState<number | null>(null)
  const handleToggle = (index: number) => {
    if (active === index) {
      setActive(null)
    } else {
      setActive(index)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center '>
      {faqs.map((faq, index) => {
        return <AccordianItem key={index} active={active} handleToggle={handleToggle} faq={faq} />
      })}
    </div>
  )
}

export default AccordionBox
