'use client'

import { Grid, Typography } from '@mui/material'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'

// TODO: Set title in document
const title = 'Items'

export function ItemsPageTemplate(): JSX.Element {
  return (
    <DefaultLayout>
      <PageContainer>
        <Grid xs={12}>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
