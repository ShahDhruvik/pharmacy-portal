/* eslint-disable @typescript-eslint/no-explicit-any */
import SvgIcon from './SvgIcon'

// All the common components are made placed and developed here
type Props = {
  iconName: string
  children: any
  left?: boolean
}

const AssessmentWhiteBox = ({ iconName, children, left }: Props) => {
  return (
    <>
      {!left ? (
        <div className='flex items-baseline gap-1'>
          <div className='flex w-fit pr-10 mb-5 py-3 gap-2 px-3 rounded-md bg-white-main'>
            {children}
          </div>
          <div>
            <SvgIcon iconName={iconName} />
          </div>
        </div>
      ) : (
        <div className='flex items-baseline gap-1 justify-end'>
          <div>
            <SvgIcon iconName={iconName} />
          </div>
          <div className='flex w-fit pr-10 mb-5 py-1 gap-2 px-3 rounded-md bg-white-main'>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default AssessmentWhiteBox
