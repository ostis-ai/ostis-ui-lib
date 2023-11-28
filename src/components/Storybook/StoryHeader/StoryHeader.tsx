import { ReactNode } from 'react';

import { StoryHeaderProvider } from './useStoryHeader';

interface IProps {
  header: string;
  children: ReactNode;
}

export const StoryHeader = ({ header, children }: IProps) => {
  return <StoryHeaderProvider header={header}>{children}</StoryHeaderProvider>;
};
