'use client'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { CounterCard } from '@/app/_features/dashboard/components/molecules/CounterCard'

// TODO: Set title in document
const title = 'Dashboard'

export function DashboardPageTemplate({
  listsCount,
  projectsCount,
  tagsCount,
  itemsCount,
}: {
  listsCount: number
  projectsCount: number
  tagsCount: number
  itemsCount: number
}): JSX.Element {
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
