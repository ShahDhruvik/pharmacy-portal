import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/TH.png'
import Text from '../assets/images/Triaina-Health-New.png'
import { headerLinks } from '../utils/data'
import { useMediaQuery } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

interface Props {}

const Navbar = ({}: Props) => {
  const nav = useNavigate()

  const [openSign, setOpenSign] = useState(false)
  const [signType, setSignType] = useState<any>([])

  const handleOpenForm = () => setOpenSign(true)
  const handleCloseForm = () => setOpenSign(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(408))
  const isMobile = useMediaQuery(theme.breakpoints.down(768))
  return (
    <>
      <nav className='sticky top-0 z-40 bg-white-main'>
        <div className='flex flex-row gap-3 md:items-center items-start md:gap-0 '>
          <div className={`flex items-center ${isSmallScreen ? '' : 'gap-2'} flex-1 flex-wrap`}>
            <img
              src={Logo}
              alt='Logo'
              width={40}
              height={40}
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
            <div
              className={`${
                isSmallScreen ? 'text-base' : 'text-xl'
              } text-black-main font-semibold flex gap-1 ml-1`}
            >
              <span className='md:block hidden'>EasyWeb: </span>
              Provider Self-care
            </div>
          </div>
          <ul className='hidden md:flex flex-row flex-wrap gap-5 text-darkBlue-main font-extralight'>
            {headerLinks?.map((x) => {
              return (
                <Link to={x.path} key={x.id}>
                  <li className='hover:underline text-darkGray-main font-medium'>{x?.name}</li>
                </Link>
              )
            })}
            <button
              className='hover:underline p-1 text-darkGray-main rounded-full h-6 aspect-square flex items-center justify-center'
              onClick={() => {}}
            >
              <LockOpenIcon />
            </button>
          </ul>
          <div className='flex items-center gap-1 md:hidden md:pt-0 pt-1'>
            {/* <div>
              <IconButton
                aria-describedby={id}
                type='button'
                onClick={handleClick}
                sx={{
                  minWidth: 'max-content',
                  padding: 0,
                }}
              >
              </IconButton>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                className='md:hidden z-50'
                placement='bottom-end'
                sx={{
                  minWidth: 'max-content',
                }}
              >
                <div className='bg-white-main shadow-2xl p-5 rounded-lg mt-2'>
                  <ul className='flex flex-col gap-5 text-darkBlue-main font-medium'>
                    {headerLinks?.map((x) => {
                      return (
                        <Link to={x.path} key={x.id} onClick={handleClick}>
                          <li> {x.name}</li>
                        </Link>
                      )
                    })}
                  </ul>
                </div>
              </Popper>
            </div> */}
            <div className='flex items-center gap-5'>
              <Link to={'Help'}>
                <HelpOutlineIcon sx={{ color: theme.palette.mDarkGray?.main }} />
              </Link>
            </div>
            <button
              className='hover:underline p-1 text-darkGray-main rounded-full h-8 aspect-square flex items-center justify-center'
              onClick={() => {}}
            >
              <LockOpenIcon />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
