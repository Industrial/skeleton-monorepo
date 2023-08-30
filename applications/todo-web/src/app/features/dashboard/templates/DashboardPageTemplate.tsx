import { Typography } from '@suid/material'
import Grid from '@suid/material/Grid'
import type { JSX } from 'solid-js'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { CounterCard } from '@/features/dashboard/components/molecules/CounterCard'

// TODO: Set title in document
const title = 'Dashboard'

export const DashboardPageTemplate = ({
  listsCount,
  projectsCount,
  tagsCount,
  itemsCount,
}: {
  listsCount: number
  projectsCount: number
  tagsCount: number
  itemsCount: number
}): JSX.Element => {
  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12} item>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={listsCount} label="Lists" href="/lists" />
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={projectsCount} label="Projects" href="/projects" />
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={tagsCount} label="Tags" href="/tags" />
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={itemsCount} label="Items" href="/items" />
          </Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
