import { Dropdown } from '@components/Dropdown';
import { InputStatus } from '@model/input';
import styled, { css, DefaultTheme } from 'styled-components';

import OpenStatusButton from './chevronDown.svg';

const getSelectValueHeight = (multiple?: boolean) => (multiple ? '32px' : '26px');

type BorderColorProps = {
  status?: InputStatus;
  disabled?: boolean;
  hovered?: boolean;
  theme: DefaultTheme;
};

const getBorderColor = ({ status, hovered, disabled, theme }: BorderColorProps) => {
  if (status === 'error' && hovered) return theme.select.colors.borderError;
  if (status === 'error' && !hovered) return theme.select.colors.borderErrorHover;

  if (disabled) return theme.select.colors.borderDisabled;

  if (hovered) return theme.select.colors.borderHover;

  return theme.select.colors.borderInitial;
};

export const SelectWrapper = styled.div<{
  $focused: boolean;
  $disabled: boolean;
  $multiple: boolean;
  $status?: InputStatus;
}>`
  width: 100%;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  cursor: pointer;

  position: relative;
  padding: ${({ $multiple }) => ($multiple ? '0 15px 0 7px' : '4px 15px')};

  min-height: ${({ theme }) => theme.select.size.initialHeight};

  background: ${({ theme }) => theme.select.colors.initialBackgroundColor};
  border: ${({ theme }) => theme.select.size.borderWidth} solid
    ${({ $disabled, $status, $focused, theme }) =>
      getBorderColor({ theme, status: $status, disabled: $disabled, hovered: $focused })};
  border-radius: ${({ theme }) => theme.select.borderRadius};

  font-family: ${({ theme }) => theme.select.font.fontFamily};
  font-style: normal;
  font-weight: ${({ theme }) => theme.select.font.fontWeight};
  font-size: ${({ theme }) => theme.select.font.fontSize};
  line-height: ${({ theme }) => theme.select.font.lineHeight};

  color: ${({ theme }) => theme.select.colors.text};

  &::placeholder {
    font-weight: ${({ theme }) => theme.select.font.placeholderWeight};
    color: ${({ theme }) => theme.select.colors.placeholder};
  }

  &:hover {
    border-color: ${({ $disabled, $status, theme }) =>
      getBorderColor({ theme, status: $status, disabled: $disabled, hovered: true })};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: #fafafa;
      color: #737373;

      pointer-events: none;
      cursor: text;
    `}
`;

export const Hidden = styled.div`
  position: absolute;

  width: 0;
  height: 0;

  opacity: 0;

  overflow: hidden;
  pointer-events: none;
`;

export const NativeSelect = styled.select`
  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  border: none;
  pointer-events: none;
`;

export const IconsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-right: 8px;
`;

export const ValueWrapper = styled.div<{ $fixHeight: boolean; $multiple: boolean }>`
  display: flex;
  flex-wrap: ${({ $fixHeight }) => ($fixHeight ? 'unset' : 'wrap')};
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;

  overflow: hidden;
  align-items: center;

  /* In multiple select state padding is spicified in ValueWrapper because browser zooming cause Intersection observer wrong work */
  padding: ${({ $multiple }) => ($multiple ? '4px 0' : 'unset')};

  ${({ $fixHeight, $multiple }) =>
    $fixHeight &&
    css`
      height: ${getSelectValueHeight($multiple)};
    `}
`;

export const Input = styled.input<{ $multiple: boolean }>`
  box-sizing: border-box;

  flex: 1 1 auto;

  width: 100px;
  padding: 0;
  background: transparent;

  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  text-overflow: ellipsis;

  color: inherit;

  border: none;
  outline: none;
  appearance: none;
  height: ${({ $multiple }) => getSelectValueHeight($multiple)};
`;

export const StyledOpenStatusButton = styled(OpenStatusButton)<{ $opened: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: rotate(0);

  cursor: pointer;

  ${({ $opened }) =>
    $opened &&
    css`
      transform: rotate(180deg);
    `}
`;

export const IconClose = styled.div`
  flex-shrink: 0;

  border-radius: 50%;
  padding: 5px;

  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
`;

export const IconPanel = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  align-items: center;

  margin-left: 8px;
`;

export const StyledDropdown = styled(Dropdown)`
  padding: 8px 0;

  max-height: 256px;
  overflow: auto;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  option {
    display: none;
  }
`;

// This one is needed to show ... when value is too big
export const StringValueWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
