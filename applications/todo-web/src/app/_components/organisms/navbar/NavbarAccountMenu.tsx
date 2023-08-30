'use client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useRef } from 'react'

// import { createSignal, For } from 'solid-js'
// import { useNavigate } from 'solid-start'
import { MenuLink } from '@/utils/navigation'

export const NavbarAccountMenu = ({ settings }: { settings: Array<MenuLink> }): JSX.Element => {
  // const navigate = useNavigate()
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
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        title="Account settings"
        onClick={handleOpen}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={isOpen() ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen() ? 'true' : undefined}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorElement.current}
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen()}
        onClose={handleClose}
      >
        {settings.map((entry) => {
          const { label, url, icon: Icon } = entry

          return (
            <MenuItem
              key={url}
              onClick={() => {
                // navigate(url)
                handleClose()
              }}
            >
              <Typography textAlign="center">
                {Icon}
                {label}
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}
