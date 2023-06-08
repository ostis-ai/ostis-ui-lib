import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';

import { TLanguage } from './types';

interface ILangContext {
  lang: TLanguage;
  setLang: Dispatch<SetStateAction<TLanguage>>;
}

const LanguageContext = createContext<ILangContext>({} as ILangContext);

export const useLanguage = () => {
  const { lang } = useContext(LanguageContext);

  return lang;
};

export const useLanguageContext = () => useContext(LanguageContext);

interface IProps {
  defaultLanguage: TLanguage;
}

export const LanguageProvider = ({ children, defaultLanguage }: PropsWithChildren<IProps>) => {
  const [lang, setLang] = useState(defaultLanguage);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
