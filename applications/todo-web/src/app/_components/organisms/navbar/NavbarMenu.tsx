import { Box, Button } from '@mui/material'

import { MenuLink } from '@/utils/navigation'

export function NavbarMenu({ pages }: { pages: Array<MenuLink> }): JSX.Element {
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
