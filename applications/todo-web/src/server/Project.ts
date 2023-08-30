import { z } from 'zod'

import { keystoneContext } from '@/cms/context'
import { List } from '@/domain'
import { publicProcedure } from '@/server/trpc'
import { Maybe } from '@/utils/Maybe'

export const createProject = publicProcedure
  .input(
    z.object({
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Project.createOne({
      data: {
        ..._opts.input,
      },
    })

    return result as List
  })

export const getProject = publicProcedure.input(z.string()).query(async ({ input: id }) => {
  const result = await keystoneContext.query.Project.findOne({
    where: {
      id,
    },
  })

  return result as Maybe<List>
})

export const countProjects = publicProcedure.query(async () => {
  const result = await keystoneContext.query.Project.count()
  return result
})

export const getProjects = publicProcedure.query(async () => {
  const result = await keystoneContext.query.Project.findMany()

  return result as Array<List>
})

export const updateProject = publicProcedure
  .input(
    z.object({
      id: z.string(),
      label: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Project.updateOne({
      where: {
        id: _opts.input.id,
      },
      data: {
        label: _opts.input.label,
      },
    })

    return result as List
  })

export const deleteProject = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async (_opts) => {
    const result = await keystoneContext.query.Project.deleteOne({
      where: {
        id: _opts.input.id,
      },
    })

    return result as List
  })
