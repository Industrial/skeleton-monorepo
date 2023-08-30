'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'

import { Link } from '@/app/_components/atoms/Link'
import { trpc } from '@/app/_trpc/client'
import { List } from '@/domain'

export type SortableListItemProps = {
  list: List
  onDelete: (list: List) => Promise<void>
}

export const SortableListItem = ({ list, onDelete }: SortableListItemProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: list.id })
  const deleteList = trpc.deleteList.useMutation()

  const handleDelete = async () => {
    await deleteList.mutateAsync({
      id: list.id,
    })
    await onDelete(list)
  }

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
      aria-disabled={deleteList.isLoading}
    >
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
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
