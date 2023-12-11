import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
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
  box-sizing: border-box;
`;

const Right = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
`;

interface IProps {
  children: ReactNode;
}

export const Storybook = ({ children }: IProps) => {
  const [params] = useSearchParams();
  const activeItemName = params.get('activeItem');
  const [storyItems, setStoryItems] = useState<IStoryItem[]>([]);

  const navigate = useNavigate();

  const addStoryItem = useCallback((item: IStoryItem) => {
    setStoryItems((prev) => [...prev, item]);
  }, []);

  const removeStoryItem = useCallback((path: string) => {
    setStoryItems((prev) => prev.filter((item) => item.name !== path));
  }, []);

  const activeItem = storyItems.find((item) => item.name === activeItemName);

  const grouped = storyItems.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.header || '_empty']: [...(acc[curr.header || '_empty'] || []), curr],
    };
  }, {} as Record<string, IStoryItem[]>);

  const goToItem = useCallback(
    (activeItem: string) => {
      navigate({
        pathname: '/',
        search: createSearchParams({ activeItem }).toString(),
      });
    },
    [navigate],
  );

  const onItemClick = useCallback(
    (item: IStoryItem) => {
      goToItem(item.name);
    },
    [goToItem],
  );

  useEffect(() => {
    const firstItem = storyItems[0];
    if (!firstItem) return;
    if (activeItem && activeItemName) return;

    goToItem(firstItem.name);
  }, [activeItem, activeItemName, goToItem, storyItems]);

  return (
    <StorybookProvider addStoryItem={addStoryItem} removeStoryItem={removeStoryItem}>
      <Wrapper>
        <Left>
          {Object.entries(grouped).map(([header, items]) => {
            if (header === '_empty') {
              return <StoryItems key={header} storyItems={items} activeName={activeItem?.name} onClick={onItemClick} />;
            }
            return (
              <ContentWithHeader header={header} key={header}>
                <StoryItems storyItems={items} activeName={activeItem?.name} onClick={onItemClick} />
              </ContentWithHeader>
            );
          })}
        </Left>
        <Right>{activeItem?.children}</Right>
      </Wrapper>
      {children}
    </StorybookProvider>
  );
};
