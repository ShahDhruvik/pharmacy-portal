import { theme } from '@/context/ThemeProvider'
import { Divider, Button } from '@mui/material'
import TxtInput from '../../components/TxtInput'
import { DrawerState } from '@/types/common'
import { DRAWERSTATE } from '@/utils/constants'
type Props = {
  handleDrawerState: (state: DrawerState) => void
  handleClose: () => void
}

const Headers = ({ name }: { name: string }) => {
  return (
    <div className='mb-2'>
      <p className='font-semibold text-xl ml-[6px] '>{name}</p>
      <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
    </div>
  )
}
const FieldEdit = ({
  name,
  editFunction,
  data,
}: {
  name: string
  editFunction: () => void
  data: string | undefined
}) => {
  return (
    <div className='mb-2'>
      <div className='flex items-center justify-between'>
        <p className='text-lg ml-[6px] '>{name}</p>
        <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            height: 20,
            fontSize: '1rem',
          }}
          disableRipple
          onClick={editFunction}
        >
          {data ? 'Edit' : 'Add new'}
        </Button>
      </div>
      <p className='ml-[6px] text-midGray-light text-lg mb-2'>{data ? data : 'ot available'}</p>
      <Divider sx={{ borderColor: theme.palette.mMediumGray?.main, mx: '3px' }} />
    </div>
  )
}

const Profile = ({ handleDrawerState, handleClose }: Props) => {
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
          onClick={handleClose}
          disableRipple
        >
          Done
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
        >
          Sign out
        </Button>
      </div>
      <div>
        <Headers name='Profile' />
        <FieldEdit
          name='Mobile Number'
          editFunction={() => handleDrawerState(DRAWERSTATE.EDIT)}
          data={'+9123089023'}
        />
        <FieldEdit
          name='Mobile Number'
          editFunction={() => handleDrawerState(DRAWERSTATE.EDIT)}
          data={'+9123089023'}
        />
      </div>
      <div>
        <Headers name='Profile' />
        <FieldEdit
          name='Mobile Number'
          editFunction={() => handleDrawerState(DRAWERSTATE.EDIT)}
          data={'+9123089023'}
        />
        <FieldEdit
          name='Mobile Number'
          editFunction={() => handleDrawerState(DRAWERSTATE.EDIT)}
          data={'+9123089023'}
        />
        <FieldEdit
          name='Mobile Number'
          editFunction={() => handleDrawerState(DRAWERSTATE.EDIT)}
          data={'+9123089023'}
        />
        <FieldEdit
          name='Mobile Number'
          editFunction={() => handleDrawerState(DRAWERSTATE.EDIT)}
          data={'+9123089023'}
        />
      </div>
    </div>
  )
}

export default Profile
