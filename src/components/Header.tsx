/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/new-logo.png'
import { headerData } from '../utils/data'
import { Avatar, Box, Divider, Drawer, IconButton, Popper } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ProfileBar from '../pages/profile/Profilebar'
import HomeIcon from '@mui/icons-material/Home'
import TaskBar from '@/pages/task-bar/task-bar'
import { useChat } from '@/context/ChatContext'
import socket from '@/socket/socket'
import { SOCKET_STRING } from '@/socket/socket-string'

interface Props {}

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Header = ({}: Props) => {
  const { openChatDrawer, setOpenChatDrawer, currentUser, setNotify, notify } = useChat()

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
  }
  const handleopenDrawer = () => {
    setOpenDrawer(true)
  }
  const handleCloseDrawerForTask = () => {
    setOpenDrawerForTask(false)
  }
  const handleOpenDrawerForTask = () => {
    setOpenDrawerForTask(true)
  }
  useEffect(() => {
    const handleListUpdate = (userId: string[]) => {
      if (currentUser) {
        console.log(userId.includes(String(currentUser?.internalId)) && !openChatDrawer)
        if (userId.includes(String(currentUser?.internalId)) && !openChatDrawer) {
          setNotify(true)
        } else {
          setNotify(false)
        }
      }
    }
    socket.on(SOCKET_STRING.PRACTICE_OFFICE_NOTIFY, handleListUpdate)
    return () => {
      socket.off(SOCKET_STRING.PRACTICE_OFFICE_NOTIFY, handleListUpdate)
    }
  }, [socket, currentUser, openChatDrawer])
  return (
    <>
      <nav>
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
              className='cursor-pointer'
            />
            <h1 className='text-3xl text-darkBlue-main font-semibold'>Oopchar</h1>
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
                setNotify(false)
              }}
              className='flex items-center gap-2 bg-white-main px-3 py-1'
            >
              <p className='hover:underline   rounded-sm'>{'Office Chat'}</p>
              {notify && (
                <span className='w-2 h-2 bg-green-main rounded-full animate-pulse '></span>
              )}
            </button>
            {headerData?.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline bg-white-main px-3 py-1 rounded-sm'>{x.name}</li>
                </Link>
              )
            })}
            <a
              href={`https://help.oopchar.com`}
              target='_blank'
              className='hover:underline bg-white-main px-3 py-1 rounded-sm'
            >
              <span>Help</span>
            </a>
            <button className='hover:underline' onClick={handleopenDrawer}>
              <AccountCircleIcon
                sx={{
                  color: theme.palette.mBlack?.main,
                  fontSize: '2rem',
                }}
              />
            </button>
          </ul>
          <div className='flex  items-center gap-1 md:hidden'>
            <div>
              <IconButton
                aria-describedby={id}
                type='button'
                onClick={handleClick}
                sx={{
                  minWidth: 'max-content',
                  padding: 0,
                }}
              >
                <HomeIcon />
              </IconButton>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                className='md:hidden '
                placement='bottom-end'
                sx={{
                  minWidth: 'max-content',
                }}
              >
                <div className='bg-white drop-shadow-xl p-5 rounded-lg border-black border-[1px] border-opacity-20 mt-2'>
                  <ul className='flex flex-col  gap-5 text-darkBlue-main font-extralight'>
                    {headerData?.map((x) => {
                      return (
                        <Link to={x.path} key={x.id} onClick={handleClick}>
                          <li> {x.name}</li>
                        </Link>
                      )
                    })}
                  </ul>
                </div>
              </Popper>
            </div>
            <IconButton
              sx={{
                minWidth: 'max-content',
                padding: 0,
              }}
            >
              <HomeIcon />
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
