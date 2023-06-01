import { StoryItem } from '@components/Storybook/StoryItem';

import { Tooltip } from './Tooltip';

export const TooltipStory = () => (
  <StoryItem path="Tooltip">
    <Tooltip title="I am a tooltip" placement="bottom-start">
      Hover on me
    </Tooltip>
  </StoryItem>
);
