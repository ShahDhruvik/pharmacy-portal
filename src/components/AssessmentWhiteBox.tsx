/* eslint-disable @typescript-eslint/no-explicit-any */
import SvgIcon from './SvgIcon'

// All the common components are made placed and developed here
type Props = {
  iconName?: string
  children: any
  left?: boolean
  col?: boolean
}

const AssessmentWhiteBox = ({ iconName, children, left, col }: Props) => {
  return (
    <>
      {!left ? (
        <div className='flex items-baseline gap-1'>
          <div
            className={
              col
                ? 'flex flex-col w-fit pr-10 mb-5 p-3 gap-2 rounded-md bg-white-main'
                : 'flex w-fit pr-10 mb-5 p-3 gap-2  rounded-md bg-white-main'
            }
          >
            {children}
          </div>
          {iconName && (
            <div>
              <SvgIcon iconName={iconName} />
            </div>
          )}
        </div>
      ) : (
        <div className='flex items-baseline gap-1 justify-end'>
          {iconName && (
            <div>
              <SvgIcon iconName={iconName} />
            </div>
          )}
          <div
            className={
              col
                ? 'flex flex-col w-fit pr-10 mb-5 p-3 gap-2  rounded-md bg-white-main'
                : 'flex w-fit pr-10 mb-5 p-3 gap-2  rounded-md bg-white-main'
            }
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default AssessmentWhiteBox
