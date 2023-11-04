import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/logo.webp'
import SvgIcon from './SvgIcon'
import { headerData } from '../utils/data'
import { Avatar, Box, Divider, Drawer, IconButton, Popper } from '@mui/material'
import img from '@/assets/images/Aspect_Ratio.jpg'
import { theme } from '@/context/ThemeProvider'

interface Props {}

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const Header = ({}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  return (
    <>
      <nav>
        <div className='flex flex-row gap-3 min-[350px]:items-center md:gap-0 '>
          <div className='flex items-center gap-2 flex-1'>
            <img src={Logo} alt='Logo' width={50} height={50} />
            <h1 className='text-3xl text-darkBlue-main font-semibold'>Oopchar</h1>
          </div>
          <ul className='hidden md:flex flex-row flex-wrap gap-5 text-darkBlue-main font-light'>
            {headerData.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline bg-white-main px-3 py-1 rounded-sm'>{x.name}</li>
                </Link>
              )
            })}{' '}
            <span className='underline'>Help</span>
            <button className='hover:underline' onClick={toggleDrawer('right', true)}>
              <SvgIcon iconName='home' />
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
                <SvgIcon iconName='tool-box' />
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
              onClick={toggleDrawer('right', true)}
            >
              <SvgIcon iconName='home' />
            </IconButton>
          </div>
        </div>
      </nav>
      <div>
        <React.Fragment key={'right'}>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            <Box
              sx={{
                width: 380,
                minHeight: '100vh',
                backgroundColor: theme.palette.mLightGray?.main,
              }}
              role='presentation'
            >
              <div className='px-3'>
                <div className='flex justify-between text-darkBlue-main font-light text-[12px] py-2'>
                  <span>Done</span>
                  <span>
                    <Avatar alt='Remy Sharp' src={img} sx={{ height: '60px', width: '60px' }} />
                  </span>
                  <span>Sign out</span>
                </div>
                <div>
                  <h2 className='font-semibold'>Profile</h2>
                  <Divider
                    sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }}
                  />
                  <div className='font-light py-2 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Mobile Number</span>
                      <span className=' text-darkBlue-main '>Edit</span>
                    </div>
                    <div>+91 9823606480</div>
                  </div>
                  <Divider />
                  <div className='font-light py-2 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Email Address</span>
                      <span className=' text-darkBlue-main '>Add New</span>
                    </div>
                    <div>not available</div>
                  </div>
                  <Divider />
                </div>

                <div className='mt-3'>
                  <h2 className='font-semibold'>Communication</h2>
                  <Divider
                    sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }}
                  />
                  <div className='font-light py-2 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Mobile Number</span>
                      <span className=' text-darkBlue-main '>Edit</span>
                    </div>
                    <div>+91 9823606480</div>
                  </div>
                  <Divider />
                  <div className='font-light py-2 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Email Address</span>
                      <span className=' text-darkBlue-main '>Add New</span>
                    </div>
                    <div>not available</div>
                  </div>
                  <Divider />
                  <div className='font-light py-2 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>Preference</span>
                      <span className=' text-darkBlue-main '>Edit</span>
                    </div>
                    <div>Whats App</div>
                  </div>
                  <Divider />
                </div>

                <div className='mt-3'>
                  <h2 className='font-semibold'>Payment Info</h2>
                  <Divider
                    sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }}
                  />
                  <div className='font-light pt-2 pb-5 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>not available</span>
                      <span className=' text-darkBlue-main '>Add new</span>
                    </div>
                  </div>
                  <Divider />
                </div>

                <div className='mt-3'>
                  <h2 className='font-semibold'>Insurance Info</h2>
                  <Divider
                    sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }}
                  />
                  <div className='font-light pt-2 pb-5 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>not available</span>
                      <span className=' text-darkBlue-main '>Add new</span>
                    </div>
                  </div>
                  <Divider />
                </div>

                <div className='mt-3'>
                  <h2 className='font-semibold'>Country</h2>
                  <Divider
                    sx={{ borderBottom: '3px solid', borderColor: theme.palette.mDarkGray?.main }}
                  />
                  <div className='font-light py-2 text-[12px]'>
                    <div className='flex justify-between'>
                      <span className='text-sm'>India</span>
                      <span className=' text-darkBlue-main '>Add new</span>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Drawer>
        </React.Fragment>
      </div>
    </>
  )
}

export default Header
