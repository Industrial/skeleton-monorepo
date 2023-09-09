'use client'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { SortableList } from '@/app/_features/lists/components/SortableList'
import { SortableListItem } from '@/app/_features/lists/components/SortableListItem'
import { trpc } from '@/app/_trpc/client'
import { serverClient } from '@/app/_trpc/serverClient'
import type { ArrayElement } from '@/utils/ArrayElement'
import { IdentifiedObject } from '@/utils/IdentifiedObject'
import { LabeledObject } from '@/utils/LabeledObject'

// TODO: Set title in document
const title = 'Lists'

export type ObjectType = IdentifiedObject & LabeledObject & Record<string, unknown>

export function RenderListItem<T extends ObjectType>({
  item,
  onDelete,
}: {
  item: T
  onDelete: (item: T) => Promise<void>
}): JSX.Element {
  const router = useRouter()
  const deleteList = trpc.deleteList.useMutation()

  return (
    <SortableListItem
      key={item.id}
      item={item}
      onEditClick={async () => {
        router.push(`/lists/${item.id}/edit`)
      }}
      onDeleteClick={async () => {
        await deleteList.mutateAsync({
          id: item.id,
        })
        await onDelete(item)
      }}
    />
  )
}

export function ListListPageTemplate({
  lists,
}: {
  lists: Awaited<ReturnType<(typeof serverClient)['getLists']>>
}): JSX.Element {
  const getLists = trpc.getLists.useQuery(undefined, {
    initialData: lists,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })
  const [listsState, setListsState] = useState(getLists.data)
  const updateList = trpc.updateList.useMutation()

  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12}>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid xs={12}>
            <SortableList<ArrayElement<typeof lists>>
              initialData={listsState}
              ListItemComponent={RenderListItem}
              listItemOnDelete={async (item) => {
                const newListsState = listsState.filter((entry) => entry.id !== item.id)
                setListsState(newListsState)
                await getLists.refetch()
              }}
              onDragEnd={async (newState) => {
                setListsState(newState)

                const newListsState = newState.map((entry, index) => {
                  return {
                    ...entry,
                    sortOrder: index + 1,
                  }
                })

                const changedEntries = newListsState.filter((y, index) => listsState[index].id !== y.id)

                await Promise.all(changedEntries.map(async (entry) => updateList.mutateAsync({
                      id: entry.id,
                      label: entry.label,
                      sortOrder: entry.sortOrder,
                    })))

                await getLists.refetch()
              }}
            />
          </Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
