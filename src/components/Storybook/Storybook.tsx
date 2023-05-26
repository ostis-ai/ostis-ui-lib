import { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';

import { IStoryItem } from './model';
import { StoryListItem } from './StoryListItem';
import { StorybookProvider } from './useStorybook';

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  flex-shrink: 0;
  background-color: #fff;
  border-right: 1px solid #ececec;
  padding: 20px;
  height: 100vh;
  overflow: auto;
`;

const Right = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
  overflow: auto;
`;

interface IProps {
  children: ReactNode;
}

export const Storybook = ({ children }: IProps) => {
  const [activeItem, setActiveItem] = useState<IStoryItem | null>(null);
  const [storyItems, setStoryItems] = useState<IStoryItem[]>([]);

  const addStoryItem = useCallback((item: IStoryItem) => {
    setStoryItems((prev) => [...prev, item]);
  }, []);

  const removeStoryItem = useCallback((path: string) => {
    setStoryItems((prev) => prev.filter((item) => item.path !== path));
  }, []);

  const targetActiveItem = activeItem || storyItems[0];

  return (
    <StorybookProvider addStoryItem={addStoryItem} removeStoryItem={removeStoryItem}>
      <Wrapper>
        <Left>
          {storyItems.map((item) => (
            <StoryListItem
              key={item.path}
              active={item.path === targetActiveItem?.path}
              onClick={() => setActiveItem(item)}
            >
              {item.path}
            </StoryListItem>
          ))}
        </Left>
        <Right>{targetActiveItem?.children}</Right>
      </Wrapper>
      {children}
    </StorybookProvider>
  );
};
