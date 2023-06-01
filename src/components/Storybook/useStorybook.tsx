import { createContext, PropsWithChildren, useContext } from 'react';

import { IStorybookContext } from './model';

const noop = () => void 0;

const StorybookContext = createContext<IStorybookContext>({
  addStoryItem: noop,
  removeStoryItem: noop,
});

export const useStorybook = () => useContext(StorybookContext);

export const StorybookProvider = ({ children, ...restProps }: PropsWithChildren<IStorybookContext>) => (
  <StorybookContext.Provider value={restProps}>{children}</StorybookContext.Provider>
);
