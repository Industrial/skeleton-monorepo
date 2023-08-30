'use client'

import { Grid, Typography } from '@mui/material'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'

// TODO: Set title in document
const title = 'Settings'

export const SettingsPageTemplate = (): JSX.Element => {
  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </PageContainer>
    </DefaultLayout>
  )
}
