import { BrowserRouter } from 'react-router-dom';
import { ButtonStory } from '@components/Button/ButtonStory';
import { CheckboxStory } from '@components/Checkbox/CheckboxStory';
import { ChipStory } from '@components/Chip/ChipStory';
import { DropdownStory } from '@components/Dropdown/DropdownStory';
import { InputStory } from '@components/Input/InputStory';
import { LanguageProvider } from '@components/Language';
import { NotificationStory } from '@components/Notification/NotificationStory';
import { PopupStory } from '@components/Popup/PopupStory';
import { ScnStory } from '@components/Scn/ScnStory';
import {
  AsyncMultipleSelectStory,
  AsyncSingleSelectStory,
  CustomChipsStory,
  MultiSearchSelectStory,
  SearchSelectStory,
  SelectPlaygroundStory,
  SelectWithCustomOptionsStory,
  SimpleMultiSelectStory,
  SimpleSelectStory,
} from '@components/Select/SelectStory';
import { SkeletonStory } from '@components/Skeleton/story/SkeletonStory';
import { SpinnerStory } from '@components/Spinner/SpinnerStory';
import { Storybook } from '@components/Storybook';
import { StoryHeader } from '@components/Storybook/StoryHeader';
import { StoryItem } from '@components/Storybook/StoryItem';
import { SwitchScgScnStory } from '@components/SwitchScgScn/SwitchScgScnStory';
import { TextareaStory } from '@components/Textarea/TextareaStory';
import { TooltipStory } from '@components/Tooltip/TooltipStory';
import { defaultLightTheme } from '@constants/theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const Global = createGlobalStyle`
  body {
    font-family: Roboto;
  }
`;

export const StorybookInit = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultLightTheme}>
        <LanguageProvider defaultLanguage="en">
          <Global />
          <Storybook>
            <StoryHeader header="Select">
              <StoryItem name="Select Playground">
                <SelectPlaygroundStory />
              </StoryItem>
              <StoryItem name="Simple select">
                <SimpleSelectStory />
              </StoryItem>
              <StoryItem name="Select with search">
                <SearchSelectStory />
              </StoryItem>
              <StoryItem name="Select with custom options">
                <SelectWithCustomOptionsStory />
              </StoryItem>
              <StoryItem name="Simple multiselect">
                <SimpleMultiSelectStory />
              </StoryItem>
              <StoryItem name="MultiSelect with search">
                <MultiSearchSelectStory />
              </StoryItem>
              <StoryItem name="Custom chips">
                <CustomChipsStory />
              </StoryItem>
              <StoryItem name="Async single select">
                <AsyncSingleSelectStory />
              </StoryItem>
              <StoryItem name="Async miltiple select">
                <AsyncMultipleSelectStory />
              </StoryItem>
            </StoryHeader>
            <StoryItem name="Button">
              <ButtonStory />
            </StoryItem>
            <StoryItem name="Input">
              <InputStory />
            </StoryItem>
            <StoryItem name="Textarea">
              <TextareaStory />
            </StoryItem>
            <StoryItem name="Checkbox">
              <CheckboxStory />
            </StoryItem>
            <StoryItem name="SwitchScgScn">
              <SwitchScgScnStory />
            </StoryItem>
            <StoryItem name="Tooltip">
              <TooltipStory />
            </StoryItem>
            <StoryItem name="Spinner">
              <SpinnerStory />
            </StoryItem>
            <StoryItem name="Chip">
              <ChipStory />
            </StoryItem>
            <StoryItem name="Skeleton">
              <SkeletonStory />
            </StoryItem>
            <StoryItem name="Dropdown">
              <DropdownStory />
            </StoryItem>
            <StoryItem name="Popup">
              <PopupStory />
            </StoryItem>
            <StoryItem name="Notification">
              <NotificationStory />
            </StoryItem>
            <StoryItem name="Scn">
              <ScnStory />
            </StoryItem>
          </Storybook>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
