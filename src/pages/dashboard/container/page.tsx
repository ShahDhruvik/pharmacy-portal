/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/context/AuthContext'
import Banner from './banner'
import Welcome from './welcome'
import ChatDrawer from '@/pages/chat'
import { useChat } from '@/context/ChatContext'
import { useEffect } from 'react'
import socket from '@/socket/socket'
import Header from '@/components/Header'

type Props = {}

const Dashboard = ({}: Props) => {
  const { authParams } = useAuth()
  const { currentUser } = useChat()
  useEffect(() => {
    const connectSocket = () => {
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
    }
    const handleConnectError = (err: any) => {
      console.log(err, '----socket Error')
      if (err.message === 'Unauthorized') {
        window.location.reload()
        setTimeout(connectSocket, 5000)
      }
    }
    socket.on('connect_error', handleConnectError)
    connectSocket()
    return () => {
      socket.disconnect()
    }
  }, [socket, currentUser, authParams?.isAuth])
  return (
    <>
      {authParams?.isAuth ? (
        <>
          <Header />
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
