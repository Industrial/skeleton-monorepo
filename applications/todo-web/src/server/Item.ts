import { z } from 'zod'

import { keystoneContext } from '@/cms/context'
import { Item } from '@/domain'
import { publicProcedure } from '@/server/trpc'
import { Maybe } from '@/utils/Maybe'

export const createItem = publicProcedure
  .input(
    z.object({
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Item.createOne({
      data: {
        ..._opts.input,
      },
    })

    return result as Item
  })

export const getItem = publicProcedure.input(z.string()).query(async ({ input: id }) => {
  const result = await keystoneContext.query.Item.findOne({
    where: {
      id,
    },
  })

  return result as Maybe<Item>
})

export const countItems = publicProcedure.query(async () => {
  const result = await keystoneContext.query.Item.count()
  return result
})

export const getItems = publicProcedure.query(async () => {
  const result = await keystoneContext.query.Item.findMany({
    query: 'id createdAt updatedAt label complete list { id label } project { id label } tags { id label }',
  })

  return result as Array<Item>
})

export const updateItem = publicProcedure
  .input(
    z.object({
      id: z.string(),
      label: z.string(),
      complete: z.boolean(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Item.updateOne({
      where: {
        id: _opts.input.id,
      },
      data: {
        label: _opts.input.label,
        complete: _opts.input.complete,
      },
    })

    return result as Item
  })

export const deleteItem = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Item.deleteOne({
      where: {
        id: _opts.input.id,
      },
    })

    return result as Item
  })
