import { useEffect, useState } from 'react'
import { ALIGN_DIALOG, CACHE_KEYS } from '../../../utils/constants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchCachedData } from '../../../store/slices/cacheAPI/cache.fetch'
import SvgIcon from '../../../components/SvgIcon'
import CustomDialog from '../../../components/Dialog-custom'
import { Button, DialogContentText, DialogTitle, DialogActions } from '@mui/material'
import { useLoading } from '../../../context/LoadingContext'
import Loader from '../../../assets/images/loader.jpeg'
import Help from '@/pages/dashboard/container/help'
type Props = {}

const UserPage = ({}: Props) => {
  return (
    <>
      <Help />
    </>
  )
}

export default UserPage
