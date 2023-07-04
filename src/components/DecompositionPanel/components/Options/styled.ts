import { ButtonWithIcon } from '@components/ButtonWithIcon';
import styled from 'styled-components';

export const Wrap = styled.div`
  position: absolute;
  top: 100%;
  right: 0;

  min-width: 185px;

  background: #ffffff;

  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  z-index: 2;
`;

export const StyledButtonWithIcon = styled(ButtonWithIcon)`
  width: 100%;

  padding: 8px 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  font-size: 18px;
  line-height: 20px;

  text-align: left;
  white-space: nowrap;

  &:hover {
    background: #ececec;
  }

  &:last-child {
    border-bottom: none;
  }
`;
