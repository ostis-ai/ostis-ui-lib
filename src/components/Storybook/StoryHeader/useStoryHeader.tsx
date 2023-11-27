import { createContext, PropsWithChildren, useContext } from 'react';

type TStoryHeaderContext = {
  header: string;
};

const StoryHeaderContext = createContext<TStoryHeaderContext | null>(null);

export const useStoryHeader = () => useContext(StoryHeaderContext);

export const StoryHeaderProvider = ({ children, ...restProps }: PropsWithChildren<TStoryHeaderContext>) => (
  <StoryHeaderContext.Provider value={restProps}>{children}</StoryHeaderContext.Provider>
);
