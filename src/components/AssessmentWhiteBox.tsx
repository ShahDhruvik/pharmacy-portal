/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from '@/context/ThemeProvider'
import PersonIcon from '@mui/icons-material/Person'

// All the common components are made placed and developed here
type Props = {
  iconName?: string
  children: any
  left?: boolean
  name?: string
}

const AssessmentWhiteBox = ({ iconName, children, left, name }: Props) => {
  return (
    <div className={` flex items-baseline gap-1 ${!left ? '' : 'justify-end'}`}>
      {left && (
        <div>
          {iconName && <PersonIcon sx={{ color: theme.palette.mWhite?.main, fontSize: 20 }} />}
        </div>
      )}
      <div className='relative flex w-fit pr-10 mb-5 p-3 gap-2  rounded-md bg-white-main'>
        {name && <h1 className='labelBox text-sm'>{name}</h1>}
        {children}
      </div>
      {!left && (
        <div>
          {iconName && <PersonIcon sx={{ color: theme.palette.mWhite?.main, fontSize: 20 }} />}
        </div>
      )}
    </div>
  )
}

export default AssessmentWhiteBox
