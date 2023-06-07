import styled, { css } from 'styled-components';

import { TSize } from './Chip';

export const Wrapper = styled.div<{ disabled?: boolean; size: TSize; hasCloseIcon: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  width: fit-content;
  max-width: 190px;
  border-radius: 8px;
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  color: #454545;
  &:hover {
    background-color: #f4faf6;
  }
  ${(props) =>
    props.size === 'l' &&
    css`
      height: 29px;
      gap: 9px;
    `}
  ${(props) =>
    props.disabled &&
    css`
      color: #a6a6a6;
      border: 1px solid #ffffff;
      pointer-events: none;
    `}
  ${(props) =>
    props.size === 'l' &&
    props.hasCloseIcon &&
    css`
      height: 32px;
    `}
`;

export const Text = styled.div<{ size: TSize }>`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  max-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${(props) =>
    props.size === 'l' &&
    css`
      font-size: 18px;
      line-height: 21px;
    `}
`;

export const Icon = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #ececec;
  }
`;
