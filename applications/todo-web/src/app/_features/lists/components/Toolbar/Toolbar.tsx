'use client'

import { Button } from '@mui/material'

export function Toolbar(): JSX.Element {
  return (
    <div>
      <Button color="primary">Add</Button>
      <Button color="secondary">Delete</Button>
    </div>
  )
}
