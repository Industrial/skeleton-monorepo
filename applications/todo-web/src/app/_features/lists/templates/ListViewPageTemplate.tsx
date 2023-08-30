'use client'

import { mkCounter } from '@code9/todo-ui/dist'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'
import { List } from '@/domain'

export const ListViewPageTemplate = ({ list }: { list: List }): JSX.Element => {
  console.log(mkCounter)
  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12}>top</Grid>
          <Grid xs={12}>bottom</Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12}>
            <Typography variant="h3">{list.label}</Typography>
          </Grid>
          <Grid xs={12}>{list.label}</Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
