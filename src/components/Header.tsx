import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/logo.webp'
import { headerData } from '../utils/data'
import { Avatar, Box, Divider, Drawer, IconButton, Popper } from '@mui/material'
import img from '@/assets/images/Aspect_Ratio.jpg'
import { theme } from '@/context/ThemeProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ProfileBar from '../pages/profile/Profilebar'
import HomeIcon from '@mui/icons-material/Home'

interface Props {}

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Header = ({}: Props) => {
  //Mobile  pop-up
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleopenDrawer = () => {
    setOpenDrawer(true)
  }
  return (
    <>
      <nav>
        <div className='flex flex-row gap-3 min-[350px]:items-center md:gap-0 '>
          <div className='flex items-center gap-2 flex-1'>
            <img src={Logo} alt='Logo' width={50} height={50} />
            <h1 className='text-3xl text-darkBlue-main font-semibold'>Oopchar</h1>
          </div>
          <ul className='hidden md:flex flex-row flex-wrap gap-5 text-darkBlue-main font-light items-center'>
            {headerData.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline bg-white-main px-3 py-1 rounded-sm'>{x.name}</li>
                </Link>
              )
            })}
            <span className='underline'>Help</span>
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
                    {headerData.map((x) => {
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
    </>
  )
}

export default Header
