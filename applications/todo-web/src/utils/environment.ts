export const port = (): number => {
  const value = process.env.PORT

  if (value === undefined) {
    return 3000
  }

  return Number(value)
}

export const baseURL = (): string =>
  process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
