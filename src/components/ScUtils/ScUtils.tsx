import { createContext, ReactNode, useContext } from 'react';
import { useClient } from '@components/ClientProvider';
import { TsearchKeynodes } from '@utils/searchKeynodes';

import { scUtilsBuilder } from './scUtilsBuilder';

type TScUtilsContext = Omit<ReturnType<typeof scUtilsBuilder>, 'searchKeynodes'> & {
  searchKeynodes: TsearchKeynodes;
};

const ScUtilsContext = createContext<TScUtilsContext>({} as TScUtilsContext);

export const useScUtils = () => useContext(ScUtilsContext);

interface IProps {
  children: ReactNode;
}

export const ScUtilsProvider = ({ children }: IProps) => {
  const client = useClient();

  return <ScUtilsContext.Provider value={scUtilsBuilder({ client })}>{children}</ScUtilsContext.Provider>;
};
