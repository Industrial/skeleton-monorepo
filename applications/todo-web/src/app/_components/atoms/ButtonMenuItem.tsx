import { Button, MenuItem } from '@mui/material'
import type { ButtonProps } from '@mui/material/Button'
import type { MenuItemProps } from '@mui/material/MenuItem'
export type ButtonMenuItemProps = ButtonProps & MenuItemProps

export const ButtonMenuItem = ({ ...props }: ButtonMenuItemProps): JSX.Element => {
  return <MenuItem component={Button} {...props} />
}
