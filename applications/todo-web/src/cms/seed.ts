import type { Context } from '.keystone/types'

const users = [
  {
    name: 'Clark',
  },
  {
    name: 'Bruce',
  },
  {
    name: 'Diana',
  },
]

export const seedDemoData = async (context: Context): Promise<void> => {
  if ((await context.db.User.count()) > 0) {
    return
  }

  for (const user of users) {
    await context.db.User.createOne({ data: user })
  }
}
