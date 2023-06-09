import { createContext, PropsWithChildren, useContext } from 'react';
import { ScClient } from 'ts-sc-client';

interface IContext {
  client: ScClient;
}

const ScClientContext = createContext<IContext>({} as IContext);

export const useClient = () => useContext(ScClientContext).client;

export const ClientProvider = ({ children, ...rest }: PropsWithChildren<IContext>) => {
  return <ScClientContext.Provider value={rest}>{children}</ScClientContext.Provider>;
};
