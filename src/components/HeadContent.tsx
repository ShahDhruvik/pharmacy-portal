import Star from '@/assets/icons/star.svg?react'

type Props = {
  heading: string
  wrapperClass?: string
}

const HeadContent = ({ heading, wrapperClass }: Props) => {
  return (
    <section>
      <div className={wrapperClass}>
        <div className='flex flex-col items-center justify-center text-darkBlue-main text-center'>
          <ul className='flex flex-col sm:flex-row list-disc gap-8 text-2xl font-normal flex-wrap'>
            <li className='list-none'>Holistic </li>
            <li>Judgement-free</li>
            <li>Discreet </li>
            <li>Convenient</li>
          </ul>
          <h1 className='text-5xl leading-snug'>{heading}</h1>
          <span className='flex gap-5'>
            <Star width={30} height={30} />
            <Star width={30} height={30} />
            <Star width={30} height={30} />
            <Star width={30} height={30} />
            <Star width={30} height={30} />
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeadContent
