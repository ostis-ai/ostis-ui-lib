import { useState } from 'react';

import { SwitchViewMode, TScLanguageTab } from './SwitchViewMode';

export const SwitchViewModeStory = () => {
  const [tab, setTab] = useState<TScLanguageTab>('scn');

  return <SwitchViewMode tab={tab} onTabClick={setTab} />;
};
