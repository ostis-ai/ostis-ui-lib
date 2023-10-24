import { createContext, PropsWithChildren, useContext } from 'react';

import { IContext } from './model';

const ContextMenuContext = createContext<IContext>({} as IContext);

export const useContextMenu = () => useContext(ContextMenuContext);

export const ContextMenuProvider = ({ children, ...rest }: PropsWithChildren<IContext>) => {
  return <ContextMenuContext.Provider value={rest}>{children}</ContextMenuContext.Provider>;
};
