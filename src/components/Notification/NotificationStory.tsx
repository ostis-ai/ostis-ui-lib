import { StoryItem } from '@components/Storybook/StoryItem';

import Notification from "./Notification"

export const NotificationStory = () => (
  <StoryItem path="Notification">
    <Notification type='warning' title='Warning!' text='Message for the user' />
  </StoryItem>
);
