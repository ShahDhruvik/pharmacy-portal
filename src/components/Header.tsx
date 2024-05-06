/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/pink.png'
import Text from '../assets/images/Triaina-Health-New.png'
import { headerData } from '../utils/data'
import { IconButton } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ProfileBar from '../pages/profile/Profilebar'
import TaskBar from '@/pages/task-bar/task-bar'
import { useChat } from '@/context/ChatContext'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'
import ReactPlayer from 'react-player'
import TelegramIcon from '@mui/icons-material/Telegram'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

interface Props {}

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Header = ({}: Props) => {
  const {
    openChatDrawer,
    setOpenChatDrawer,
    playTune,
    currentUser,
    setPlayTune,
    setNotify,
    notify,
  } = useChat()

  const nav = useNavigate()

  //Mobile  pop-up
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDrawerForTask, setOpenDrawerForTask] = useState(false)
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    setAnchorEl(null)
  }
  const handleopenDrawer = () => {
    setOpenDrawer(true)
    setAnchorEl(null)
  }
  const handleCloseDrawerForTask = () => {
    setOpenDrawerForTask(false)
    setAnchorEl(null)
  }
  const handleOpenDrawerForTask = () => {
    setOpenDrawerForTask(true)
    setAnchorEl(null)
  }
  useEffect(() => {
    const handleListUpdate = (userId: string[]) => {
      if (currentUser) {
        console.log(userId.includes(String(currentUser?.internalId)) && !openChatDrawer)
        if (userId.includes(String(currentUser?.internalId)) && !openChatDrawer) {
          setNotify((prev) => prev + 1)
        } else {
          setNotify(0)
        }
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_NOTIFY, handleListUpdate)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_NOTIFY, handleListUpdate)
    }
  }, [socket, currentUser, openChatDrawer])
  useEffect(() => {
    if (notify) {
      setPlayTune(true)
    }
  }, [notify])
  return (
    <>
      <nav className='sticky top-0 z-40 bg-white-main'>
        <div className='flex flex-row gap-3 min-[350px]:items-center md:gap-0 '>
          <div className='flex items-center gap-2 flex-1'>
            <img
              src={Logo}
              alt='Logo'
              width={50}
              height={50}
              onClick={() => {
                nav('/')
              }}
              className='cursor-pointer block sm:hidden'
            />
            <img
              src={Text}
              alt={'Triaina Health'}
              width={130}
              height={50}
              onClick={() => {
                nav('/')
              }}
              className='cursor-pointer sm:block hidden'
            />
          </div>
          <div
            role='button'
            className='hidden md:flex flex-row flex-wrap gap-5 text-darkBlue-main font-light items-center mr-5'
            onClick={handleOpenDrawerForTask}
          >
            <span className='hover:underline bg-white-main px-3 py-1 rounded-sm'>Create Task</span>
          </div>
          <ul className='hidden md:flex flex-row flex-wrap gap-5 text-darkBlue-main font-light items-center'>
            <button
              onClick={() => {
                setOpenChatDrawer(true)
                setNotify(0)
              }}
              className='flex items-center gap-2 bg-white-main px-3 py-1'
            >
              <p className='hover:underline rounded-sm'>{'Office Chat'}</p>
              {notify > 0 && (
                <>
                  <ReactPlayer
                    url='src/assets/tunes/beep.mp3'
                    style={{ display: 'none' }}
                    controls
                    playing={playTune}
                    onEnded={() => setPlayTune(false)}
                  />
                  <span className='w-2 h-2 bg-green-main rounded-full animate-pulse '></span>
                </>
              )}
            </button>
            {headerData?.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline bg-white-main px-3 py-1 rounded-sm'>{x.name}</li>
                </Link>
              )
            })}
            <button className='hover:underline' onClick={handleopenDrawer}>
              <AccountCircleIcon
                sx={{
                  color: theme.palette.mBlack?.main,
                  fontSize: '2rem',
                }}
              />
            </button>
          </ul>
          <div className='flex  items-center md:hidden'>
            <div className='flex items-center'>
              <IconButton onClick={handleOpenDrawerForTask}>
                <AllInboxIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setOpenChatDrawer(true)
                  setNotify(0)
                }}
              >
                <TelegramIcon>
                  {notify > 0 && (
                    <>
                      <ReactPlayer
                        url='src/assets/tunes/beep.mp3'
                        style={{ display: 'none' }}
                        controls
                        playing={playTune}
                        onEnded={() => setPlayTune(false)}
                      />
                      <span className='w-2 h-2 text-white-main font-bold text-xs flex items-center justify-center  bg-green-main rounded-full animate-pulse '></span>
                    </>
                  )}
                </TelegramIcon>
              </IconButton>
              <Link to={'Help'}>
                <HelpOutlineIcon
                  sx={{
                    color: theme.palette.mDarkGray?.main,
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    fontSize: '35px',
                  }}
                />
              </Link>
            </div>
            <IconButton onClick={handleopenDrawer}>
              <AccountCircleIcon
                sx={{
                  color: theme.palette.mDarkGray?.main,
                  fontSize: '30px',
                }}
              />
            </IconButton>
          </div>
        </div>
      </nav>
      <ProfileBar handleClose={handleCloseDrawer} open={openDrawer} />
      <TaskBar handleClose={handleCloseDrawerForTask} open={openDrawerForTask} />
    </>
  )
}

export default Header
