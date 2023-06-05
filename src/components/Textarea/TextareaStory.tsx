import { StoryItem } from '@components/Storybook/StoryItem';

import { Textarea } from './Textarea';

export const TextareaStory = () => {
  return (
    <StoryItem path="Textarea">
      <Textarea />
      <Textarea status="error" />
    </StoryItem>
  );
};
