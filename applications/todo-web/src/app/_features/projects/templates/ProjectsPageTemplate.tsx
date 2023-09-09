'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { CounterCard } from '@/app/_features/dashboard/components/molecules/CounterCard'

// TODO: Set title in document
const title = 'Projects'

export function ProjectsPageTemplate(): JSX.Element {
  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12} item>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={1} label="Lists" href="/lists" />
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={2} label="Projects" href="/projects" />
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={3} label="Tags" href="/tags" />
          </Grid>
          <Grid xs={12} sm={6} lg={3} item>
            <CounterCard count={4} label="Items" href="/items" />
          </Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
