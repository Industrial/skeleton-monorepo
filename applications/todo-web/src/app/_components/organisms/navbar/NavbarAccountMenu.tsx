import Avatar from '@suid/material/Avatar'
import Box from '@suid/material/Box'
import IconButton from '@suid/material/IconButton'
import Menu from '@suid/material/Menu'
import MenuItem from '@suid/material/MenuItem'
import Typography from '@suid/material/Typography'
import type { JSX } from 'solid-js'
import { createSignal, For } from 'solid-js'
import { useNavigate } from 'solid-start'

import { MenuLink } from '@/utils/navigation'

export const NavbarAccountMenu = ({ settings }: { settings: Array<MenuLink> }): JSX.Element => {
  const navigate = useNavigate()
  const [anchorElement, setAnchorElement] = createSignal<HTMLElement | null>(null)
  const isOpen = () => {
    return Boolean(anchorElement())
  }
  const handleOpen = (event: MouseEvent) => {
    return setAnchorElement(event.currentTarget as HTMLElement)
  }
  const handleClose = () => {
    return setAnchorElement(null)
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
        anchorEl={anchorElement()}
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
        <For each={settings} fallback={<div>Loading...</div>}>
          {(setting) => {
            const { label, url, icon: Icon } = setting

            return (
              <MenuItem
                onClick={() => {
                  navigate(url)
                  handleClose()
                }}
              >
                <Typography textAlign="center">
                  {Icon && <Icon />}
                  {label}
                </Typography>
              </MenuItem>
            )
          }}
        </For>
      </Menu>
    </Box>
  )
}
