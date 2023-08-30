import { router } from '@/server/trpc'

import * as Item from './Item'
import * as List from './List'
import * as Project from './Project'
import * as Tag from './Tag'

export const appRouter = router({
  ...List,
  ...Item,
  ...Project,
  ...Tag,
})

export type AppRouter = typeof appRouter
