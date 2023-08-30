import { NextResponse } from 'next/server'

import { corsMiddleware } from '@/middleware/cors'

export const middleware = (): NextResponse => {
  const response = NextResponse.next()

  corsMiddleware(response)

  return response
}
