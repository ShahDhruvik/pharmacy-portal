/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useLoading } from '@/context/LoadingContext'
import withAuth from '@/middleware/auth.middleware'
import React, { useEffect, useState } from 'react'

type Props = {}

const DashboardMainPage = (props: Props) => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading({ isLoading: true })
  }, [])
  return <div>DashboardMainPage</div>
}

export default DashboardMainPage
