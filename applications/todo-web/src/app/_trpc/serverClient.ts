import { httpBatchLink } from '@trpc/client'

import { appRouter } from '@/server'
import { baseURL } from '@/utils/environment'

export const url = `${baseURL()}/api/trpc`

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${baseURL()}/api/trpc`,
    }),
  ],
})
