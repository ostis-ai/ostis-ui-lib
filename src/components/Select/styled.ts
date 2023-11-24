import { Dropdown } from '@components/Dropdown';
import { InputStatus } from '@model/input';
import styled, { css } from 'styled-components';

import OpenStatusButton from './chevronDown.svg';

const getSelectValueHeight = (multiple?: boolean) => (multiple ? '32px' : '26px');

type BorderColorProps = {
  status?: InputStatus;
  disabled?: boolean;
  hovered?: boolean;
};

const getBorderColor = (props: BorderColorProps) => {
  const { status, hovered, disabled } = props;
  if (status === 'error') return '#EC7575';

  if (disabled) return '#eeeeee';

  if (hovered) return '#5D8FEF';

  return '#EBEBEB';
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

  min-height: 42px;

  background: #ffffff;
  border: 1px solid
    ${({ $disabled, $status, $focused }) => getBorderColor({ status: $status, disabled: $disabled, hovered: $focused })};
  border-radius: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #323232;

  &::placeholder {
    font-weight: 300;
    color: #737373;
  }

  &:hover {
    border-color: ${({ $disabled, $status }) =>
      getBorderColor({ status: $status, disabled: $disabled, hovered: true })};
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

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-overflow: ellipsis;

  color: #323232;

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

export const StringValueWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #323232;
`;
