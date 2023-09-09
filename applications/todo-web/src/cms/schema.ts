import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { checkbox, relationship, text, timestamp } from '@keystone-6/core/fields'

import * as dateStamped from './mixins/dateStamped'
import * as labeled from './mixins/labeled'
import * as sortable from './mixins/sortable'
import type { Lists } from '.keystone/types'

export const lists: Lists = {
  Item: list({
    access: allowAll,
    fields: {
      ...labeled,
      ...sortable,
      ...dateStamped,
      complete: checkbox({
        defaultValue: false,
      }),
      list: relationship({
        ref: 'List',
      }),
      project: relationship({
        ref: 'Project',
      }),
      tags: relationship({
        ref: 'Tag',
        many: true,
      }),
    },
  }),

  List: list({
    access: allowAll,
    fields: {
      ...labeled,
      ...sortable,
      ...dateStamped,
      items: relationship({
        ref: 'Item',
        many: true,
      }),
    },
  }),

  Project: list({
    access: allowAll,
    fields: {
      ...labeled,
      ...sortable,
      ...dateStamped,
      items: relationship({
        ref: 'Item',
        many: true,
      }),
    },
  }),

  Tag: list({
    access: allowAll,
    fields: {
      ...labeled,
      // ...sortable,
      ...dateStamped,
      items: relationship({
        ref: 'Item',
        many: true,
      }),
    },
  }),

  User: list({
    // WARNING
    //   for this example, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true } }),
      about: text(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
}
