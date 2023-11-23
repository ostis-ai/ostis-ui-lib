import { BrowserRouter } from 'react-router-dom';
import { ButtonStory } from '@components/Button/ButtonStory';
import { CheckboxStory } from '@components/Checkbox/CheckboxStory';
import { ChipStory } from '@components/Chip/ChipStory';
import { DropdownStory } from '@components/Dropdown/DropdownStory';
import { InputStory } from '@components/Input/InputStory';
import { InputV2Story } from '@components/InputV2/InputV2Story';
import { NotificationStory } from '@components/Notification/NotificationStory';
import { PopupStory } from '@components/Popup/PopupStory';
import { ScnStory } from '@components/Scn/ScnStory';
import { SelectStory } from '@components/Select/SelectStory';
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
    <BrowserRouter>
      <ThemeProvider theme={defaultLight}>
        <Global />
        <Storybook>
          <SelectStory />
          <ButtonStory />
          <InputStory />
          <TextareaStory />
          <CheckboxStory />
          <SwitchScgScnStory />
          <TooltipStory />
          <SpinnerStory />
          <ChipStory />
          <SkeletonStory />
          <DropdownStory />
          <PopupStory />
          <NotificationStory />
          <ScnStory />
        </Storybook>
      </ThemeProvider>
    </BrowserRouter>
  );
};
