'use client'

import { useState } from 'react'

import { trpc } from '@/app/_trpc/client'
import { serverClient } from '@/app/_trpc/serverClient'

const ItemList = ({
  initialItems,
}: {
  initialItems: Awaited<ReturnType<(typeof serverClient)['getItems']>>
}): JSX.Element => {
  const getItems = trpc.getItems.useQuery(undefined, {
    initialData: initialItems,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const addItem = trpc.createItem.useMutation({
    onSettled: async () => {
      await getItems.refetch()
    },
  })
  const updateItem = trpc.updateItem.useMutation({
    onSettled: async () => {
      await getItems.refetch()
    },
  })

  const [label, setlabel] = useState('')

  return (
    <div>
      <div className="text-black my-5 text-3xl">
        {getItems.data.map((item) => {
          return (
            <div key={item.id} className="flex gap-3 items-center">
              <input
                id={`check-${item.id}`}
                type="checkbox"
                checked={Boolean(item.complete)}
                style={{ zoom: 1.5 }}
                onChange={async () => {
                  updateItem.mutate({
                    id: item.id,
                    label: item.label,
                    complete: !item.complete,
                  })
                }}
              />
              <label htmlFor={`check-${item.id}`}>{item.label}</label>
            </div>
          )
        })}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="label">label</label>
        <input
          id="label"
          value={label}
          onChange={(e) => {
            setlabel(e.target.value)
          }}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          onClick={async () => {
            if (label.length) {
              addItem.mutate({ label })
              setlabel('')
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Item
        </button>
      </div>
    </div>
  )
}

export default ItemList
