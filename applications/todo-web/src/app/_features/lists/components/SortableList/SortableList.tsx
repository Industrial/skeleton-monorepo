import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import MUIList from '@mui/material/List'
import type { ComponentType } from 'react'
import { useState } from 'react'

import { IdentifiedObject } from '@/utils/IdentifiedObject'
import { LabeledObject } from '@/utils/LabeledObject'

export type ObjectType = IdentifiedObject & LabeledObject & Record<string, unknown>

export type SortableListProps<T> = {
  initialData: Array<T>
  onDragEnd: (newState: Array<T>) => Promise<void>
  listItemOnDelete: (item: T) => Promise<void>
  ListItemComponent: ComponentType<{
    item: T
    onDelete: (item: T) => Promise<void>
  }>
}

export function SortableList<T extends ObjectType>({
  initialData,
  onDragEnd,
  ListItemComponent,
  listItemOnDelete,
}: SortableListProps<T>): JSX.Element {
  const [listState, setListState] = useState(initialData)

  const sensors = useSensors(useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }))

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = listState.findIndex((entry) => entry.id === active.id)
    const newIndex = listState.findIndex((entry) => entry.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const optimisticUIState = arrayMove(listState, oldIndex, newIndex)

    setListState(optimisticUIState)

    await onDragEnd(optimisticUIState)
  }

  return (
    <MUIList>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={listState} strategy={verticalListSortingStrategy}>
          {listState.map((item) => <ListItemComponent key={item.id} item={item} onDelete={listItemOnDelete} />)}
        </SortableContext>
      </DndContext>
    </MUIList>
  )
}
