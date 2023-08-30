import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { checkbox, integer, relationship, text, timestamp } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

const sortable = {
  sort: integer({
    validation: {
      isRequired: true,
    },
  }),
}

const dateStamped = {
  createdAt: timestamp({
    defaultValue: {
      kind: 'now',
    },
    validation: {
      isRequired: true,
    },
  }),
  updatedAt: timestamp({
    defaultValue: {
      kind: 'now',
    },
    validation: {
      isRequired: true,
    },
  }),
}

const labeled = {
  label: text({
    validation: {
      isRequired: true,
    },
  }),
}

export const lists: Lists = {
  Item: list({
    access: allowAll,
    fields: {
      // ...sortable,
      ...dateStamped,
      ...labeled,
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
      // ...sortable,
      ...dateStamped,
      ...labeled,
      items: relationship({
        ref: 'Item',
        many: true,
      }),
    },
  }),

  Project: list({
    access: allowAll,
    fields: {
      // ...sortable,
      ...dateStamped,
      ...labeled,
      items: relationship({
        ref: 'Item',
        many: true,
      }),
    },
  }),

  Tag: list({
    access: allowAll,
    fields: {
      // ...sortable,
      ...dateStamped,
      ...labeled,
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
