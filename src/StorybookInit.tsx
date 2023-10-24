import { ButtonStory } from '@components/Button/ButtonStory';
import { ChipStory } from '@components/Chip/ChipStory';
import { DropdownStory } from '@components/Dropdown/DropdownStory';
import { InputStory } from '@components/Input/InputStory';
import { InputV2Story } from '@components/InputV2/InputV2Story';
import { NotificationStory } from '@components/Notification/NotificationStory';
import { PopupStory } from '@components/Popup/PopupStory';
import { ScnStory } from '@components/Scn/ScnStory';
import { SkeletonStory } from '@components/Skeleton/story/SkeletonStory';
import { SpinnerStory } from '@components/Spinner/SpinnerStory';
import { Storybook } from '@components/Storybook';
import { SwitchScgScnStory } from '@components/SwitchScgScn/SwitchScgScnStory';
import { TextareaStory } from '@components/Textarea/TextareaStory';
import { TooltipStory } from '@components/Tooltip/TooltipStory';
import { defaultLight } from '@constants/theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const Global = createGlobalStyle`
  body {
    font-family: Roboto;
  }
`;

export const StorybookInit = () => {
  return (
    <ThemeProvider theme={defaultLight}>
      <Global />
      <Storybook>
        <ButtonStory />
        <InputStory />
        <InputV2Story />
        <SwitchScgScnStory />
        <TooltipStory />
        <SpinnerStory />
        <ChipStory />
        <SkeletonStory />
        <TextareaStory />
        <DropdownStory />
        <PopupStory />
        <NotificationStory />
        <ScnStory />
      </Storybook>
    </ThemeProvider>
  );
};
