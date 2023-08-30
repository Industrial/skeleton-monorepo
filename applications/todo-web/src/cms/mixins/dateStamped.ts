import { timestamp } from '@keystone-6/core/fields'

export const createdAt = timestamp({
  defaultValue: {
    kind: 'now',
  },
  validation: {
    isRequired: true,
  },
})

export const updatedAt = timestamp({
  defaultValue: {
    kind: 'now',
  },
  validation: {
    isRequired: true,
  },
})
