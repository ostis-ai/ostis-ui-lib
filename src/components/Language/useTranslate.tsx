import { useCallback } from 'react';

import { TTexts } from './types';
import { useLanguage } from './useLanguage';

export const useTranslate = () => {
  const lang = useLanguage();

  return useCallback((texts: TTexts) => texts[lang], [lang]);
};
