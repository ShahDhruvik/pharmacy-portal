/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/context/AuthContext'
import Banner from './banner'
import Welcome from './welcome'
import ChatDrawer from '@/pages/chat'
import { useChat } from '@/context/ChatContext'
import { useEffect } from 'react'
import socket from '@/socket/socket'

type Props = {}

const Dashboard = ({}: Props) => {
  const { authParams } = useAuth()
  const { currentUser } = useChat()
  useEffect(() => {
    console.log('connection from Dashboard Layout')
    // const user = localStorage.getItem('user')
    console.log(authParams?.isAuth)
    console.log(currentUser)
    if (authParams?.isAuth && currentUser) {
      console.log(socket.connected, 'connected or not')
      socket.connect()
      socket.on('connect', () => {
        console.log(
          socket.connected
            ? `socket connected from dashboard Layout ${socket.id}`
            : 'socket Failed to connect from dashboard Layout',
        )
      })
    } else {
      console.log('no Auth param')
    }
    return () => {
      socket.disconnect()
    }
  }, [socket, currentUser])
  return (
    <>
      {authParams?.isAuth ? (
        <>
          <Banner />
          <ChatDrawer />
        </>
      ) : (
        <Welcome />
      )}
    </>
  )
}

export default Dashboard
