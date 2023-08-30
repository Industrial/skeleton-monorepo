import { z } from 'zod'

import { keystoneContext } from '@/cms/context'
import { Tag } from '@/domain'
import { publicProcedure } from '@/server/trpc'
import { Maybe } from '@/utils/Maybe'

export const createTag = publicProcedure
  .input(
    z.object({
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Tag.createOne({
      data: {
        ..._opts.input,
      },
    })

    return result as Tag
  })

export const getTag = publicProcedure.input(z.string()).query(async ({ input: id }) => {
  const result = await keystoneContext.query.Tag.findOne({
    where: {
      id,
    },
  })

  return result as Maybe<Tag>
})

export const getTags = publicProcedure.query(async () => {
  const result = await keystoneContext.query.Tag.findMany()

  return result as Array<Tag>
})

export const updateTag = publicProcedure
  .input(
    z.object({
      id: z.string(),
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Tag.updateOne({
      where: {
        id: _opts.input.id,
      },
      data: {
        label: _opts.input.label,
      },
    })

    return result as Tag
  })

export const deleteTag = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Tag.deleteOne({
      where: {
        id: _opts.input.id,
      },
    })

    return result as Tag
  })
