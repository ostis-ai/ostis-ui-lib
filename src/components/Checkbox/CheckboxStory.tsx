import { Grid, GridItem } from '@components/Grid';
import { StoryItem } from '@components/Storybook/StoryItem';

import { Checkbox } from './Checkbox';

export const CheckboxStory = () => (
  <StoryItem path="Checkbox">
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
  </StoryItem>
);
