import { IStoryItem } from './model';
import { StoryListItem } from './StoryListItem';

type Props = {
  storyItems: IStoryItem[];
  activeName?: string;
  onClick: (item: IStoryItem) => void;
};

export const StoryItems = ({ storyItems, activeName, onClick }: Props) => {
  return (
    <>
      {storyItems.map((item) => (
        <StoryListItem key={item.name} active={item.name === activeName} onClick={() => onClick(item)}>
          {item.name}
        </StoryListItem>
      ))}
    </>
  );
};
