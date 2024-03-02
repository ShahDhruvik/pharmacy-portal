import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/new-logo.png'
import { headerLinks } from '../utils/data'
import { IconButton, Popper } from '@mui/material'
import AuthForm from '../pages/dashboard/container/auth-forms/auth-form'
import HomeIcon from '@mui/icons-material/Home'
import { theme } from '@/context/ThemeProvider'

interface Props {}

const Navbar = ({}: Props) => {
  const nav = useNavigate()

  const [openSign, setOpenSign] = useState(false)
  const handleOpenForm = () => setOpenSign(true)
  const handleCloseForm = () => setOpenSign(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  return (
    <>
      <nav>
        <div className='flex flex-row gap-3 min-[350px]:items-center md:gap-0 '>
          <div className='flex items-center gap-2 flex-1 flex-wrap'>
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
            <h1 className='text-3xl text-black-main font-semibold'>Oopchar</h1>
            <span className='text-lg text-black-main font-semibold'>
              EasyWeb: Patient Self-care
            </span>
          </div>
          <ul className='hidden md:flex  flex-row flex-wrap  gap-5 text-darkBlue-main font-extralight'>
            {headerLinks?.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline text-darkGray-main font-medium'> {x.name}</li>
                </Link>
              )
            })}
            <button
              className='hover:underline p-1 bg-darkGray-main rounded-full h-6 aspect-square flex items-center justify-center'
              onClick={handleOpenForm}
            >
              <HomeIcon sx={{ color: theme.palette.mWhite?.main, fontSize: '15px', p: 0 }} />
            </button>
            {/* <Link to={`${MAIN_PATH.AUTH.split('/*')[0]}${AUTH_PATH.LOGOUT}`}>Logout</Link> */}
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
                    {headerLinks.map((x) => {
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
                padding: 1,
                border: 1,
                borderRadius: '100%',
                bgcolor: theme.palette.mDarkGray?.main,
                borderColor: theme.palette.mDarkGray?.main,
              }}
            >
              <HomeIcon />
            </IconButton>
          </div>
        </div>
      </nav>
      <AuthForm open={openSign} handleClose={handleCloseForm} isAssesstment={false} />
    </>
  )
}

export default Navbar
