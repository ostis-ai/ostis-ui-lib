import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ active?: boolean }>`
  padding: 4px;
  font-size: 14px;
  cursor: pointer;

  border-radius: 4px;

  &:hover {
    background: rgba(30, 167, 253, 0.07);
  }

  ${({ active }) =>
    active &&
    css`
      cursor: text;
      color: rgb(255, 255, 255);
      background: rgb(30, 167, 253);
      &:hover {
        color: rgb(255, 255, 255);
        background: rgb(30, 167, 253);
      }
    `}
`;

interface IProps {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
}

export const StoryListItem = ({ children, active, onClick }: IProps) => (
  <Wrapper active={active} onClick={onClick}>
    {children}
  </Wrapper>
);
