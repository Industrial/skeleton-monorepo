import { Box, Button } from '@suid/material'
import type { JSX } from 'solid-js'

import { MenuLink } from '@/utils/navigation'

export const NavbarMenu = ({ pages }: { pages: Array<MenuLink> }): JSX.Element => {
  return (
    <Box>
      {pages.map((page) => {
        const { label, url, icon } = page

        return (
          <Button
            component="button"
            href={url}
            sx={{
              marginTop: (theme) => {
                return theme.spacing(2)
              },
              marginBottom: (theme) => {
                return theme.spacing(2)
              },
              color: 'white',
            }}
            startIcon={icon}
          >
            {label}
          </Button>
        )
      })}
    </Box>
  )
}
