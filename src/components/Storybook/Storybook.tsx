import { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';

import { IStoryItem } from './model';
import { StoryItems } from './StoryItems';
import { ContentWithHeader } from './StoryListItem/Header';
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
    setStoryItems((prev) => prev.filter((item) => item.name !== path));
  }, []);

  const targetActiveItem = activeItem || storyItems[0];

  const grouped = storyItems.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.header || '_empty']: [...(acc[curr.header || '_empty'] || []), curr],
    };
  }, {} as Record<string, IStoryItem[]>);

  return (
    <StorybookProvider addStoryItem={addStoryItem} removeStoryItem={removeStoryItem}>
      <Wrapper>
        <Left>
          {Object.entries(grouped).map(([header, items]) => {
            if (header === '_empty') {
              return (
                <StoryItems
                  key={header}
                  storyItems={items}
                  activeName={targetActiveItem?.name}
                  onClick={setActiveItem}
                />
              );
            }
            return (
              <ContentWithHeader header={header} key={header}>
                <StoryItems storyItems={items} activeName={targetActiveItem?.name} onClick={setActiveItem} />
              </ContentWithHeader>
            );
          })}
        </Left>
        <Right>{targetActiveItem?.children}</Right>
      </Wrapper>
      {children}
    </StorybookProvider>
  );
};
