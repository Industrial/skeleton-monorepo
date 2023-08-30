import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useFetcher } from '@remix-run/react'
import MUIList from '@suid/material/List'
import Typography from '@suid/material/Typography'
import Grid from '@suid/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import type { JSX } from 'solid-js'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { List } from '@/domain'
import { SortableListItem } from '@/features/lists/components/SortableListItem'

// TODO: Set title in document
const title = 'Lists'

export const ListListPageTemplate = ({ lists }: { lists: Array<List> }): JSX.Element => {
  const [listsState, setListsState] = useState(lists)
  const fetcher = useFetcher()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      const data = fetcher.data as Array<List>
      const newState = listsState
        .map((entry) => {
          const newEntry = data.find((x) => {
            return x.id === entry.id
          })
          if (newEntry) {
            return newEntry
          }
          return entry
        })
        .sort((a, b) => {
          return a.sort - b.sort
        })
      setListsState(newState)
    }
  }, [fetcher])

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
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
        sort: index + 1,
      }
    })

    const changedEntries = newListsState.filter((y, index) => {
      return listsState[index].id !== y.id
    })

    fetcher.submit(
      {
        data: JSON.stringify(changedEntries),
      },
      {
        method: 'put',
      },
    )
  }

  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12}>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid xs={12}>
            <fetcher.Form method="post">
              <MUIList>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={listsState} strategy={verticalListSortingStrategy}>
                    {listsState.map((entry) => {
                      return <SortableListItem key={entry.id} list={entry} />
                    })}
                  </SortableContext>
                </DndContext>
              </MUIList>
            </fetcher.Form>
          </Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
