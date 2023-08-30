import Box from '@suid/material/Box'
import type { JSX } from 'solid-js'

import { Navbar } from '@/app/_components/organisms/navbar'

export const DefaultLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: (theme) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          return theme.palette.background.default
        },
      }}
    >
      <Navbar />
      {children}
    </Box>
  )
}
