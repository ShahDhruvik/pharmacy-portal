// socket.ts
import { io, Socket } from 'socket.io-client'
import { VITE_APP_SOCKET_SERVER_URL } from '../utils/envVariables'
import { CONST_SOCKET_SERVER_URL } from '@/utils/constants'
const authorization = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')
const chatType = localStorage.getItem('chatType')

const socket: Socket = io(VITE_APP_SOCKET_SERVER_URL || CONST_SOCKET_SERVER_URL, {
    auth: { authorization, refreshToken, chatType },
    autoConnect: false,
})

export default socket
