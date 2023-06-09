import { ChipStory } from '@components/Chip/ChipStory';
import { DropdownStory } from '@components/Dropdown/DropdownStory';
import { PopupStory } from '@components/Popup/PopupStory';
import { SkeletonStory } from '@components/Skeleton/story/SkeletonStory';
import { SpinnerStory } from '@components/Spinner/SpinnerStory';
import { Storybook } from '@components/Storybook';
import { SwitchScgScnStory } from '@components/SwitchScgScn/SwitchScgScnStory';
import { TextareaStory } from '@components/Textarea/TextareaStory';
import { TooltipStory } from '@components/Tooltip/TooltipStory';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
    font-family: Roboto;
  }
`;

export const StorybookInit = () => {
  return (
    <>
      <Global />
      <Storybook>
        <SwitchScgScnStory />
        <TooltipStory />
        <SpinnerStory />
        <ChipStory />
        <SkeletonStory />
        <TextareaStory />
        <DropdownStory />
        <PopupStory />
      </Storybook>
    </>
  );
};
