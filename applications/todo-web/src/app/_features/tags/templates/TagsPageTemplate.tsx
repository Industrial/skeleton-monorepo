import { Grid, Typography } from '@mui/material'

import { PageContainer } from '@/app/_components/atoms/PageContainer'
import { DefaultLayout } from '@/app/_components/layouts/DefaultLayout'

// TODO: Set title in document
const title = 'Tags'

export const TagsPageTemplate = (): JSX.Element => {
  return (
    <DefaultLayout>
      <PageContainer>
        <Grid container>
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
