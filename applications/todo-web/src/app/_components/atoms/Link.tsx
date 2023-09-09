import type { LinkProps as MUILinkProps } from '@mui/material'
import { Link as MUILink } from '@mui/material'

export type LinkProps = MUILinkProps & {
  linkVariant: 'no-decoration' | 'underline'
}

export function Link({ href, children, linkVariant = 'underline', ...props }: LinkProps): JSX.Element {
  return (
    <MUILink
      href={href}
      {...props}
      sx={(theme) => {
        return {
          color: linkVariant === 'no-decoration' ? theme.palette.text.primary : theme.palette.primary.main,
          textDecoration: linkVariant === 'no-decoration' ? 'none' : 'underline',
        }
      }}
    >
      {children}
    </MUILink>
  )
}
