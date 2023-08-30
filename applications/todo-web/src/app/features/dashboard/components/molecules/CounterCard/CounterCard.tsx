import { Card, CardContent, Link, Typography } from '@suid/material'
import type { JSX } from 'solid-js'

export type CounterCardProps = {
  count: number
  label: string
  href: string
}

export const CounterCard = ({ count, label, href }: CounterCardProps): JSX.Element => {
  return (
    <Link
      href={href}
      sx={{
        textDecoration: 'none',
      }}
    >
      <Card>
        <CardContent
          sx={{
            textAlign: 'center',
            textDecoration: 'none',
          }}
        >
          <Typography variant="h4">{count}</Typography>
          <Typography variant="body2">{label}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
