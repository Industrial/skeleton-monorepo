import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LabelIcon from '@mui/icons-material/Label'
import ListIcon from '@mui/icons-material/List'
import LogoutIcon from '@mui/icons-material/Logout'
import NotesIcon from '@mui/icons-material/Note'
import SettingsIcon from '@mui/icons-material/Settings'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import { MenuLink } from '@/utils/navigation'

import { NavbarAccountMenu } from './NavbarAccountMenu'
import { NavbarBurgerMenu } from './NavbarBurgerMenu'
import { NavbarLogo } from './NavbarLogo'
import { NavbarMenu } from './NavbarMenu'

const pages: Array<MenuLink> = [
  {
    label: 'Dashboard',
    url: '/',
    icon: <DashboardIcon />,
  },
  {
    label: 'Lists',
    url: '/lists',
    icon: <ListIcon />,
  },
  {
    label: 'Projects',
    url: '/projects',
    icon: <CategoryIcon />,
  },
  {
    label: 'Tags',
    url: '/tags',
    icon: <LabelIcon />,
  },
  {
    label: 'Items',
    url: '/items',
    icon: <NotesIcon />,
  },
]

const settings: Array<MenuLink> = [
  {
    label: 'Settings',
    url: '/settings',
    icon: <SettingsIcon />,
  },
  {
    label: 'Logout',
    url: '/logout',
    icon: <LogoutIcon />,
  },
]

export function Navbar(): JSX.Element {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box flexGrow={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <NavbarBurgerMenu pages={pages} />
            <Box
              justifyContent="center"
              flexGrow={1}
              sx={{
                display: 'flex',
              }}
            >
              <NavbarLogo variant="large" />
            </Box>
          </Box>
          <Box flexGrow={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavbarLogo variant="small" />
            <Box justifyContent="center" flexGrow={1}>
              <NavbarMenu pages={pages} />
            </Box>
          </Box>
          <NavbarAccountMenu settings={settings} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
