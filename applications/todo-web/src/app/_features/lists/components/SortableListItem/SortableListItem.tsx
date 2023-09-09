'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import { ListItemSecondaryAction } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'

import { Link } from '@/app/_components/atoms/Link'
import { IdentifiedObject } from '@/utils/IdentifiedObject'
import { LabeledObject } from '@/utils/LabeledObject'

export type ObjectType = IdentifiedObject & LabeledObject & Record<string, unknown>

export type SortableListItemProps<T> = {
  item: T
  onEditClick: (item: T) => Promise<void>
  onDeleteClick: (item: T) => Promise<void>
}

export function SortableListItem<T extends ObjectType>({
  item,
  onEditClick,
  onDeleteClick,
}: SortableListItemProps<T>): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const handleEditClick = async () => {
    await onEditClick(item)
  }

  const handleDeleteClick = async () => {
    await onDeleteClick(item)
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
    >
      <ListItem>
        <ListItemIcon>
          <DragIndicatorIcon
            {...attributes}
            {...listeners}
            sx={(_theme) => {
              return {
                '&:hover': {
                  cursor: 'pointer',
                },
              }
            }}
          />
        </ListItemIcon>
        <Link href={`/lists/${item.id}`} linkVariant="no-decoration">
          <ListItemText>{item.label}</ListItemText>
        </Link>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  )
}
