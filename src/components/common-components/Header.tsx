import { AppBar, Badge, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import Logout from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import TriainaHealth from '@/assets/images/Triaina-Health-New.png'
import theme from '@/theme/defaultTheme'
import OrderSearch from './Order-search'
import PracticeSelect from './Practice-Select'
import { useSidebar } from '@/context/SidebarContext'
import { useAuth } from '@/context/AuthContext'
import { AUTH_PATH, DASHBOARD_PATH, MAIN_PATH } from '@/paths/index'
type Props = {}

const Header = (props: Props) => {
  const nav = useNavigate()
  const { setOpenMenu, openMenu } = useSidebar()
  const { clearStorage } = useAuth()

  return (
    <AppBar color='mWhite'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
          onClick={() => {
            setOpenMenu(true)
          }}
        >
          <MenuIcon sx={{ color: theme.palette.mBlack.main }} />
        </IconButton>
        <img
          src={TriainaHealth}
          width={100}
          height={50}
          className='cursor-pointer mr-4'
          onClick={() => {
            nav('/')
          }}
        />
        <div className='flex items-center justify-between flex-1'>
          <OrderSearch />
          <div className='flex items-center'>
            <PracticeSelect />
            <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={0} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
              <ChatIcon />
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
              onClick={() => {
                clearStorage()
                nav(MAIN_PATH.AUTH.split('/*')[0] + AUTH_PATH.LOGIN)
              }}
            >
              <Logout />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
