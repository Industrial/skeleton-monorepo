'use client'

import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import MUIList from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { SortableListItem } from '@/app/_features/lists/components/SortableListItem'
import { trpc } from '@/app/_trpc/client'
import { serverClient } from '@/app/_trpc/serverClient'

// TODO: Set title in document
const title = 'Lists'

export const ListListPageTemplate = ({
  lists,
}: {
  lists: Awaited<ReturnType<(typeof serverClient)['getLists']>>
}): JSX.Element => {
  const getLists = trpc.getLists.useQuery(undefined, {
    initialData: lists,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const updateList = trpc.updateList.useMutation()

  const [listsState, setListsState] = useState(getLists.data)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = listsState.findIndex((entry) => {
      return entry.id === active.id
    })
    const newIndex = listsState.findIndex((entry) => {
      return entry.id === over.id
    })

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const optimisticUIState = arrayMove(listsState, oldIndex, newIndex)

    setListsState(optimisticUIState)

    const newListsState = optimisticUIState.map((entry, index) => {
      return {
        ...entry,
        sortOrder: index + 1,
      }
    })

    const changedEntries = newListsState.filter((y, index) => {
      return listsState[index].id !== y.id
    })

    await Promise.all(
      changedEntries.map(async (entry) => {
        return updateList.mutateAsync({
          id: entry.id,
          label: entry.label,
          sortOrder: entry.sortOrder,
        })
      }),
    )
    await getLists.refetch()
  }

  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12}>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid xs={12}>
            <MUIList>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={listsState} strategy={verticalListSortingStrategy}>
                  {listsState.map((entry) => {
                    return <SortableListItem key={entry.id} list={entry} />
                  })}
                </SortableContext>
              </DndContext>
            </MUIList>
          </Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
