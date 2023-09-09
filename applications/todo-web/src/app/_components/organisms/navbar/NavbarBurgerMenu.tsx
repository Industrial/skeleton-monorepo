'use client'

import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useRef } from 'react'

// import { createSignal, For } from 'solid-js'
// import { useNavigate } from 'solid-start'
import { MenuLink } from '@/utils/navigation'

export function NavbarBurgerMenu({ pages }: { pages: Array<MenuLink> }): JSX.Element {
  // const navigate = useNavigate()
  // const [anchorElement, setAnchorElement] = createSignal<HTMLElement | null>(null)
  const anchorElement = useRef<HTMLElement | null>(null)
  const isOpen = () => {
    return Boolean(anchorElement.current)
  }
  const handleOpen = (event: MouseEvent) => {
    // return setAnchorElement(event.currentTarget as HTMLElement)
  }
  const handleClose = () => {
    // return setAnchorElement(null)
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isOpen()}
        onClose={handleClose}
      >
        {pages.map(({ label, url, icon: Icon }) => {
          return (
            <MenuItem
              key={url}
              onClick={() => {
                // navigate(url)
                handleClose()
              }}
            >
              {Icon}
              <Typography textAlign="center">{label}</Typography>
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}
