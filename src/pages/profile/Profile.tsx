import { theme } from '@/context/ThemeProvider'
import { Divider, Button, Avatar } from '@mui/material'
import { DrawerState, FieldProfState, HeadProfState } from '@/types/common'
import { DRAWERSTATE, PROF_FIELDS, PROF_HEADER } from '@/utils/constants'
import ProfileImg from '@/assets/images/profile.avif'
import { useEffect, useState } from 'react'
import Spinner from '@/components/spinner'
import { getAllProfile } from '@/lib/Profile'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/context/AuthContext'
import { changePasswordForProvider } from '@/lib/Auth'
import socket from '@/socket/socket'

type Props = {
  handleDrawerState: (state: DrawerState) => void
  handleClose: () => void
  handleField: (
    fieldName: FieldProfState | undefined,
    data: string | undefined,
    headName: HeadProfState | undefined,
    isConfirm?: boolean,
  ) => void
}

export const Headers = ({ name }: { name: string }) => {
  return (
    <div className='mb-2'>
      <p className='font-semibold text-xl ml-[6px] '>{name}</p>
      <Divider sx={{ borderColor: theme.palette.mDarkGray?.main, borderWidth: '1.5px' }} />
    </div>
  )
}
export const FieldEdit = ({
  name,
  editFunction,
  data,
}: {
  name: string | undefined
  editFunction: () => void
  data: string | undefined
}) => {
  return (
    <div className='mb-2'>
      <div className={`flex items-center justify-between ${!name && 'mb-2'}`}>
        {!name && (
          <p className='ml-[6px] max-w-[200px] text-midGray-light text-lg '>
            {data ? data : 'Not available'}
          </p>
        )}

        {name && <p className='text-lg ml-[6px] '>{name}</p>}
        {/* <Button
          variant='text'
          color='mMidBlue'
          sx={{
            color: theme.palette.mMidBlue?.main,
            minWidth: 'max-content',
            height: 20,
            fontSize: '1rem',
            ...(!name && { alignSelf: 'flex-start' }),
          }}
          disableRipple
          onClick={editFunction}
        >
          {data ? 'Edit' : 'Add new'}
        </Button> */}
      </div>
      {name && (
        <p className='ml-[6px] text-midGray-light text-lg mb-2'>{data ? data : 'Not available'}</p>
      )}
      <Divider sx={{ borderColor: theme.palette.mMediumGray?.main, mx: '3px' }} />
    </div>
  )
}

const Profile = ({ handleDrawerState, handleClose, handleField }: Props) => {
  const [data, setData] = useState<any>(null)
  const { setLoading, loading } = useLoading()
  const showToast = useToast()
  const { clearStorage } = useAuth()

  const getData = async () => {
    const response = await getAllProfile(setLoading, showToast)
    setData(response)
  }

  useEffect(() => {
    getData()
  }, [])

  const changePassword = async () => {
    await changePasswordForProvider(setLoading, showToast)
  }

  if (!loading.isLoading && !loading.isIndependentLoader) {
    return (
      <div>
        <div
          className={`flex justify-between items-center mb-3 sticky top-0 z-10 bg-lightGray-main  py-[10px] `}
          id='header'
        >
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
            onClick={() => {
              socket.disconnect()
              clearStorage()
            }}
          >
            Sign out
          </Button>
        </div>
        <div className='flex flex-col gap-5 mb-3'>
          <div className='flex flex-col justify-center items-center'>
            <Avatar
              sx={{
                height: '70px',
                width: '70px',
              }}
              src={ProfileImg}
            />
            <p className='font-bold'>{data && `${data[0]?.name}`}</p>
          </div>
          <div>
            <Headers name={PROF_HEADER.PROFILE} />
            <FieldEdit
              name={PROF_FIELDS.COMMUNICATION_MOBILE}
              editFunction={() => {
                handleField(
                  PROF_FIELDS.COMMUNICATION_MOBILE,
                  data && data?.mobile,
                  PROF_HEADER.PROFILE,
                )
                handleDrawerState(DRAWERSTATE.EDIT)
              }}
              data={data && data[0]?.mobile}
            />
            <FieldEdit
              name={PROF_FIELDS.COMMUNICATION_EMAIL}
              editFunction={() => {
                handleField(
                  PROF_FIELDS.COMMUNICATION_EMAIL,
                  data && data?.email,
                  PROF_HEADER.PROFILE,
                )
                handleDrawerState(DRAWERSTATE.EDIT)
              }}
              data={data && data[0]?.email}
            />
          </div>
        </div>
        {/* <div
          className='text-darkBlue-main'
          role='button'
          onClick={() => {
            changePassword()
          }}
        >
          Change Password
        </div> */}
      </div>
    )
  } else {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }
}

export default Profile
