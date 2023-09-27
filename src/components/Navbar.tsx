import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/logo.webp'
import SvgIcon from './SvgIcon'
import { headerLinks } from '../utils/data'
import { IconButton, Popper } from '@mui/material'
import AuthForm from '../pages/dashboard/container/signIn/auth-form'
interface Props {}

const Navbar = ({}: Props) => {
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
          <div className='flex items-center gap-2 flex-1'>
            <img src={Logo} alt='Logo' width={50} height={50} />
            <h1 className='text-3xl text-darkBlue-main font-semibold'>Oopchar</h1>
          </div>
          <ul className='hidden md:flex  flex-row flex-wrap  gap-5 text-darkBlue-main font-extralight'>
            {headerLinks.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline'> {x.name}</li>
                </Link>
              )
            })}
            <button className='hover:underline' onClick={handleOpenForm}>
              {' '}
              Sign In
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
                padding: 0,
              }}
            >
              <SvgIcon iconName='home' />
            </IconButton>
          </div>
        </div>
      </nav>
      <AuthForm open={openSign} handleClose={handleCloseForm} />
    </>
  )
}

export default Navbar
