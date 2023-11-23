import { Checkbox } from '@components/Checkbox';
import { DropdownOption } from '@components/DropdownOption';
import styled, { css } from 'styled-components';

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px;
  pointer-events: none;
  flex-shrink: 0;
`;

export const StyledDropdownOption = styled(DropdownOption)<{
  $disabled: boolean;
  $selected: boolean;
  $active: boolean;
}>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      cursor: text;
    `}

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: #e6e8fd;
      &:hover {
        background-color: #dee1fe;
      }
    `}

  ${({ $active }) =>
    $active &&
    css`
      background-color: #f8f8f8;
    `}
`;
