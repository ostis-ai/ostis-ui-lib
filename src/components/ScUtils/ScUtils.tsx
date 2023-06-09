import { createContext, ReactNode, useContext } from 'react';
import { useClient } from '@components/ClientProvider';
import { TFindKeynodes } from '@utils/findKeynodes';

import { scUtilsBuilder } from './scUtilsBuilder';

type TScUtilsContext = Omit<ReturnType<typeof scUtilsBuilder>, 'findKeynodes'> & {
  findKeynodes: TFindKeynodes;
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
