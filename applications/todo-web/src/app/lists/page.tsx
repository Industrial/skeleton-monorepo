import { serverClient } from '@/app/_trpc/serverClient'

import { ListListPageTemplate } from '../_features/lists/templates/ListListPageTemplate'

export default async (): Promise<JSX.Element> => {
  const lists = await serverClient.getLists()

  return <ListListPageTemplate lists={lists} />
}
