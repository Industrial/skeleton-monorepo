'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { trpc } from '@/app/_trpc/client'
import { baseURL } from '@/utils/environment'

export default function Provider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient({}))

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseURL()}/api/trpc`,
        }),
      ],
    }))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
