import { Button, MenuItem } from '@suid/material'
import type { ButtonProps } from '@suid/material/Button'
import type { MenuItemProps } from '@suid/material/MenuItem'
import type { JSX } from 'solid-js'

export type ButtonMenuItemProps = ButtonProps & MenuItemProps

export const ButtonMenuItem = ({ ...props }: ButtonMenuItemProps): JSX.Element => {
  return <MenuItem component={Button} {...props} />
}
