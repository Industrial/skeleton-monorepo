import { integer } from '@keystone-6/core/fields'

export const sortOrder = integer({
  validation: {
    isRequired: false,
  },
  hooks: {
    resolveInput: async ({ listKey, fieldKey, operation, item, inputData, context }) => {
      const getLastSortOrder = async (): Promise<number | undefined> => {
        const result = await context.query[listKey].findMany({
          query: 'sortOrder',
          where: {
            ...(item
              ? {
                  NOT: [
                    {
                      id: {
                        equals: item.id,
                      },
                    },
                  ],
                }
              : {}),
          },
          orderBy: {
            [fieldKey]: 'desc',
          },
          skip: 0,
          take: 1,
        })

        return result.length > 0 ? result[0].sortOrder : undefined
      }

      // Create
      if (operation === 'create') {
        const lastSortOrder = await getLastSortOrder()
        if (lastSortOrder === undefined) {
          return 1
        }
        return lastSortOrder + 1
      }

      // Update
      const currentSortOrder: number | undefined = inputData.sortOrder
      if (currentSortOrder === undefined) {
        const lastSortOrder = await getLastSortOrder()
        if (lastSortOrder === undefined) {
          return 1
        }
        return lastSortOrder
      }
      return currentSortOrder
    },
  },
})
