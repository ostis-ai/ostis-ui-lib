import { useState } from 'react';
import { StoryItem } from '@components/Storybook/StoryItem';

import { SwitchScgScn, TScLanguageTab } from './SwitchScgScn';

const Controlled = () => {
  const [tab, setTab] = useState<TScLanguageTab>('scn');

  return <SwitchScgScn tab={tab} onTabClick={setTab} />;
};

export const SwitchScgScnStory = () => (
  <StoryItem path="SwitchScgScn">
    <Controlled />
  </StoryItem>
);
