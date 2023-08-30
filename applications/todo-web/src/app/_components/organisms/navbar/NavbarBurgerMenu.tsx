import MenuIcon from '@suid/icons-material/Menu'
import Box from '@suid/material/Box'
import IconButton from '@suid/material/IconButton'
import Menu from '@suid/material/Menu'
import MenuItem from '@suid/material/MenuItem'
import Typography from '@suid/material/Typography'
import type { JSX } from 'solid-js'
import { createSignal, For } from 'solid-js'
import { useNavigate } from 'solid-start'

import { MenuLink } from '@/utils/navigation'

export const NavbarBurgerMenu = ({ pages }: { pages: Array<MenuLink> }): JSX.Element => {
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
        anchorEl={anchorElement()}
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
        <For each={pages} fallback={<div>Loading...</div>}>
          {(entry) => {
            const { label, url, icon: Icon } = entry

            return (
              <MenuItem
                onClick={() => {
                  navigate(url)
                  handleClose()
                }}
              >
                {Icon && <Icon />}
                <Typography textAlign="center">{label}</Typography>
              </MenuItem>
            )
          }}
        </For>
      </Menu>
    </Box>
  )
}
