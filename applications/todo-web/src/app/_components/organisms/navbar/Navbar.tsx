import CategoryIcon from '@suid/icons-material/Category'
import DashboardIcon from '@suid/icons-material/Dashboard'
import LabelIcon from '@suid/icons-material/Label'
import ListIcon from '@suid/icons-material/List'
import LogoutIcon from '@suid/icons-material/Logout'
import NotesIcon from '@suid/icons-material/Note'
import SettingsIcon from '@suid/icons-material/Settings'
import AppBar from '@suid/material/AppBar'
import Box from '@suid/material/Box'
import Container from '@suid/material/Container'
import Toolbar from '@suid/material/Toolbar'
import type { JSX } from 'solid-js'

import { MenuLink } from '@/utils/navigation'

import { NavbarAccountMenu } from './NavbarAccountMenu'
import { NavbarBurgerMenu } from './NavbarBurgerMenu'
import { NavbarLogo } from './NavbarLogo'
import { NavbarMenu } from './NavbarMenu'

const pages: Array<MenuLink> = [
  {
    label: 'Dashboard',
    url: '/',
    // icon: <DashboardIcon />,
  },
  {
    label: 'Lists',
    url: '/lists',
    // icon: <ListIcon />,
  },
  {
    label: 'Projects',
    url: '/projects',
    // icon: <CategoryIcon />,
  },
  {
    label: 'Tags',
    url: '/tags',
    // icon: <LabelIcon />,
  },
  {
    label: 'Items',
    url: '/items',
    // icon: <NotesIcon />,
  },
]

const settings: Array<MenuLink> = [
  {
    label: 'Settings',
    url: '/settings',
    // icon: <SettingsIcon />,
  },
  {
    label: 'Logout',
    url: '/logout',
    // icon: <LogoutIcon />,
  },
]

export const Navbar = (): JSX.Element => {
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
