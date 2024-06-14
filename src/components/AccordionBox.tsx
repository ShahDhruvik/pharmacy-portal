import { useState } from 'react'
import AccordianItem from './AccordionItem'
import { FAQData } from '../utils/data'
import CustomBackDrop from './CustomBackdrop'

type Props = { faqs: FAQData[]; index: string }

const AccordionBox = ({ faqs, index }: Props) => {
  const [active, setActive] = useState<string>(index)

  const handleToggle = (index: string) => {
    if (active === index) {
      setActive('')
    } else {
      setActive(index)
    }
  }

  return (
    <div
      className={`relative rounded-lg  border-2 border-mGray-main ${
        faqs.length === 0 && 'aspect-video mxs:aspect-[5/2] msm:aspect-[5/1]'
      }`}
    >
      {faqs.length === 0 && (
        <CustomBackDrop>
          <p className='text-mOrange-main text-center '> No record Found</p>
        </CustomBackDrop>
      )}
      {faqs?.slice(0, 5)?.map((faq, i) => {
        const isLastItem = i === faqs.length - 1
        return (
          <AccordianItem
            key={i}
            active={active}
            handleToggle={handleToggle}
            faq={faq}
            isLastItem={isLastItem}
          />
        )
      })}
    </div>
  )
}

export default AccordionBox
