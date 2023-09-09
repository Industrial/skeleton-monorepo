import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function NavbarLogo({ variant }: { variant: 'large' | 'small' }): JSX.Element {
  return (
    <Box
      alignItems="center"
      sx={{
        display: 'flex',
      }}
    >
      <CheckCircleIcon
        sx={{
          marginRight: (theme) => {
            return theme.spacing(1)
          },
        }}
      />
      <Typography
        variant={variant === 'large' ? 'h5' : 'h6'}
        noWrap
        component="a"
        href="/"
        sx={{
          marginRight: (theme) => {
            return theme.spacing(2)
          },
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',

          ...(variant === 'large' && {
            letterSpacing: '0.7rem',
          }),

          ...(variant === 'small' && {
            letterSpacing: '0.3rem',
          }),
        }}
      >
        TODO
      </Typography>
    </Box>
  )
}
