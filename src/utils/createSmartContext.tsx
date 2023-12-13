import { createContext, PropsWithChildren, useContext as useReactContext } from 'react';

export const createSmartContext = <T extends Record<string, unknown>>(props: T) => {
  const Context = createContext<T>(props);

  const Provider = ({ children, ...restContext }: PropsWithChildren<T>) => {
    return <Context.Provider value={restContext as T}>{children}</Context.Provider>;
  };

  const useContext = () => useReactContext(Context);

  return [Provider, useContext] as const;
};
