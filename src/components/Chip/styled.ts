import styled, { css } from 'styled-components';

import { TChipSize } from './types';

export const Wrapper = styled.div<{ $disabled?: boolean; $size: TChipSize; $hasCloseIcon: boolean }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 4px;
  padding: ${({ $hasCloseIcon }) => ($hasCloseIcon ? '3px 3px 3px 7px' : '3px 7px')};
  width: fit-content;
  max-width: 190px;
  border-radius: 8px;
  border: 1px solid #5d8fef;
  background-color: #ffffff;

  color: #454545;

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: #a6a6a6;
      border: 1px solid #ffffff;
      pointer-events: none;
    `}
`;

export const Text = styled.div<{ size: TChipSize }>`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  max-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Icon = styled.div<{ $disabled?: boolean }>`
  flex-shrink: 0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
    path: {
      fill: #959595;
    }
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      background-color: #fff;
      background-color: #ececec;
      path: {
        fill: #c7c7c7;
      }
    `}
`;
