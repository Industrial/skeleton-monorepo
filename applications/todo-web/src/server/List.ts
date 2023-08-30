import { z } from 'zod'

import { keystoneContext } from '@/cms/context'
import { Tag } from '@/domain'
import { publicProcedure } from '@/server/trpc'
import { Maybe } from '@/utils/Maybe'

export const createList = publicProcedure
  .input(
    z.object({
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.List.createOne({
      data: {
        ..._opts.input,
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

export const getLists = publicProcedure.query(async () => {
  const result = await keystoneContext.query.List.findMany()

  return result as Array<Tag>
})

export const updateList = publicProcedure
  .input(
    z.object({
      id: z.string(),
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.List.updateOne({
      where: {
        id: _opts.input.id,
      },
      data: {
        label: _opts.input.label,
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
