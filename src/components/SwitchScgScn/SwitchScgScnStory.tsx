import { useState } from 'react';

import { SwitchScgScn, TScLanguageTab } from './SwitchScgScn';

export const SwitchScgScnStory = () => {
  const [tab, setTab] = useState<TScLanguageTab>('scn');

  return <SwitchScgScn tab={tab} onTabClick={setTab} />;
};
