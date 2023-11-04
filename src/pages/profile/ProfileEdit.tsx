import { theme } from '@/context/ThemeProvider'
import { Divider, Button } from '@mui/material'
import TxtInput from '../../components/TxtInput'
import { DrawerState } from '@/types/common'
import { DRAWERSTATE } from '@/utils/constants'
type Props = {
  handleDrawerState: (state: DrawerState) => void
}

const ProfileEdit = ({ handleDrawerState }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between items-center mb-3 sticky top-0 bg-white-main'>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            fontSize: '1rem',

            height: 20,
          }}
          onClick={() => handleDrawerState(DRAWERSTATE.NORMAL)}
          disableRipple
        >
          Submit
        </Button>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            fontSize: '1rem',

            height: 20,
          }}
          disableRipple
          onClick={() => handleDrawerState(DRAWERSTATE.NORMAL)}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ProfileEdit
