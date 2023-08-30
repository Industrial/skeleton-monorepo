import { DashboardPageTemplate } from '@/app/_features/dashboard/templates/DashboardPageTemplate'
import { serverClient } from '@/app/_trpc/serverClient'

export default async (): Promise<JSX.Element> => {
  const [listsCount, projectsCount, tagsCount, itemsCount] = await Promise.all([
    serverClient.countLists(),
    serverClient.countProjects(),
    serverClient.countTags(),
    serverClient.countItems(),
  ])

  return (
    <DashboardPageTemplate
      listsCount={listsCount}
      projectsCount={projectsCount}
      tagsCount={tagsCount}
      itemsCount={itemsCount}
    />
  )
}
