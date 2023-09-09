import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/server'

const handler = async (req: Request): Promise<Response> => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => {
      return {}
    },
  })

  return response
}

export const GET = handler
export const POST = handler
