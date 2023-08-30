import { config } from '@keystone-6/core'

// Can't use tsconfig alias here
import { lists } from './src/cms/schema'
import { seedDemoData } from './src/cms/seed'
import type { Context } from '.keystone/types'

export default config({
  db: {
    provider: 'sqlite',
    // next.js requires an absolute path for sqlite
    url: `file:${process.cwd()}/keystone.db`,
    onConnect: async (context: Context) => {
      await seedDemoData(context)
    },

    // WARNING: this is only needed for our monorepo examples, dont do this
    prismaClientPath: 'node_modules/.myprisma/client',
  },
  ui: {
    basePath: '/admin',
  },
  lists,
})
