import { Container } from '@suid/material'
import type { JSX } from 'solid-js'

export const PageContainer = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: {
          xs: 1,
          sm: 2,
          md: 4,
        },
      }}
    >
      {children}
    </Container>
  )
}
