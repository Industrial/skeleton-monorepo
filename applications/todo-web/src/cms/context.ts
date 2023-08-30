import { getContext } from '@keystone-6/core/context'

import config from '../../keystone'
import { Context } from '.keystone/types'
import * as PrismaModule from '.myprisma/client'

// Making sure multiple prisma clients are not created during hot reloading
// @ts-expect-error globalThis
export const keystoneContext: Context = globalThis.keystoneContext || getContext(config, PrismaModule)

if (process.env.NODE_ENV !== 'production') {
  // @ts-expect-error globalThis
  globalThis.keystoneContext = keystoneContext
}
