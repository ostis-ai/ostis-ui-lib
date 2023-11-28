import { ReactNode, useEffect } from 'react';

import { useStoryHeader } from '../StoryHeader/useStoryHeader';
import { useStorybook } from '../useStorybook';

interface IProps {
  name: string;
  children: ReactNode;
}

export const StoryItem = ({ name, children }: IProps) => {
  const storyHeader = useStoryHeader();

  const { addStoryItem, removeStoryItem } = useStorybook();

  useEffect(() => {
    addStoryItem({ name, children, header: storyHeader?.header });
    return () => {
      removeStoryItem(name);
    };
  }, [addStoryItem, removeStoryItem, children, name, storyHeader?.header]);

  return null;
};
