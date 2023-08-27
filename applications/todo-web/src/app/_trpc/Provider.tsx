'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { trpc } from '@/app/_trpc/client'

const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [queryClient] = useState(() => {
    return new QueryClient({})
  })

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    })
  })

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default Provider
