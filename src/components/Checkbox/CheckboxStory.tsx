import { Grid, GridItem } from '@components/Grid';

import { Checkbox } from './Checkbox';

export const CheckboxStory = () => (
  <Grid>
    <GridItem>
      <Checkbox />
    </GridItem>
    <GridItem>
      <Checkbox disabled />
    </GridItem>
    <GridItem>
      <Checkbox checked />
    </GridItem>
    <GridItem>
      <Checkbox disabled checked />
    </GridItem>
  </Grid>
);
