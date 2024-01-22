import styled, { css } from 'styled-components';

import { TSize } from './model';

export const Wrapper = styled.button<{ $size: TSize }>`
  display: flex;
  align-items: center;
  justify-content: center;

  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;

  background: #fff;

  flex-shrink: 0;
  box-sizing: border-box;

  &:hover {
    background-color: #ebebeb;
  }

  &:active {
    box-shadow: inset 0 0 0 2px #dadada;
  }

  &:disabled {
    opacity: 0.5;
    background-color: #ebebeb;

    pointer-events: none;
  }

  /* Sizes */
  ${(props) =>
    props.$size === 's' &&
    css`
      width: 24px;
      height: 24px;

      border-radius: 4px;

      &:active {
        border: 1px solid #dadada;
      }
    `}

  ${(props) =>
    props.$size === 'm' &&
    css`
      width: 36px;
      height: 36px;

      padding: 6px;
      border-radius: 8px;
    `}
  
	${(props) =>
    props.$size === 'l' &&
    css`
      width: 42px;
      height: 42px;
      padding: 9px;

      border-radius: 10px;
    `}
  
	${(props) =>
    props.$size === 'xl' &&
    css`
      width: 48px;
      height: 48px;
      padding: 12px;

      border-radius: 10px;
    `}
`;
