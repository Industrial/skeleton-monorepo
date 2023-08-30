import { z } from 'zod'

import { keystoneContext } from '@/cms/context'
import { Tag } from '@/domain'
import { publicProcedure } from '@/server/trpc'
import { Maybe } from '@/utils/Maybe'

export const createList = publicProcedure
  .input(
    z.object({
      label: z.string(),
      sortOrder: z.optional(z.number()),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.List.createOne({
      data: {
        label: _opts.input.label,
        updatedAt: new Date(),
        sortOrder: _opts.input.sortOrder,
      },
    })

    return result as Tag
  })

export const getList = publicProcedure.input(z.string()).query(async ({ input: id }) => {
  const result = await keystoneContext.query.List.findOne({
    where: {
      id,
    },
  })

  return result as Maybe<Tag>
})

export const countLists = publicProcedure.query(async () => {
  const result = await keystoneContext.query.List.count()
  return result
})

export const getLists = publicProcedure.query(async () => {
  const result = await keystoneContext.query.List.findMany({
    query: 'id label sortOrder createdAt updatedAt',
    orderBy: {
      sortOrder: 'asc',
    },
  })

  return result as Array<Tag>
})

export const updateList = publicProcedure
  .input(
    z.object({
      id: z.string(),
      label: z.string(),
      sortOrder: z.number(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.List.updateOne({
      where: {
        id: _opts.input.id,
      },
      data: {
        label: _opts.input.label,
        updatedAt: new Date(),
        sortOrder: _opts.input.sortOrder,
      },
    })

    return result as Tag
  })

export const deleteList = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.List.deleteOne({
      where: {
        id: _opts.input.id,
      },
    })

    return result as Tag
  })
