import { ReactNode, useEffect } from 'react';

import { useStorybook } from '../useStorybook';

interface IProps {
  path: string;
  children: ReactNode;
}

export const StoryItem = ({ path, children }: IProps) => {
  const { addStoryItem, removeStoryItem } = useStorybook();

  useEffect(() => {
    addStoryItem({ path, children });
    return () => {
      removeStoryItem(path);
    };
  }, [addStoryItem, removeStoryItem, children, path]);

  return null;
};
