import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DeleteIcon from '@suid/icons-material/Delete'
import DragIndicatorIcon from '@suid/icons-material/DragIndicator'
import IconButton from '@suid/material/IconButton'
import ListItem from '@suid/material/ListItem'
import ListItemIcon from '@suid/material/ListItemIcon'
import ListItemText from '@suid/material/ListItemText'
import Paper from '@suid/material/Paper'

import { Link } from '@/app/_components/atoms/Link'
import { List } from '@/domain'

export const SortableListItem = ({ list }: { list: List }): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: list.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Paper
      ref={setNodeRef}
      sx={(theme) => {
        return {
          mt: theme.spacing(1),
          mb: theme.spacing(1),
        }
      }}
      style={style}
    >
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemIcon>
          <DragIndicatorIcon
            {...attributes}
            {...listeners}
            sx={(theme) => {
              return {
                '&:hover': {
                  cursor: 'pointer',
                },
              }
            }}
          />
        </ListItemIcon>
        <Link href={`/lists/${list.id}`} linkVariant="no-decoration">
          <ListItemText>{list.label}</ListItemText>
        </Link>
      </ListItem>
    </Paper>
  )
}
