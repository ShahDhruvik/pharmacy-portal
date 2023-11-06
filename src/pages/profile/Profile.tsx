import { theme } from '@/context/ThemeProvider'
import { Divider, Button, Avatar } from '@mui/material'
import { DrawerState, FieldProfState, HeadProfState } from '@/types/common'
import { DRAWERSTATE, PROF_FIELDS, PROF_HEADER } from '@/utils/constants'
import ProfileImg from '@/assets/images/profile.avif'
import { useEffect, useState } from 'react'
type Props = {
  handleDrawerState: (state: DrawerState) => void
  handleClose: () => void
  handleField: (
    fieldName: FieldProfState | undefined,
    data: string | undefined,
    headName: HeadProfState | undefined,
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
        <Button
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
        </Button>
      </div>
      {name && (
        <p className='ml-[6px] text-midGray-light text-lg mb-2'>{data ? data : 'Not available'}</p>
      )}
      <Divider sx={{ borderColor: theme.palette.mMediumGray?.main, mx: '3px' }} />
    </div>
  )
}

const Profile = ({ handleDrawerState, handleClose, handleField }: Props) => {
  return (
    <div>
      <div
        className={`flex justify-between items-center mb-3 sticky top-0 z-10  py-[10px] `}
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
        >
          Sign out
        </Button>
      </div>
      <div className='flex flex-col gap-5 mb-3'>
        <div className='flex justify-center items-center'>
          <Avatar
            sx={{
              height: '70px',
              width: '70px',
            }}
            src={ProfileImg}
          />
        </div>
        <div>
          <Headers name={PROF_HEADER.PROFILE} />
          <FieldEdit
            name={PROF_FIELDS.PROFILE_MOBILE}
            editFunction={() => {
              handleField(PROF_FIELDS.PROFILE_MOBILE, '+9123089023', PROF_HEADER.PROFILE)
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={'+9123089023'}
          />
          <FieldEdit
            name={PROF_FIELDS.PROFILE_EMAIL}
            editFunction={() => {
              handleField(PROF_FIELDS.PROFILE_EMAIL, 'dhruvik9a03@gmail.com', PROF_HEADER.PROFILE)
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={'dhruvik9a03@gmail.com'}
          />
        </div>
        <div>
          <Headers name={PROF_HEADER.COMMUNICATION} />
          <FieldEdit
            name={PROF_FIELDS.COMMUNICATION_MOBILE}
            editFunction={() => {
              handleField(
                PROF_FIELDS.COMMUNICATION_MOBILE,
                '+9123089023',
                PROF_HEADER.COMMUNICATION,
              )
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={'+9123089023'}
          />
          <FieldEdit
            name={PROF_FIELDS.COMMUNICATION_EMAIL}
            editFunction={() => {
              handleField(PROF_FIELDS.COMMUNICATION_EMAIL, '+9123089023', PROF_HEADER.COMMUNICATION)
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={'dhruvik9a03@gmail.com'}
          />
          <FieldEdit
            name={PROF_FIELDS.COMMUNICATION_PREFERENCE}
            editFunction={() => {
              handleField(
                PROF_FIELDS.COMMUNICATION_PREFERENCE,
                '+9123089023',
                PROF_HEADER.COMMUNICATION,
              )
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={'Dr Shah'}
          />
        </div>
        <div>
          <Headers name={PROF_HEADER.INSURANCE} />
          <FieldEdit
            name={undefined}
            editFunction={() => {
              handleField(
                PROF_FIELDS.INSURANCE_FIELD,
                `Canada life insurance 
              Plan no : 123456789`,
                PROF_HEADER.INSURANCE,
              )
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={`Canada life insurance 
            Plan no : 123456789`}
          />
        </div>
        <div>
          <Headers name={PROF_HEADER.COUNTRY} />
          <FieldEdit
            name={undefined}
            editFunction={() => {
              handleField(PROF_FIELDS.COUNTRY_FIELD, 'India', PROF_HEADER.COUNTRY)
              handleDrawerState(DRAWERSTATE.EDIT)
            }}
            data={'India'}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
