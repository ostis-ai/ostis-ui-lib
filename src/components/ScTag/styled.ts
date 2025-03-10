import { Dropdown } from '@components/Dropdown';
import { DropdownOption } from '@components/DropdownOption';
import styled, { css } from 'styled-components';

import FixIcon from './FixIcon.svg';

export const StyledDropdown = styled(Dropdown)`
  width: 600px;
  max-height: 380px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  padding: 8px 0;

  overflow: auto;
`;

export const StyledDropdownOption = styled(DropdownOption)<{ $isLoad?: boolean }>`
  &:hover {
    background-color: #f5f5f5;
  }

  ${(props) =>
    props.$isLoad &&
    css`
      display: flex;
      align-items: center;
      
      gap: 8px;
    `}
`;

export const StyledIcon = styled(FixIcon)`
  margin-right: 5px;
`;
