'use client'

import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import { Fragment, PropsWithChildren } from 'react'

import { Navbar } from '@/app/_components/organisms/navbar'

export function DefaultLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <Fragment>
      <CssBaseline />
      <Box
        sx={(theme) => {
          return {
            height: '100vh',
            backgroundColor: theme.palette.background.default,
          }
        }}
      >
        <Navbar />
        {children}
      </Box>
    </Fragment>
  )
}
