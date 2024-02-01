import styled, { css } from 'styled-components';

import { TSize } from './model';

export const Wrapper = styled.button<{ $size: TSize }>`
  display: flex;
  align-items: center;
  justify-content: center;

  outline: none;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.iconButton.borderRadius};

  background-color: ${({ theme }) => theme.iconButton.colors.background};

  flex-shrink: 0;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.iconButton.colors.backgroundHover};
  }

  &:active {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.iconButton.colors.borderActive};
  }

  &:disabled {
    opacity: 0.5;
    background-color: ${({ theme }) => theme.iconButton.colors.backgroundDisabled};

    pointer-events: none;
  }

  /* Sizes */
  ${(props) =>
    props.$size === 's' &&
    css`
      width: ${({ theme }) => theme.iconButton.size.small.width};
      height: ${({ theme }) => theme.iconButton.size.small.height};

      border-radius: ${({ theme }) => theme.iconButton.size.small.borderRadius};

      &:active {
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.iconButton.colors.borderActive};
      }
    `}

  ${(props) =>
    props.$size === 'm' &&
    css`
      width: ${({ theme }) => theme.iconButton.size.medium.width};
      height: ${({ theme }) => theme.iconButton.size.medium.height};
      padding: ${({ theme }) => theme.iconButton.size.medium.padding};
      border-radius: ${({ theme }) => theme.iconButton.size.medium.borderRadius};
    `}
  
	${(props) =>
    props.$size === 'l' &&
    css`
      width: ${({ theme }) => theme.iconButton.size.large.width};
      height: ${({ theme }) => theme.iconButton.size.large.height};
      padding: ${({ theme }) => theme.iconButton.size.large.padding};
      border-radius: ${({ theme }) => theme.iconButton.size.large.borderRadius};
    `}
  
	${(props) =>
    props.$size === 'xl' &&
    css`
      width: ${({ theme }) => theme.iconButton.size.xlarge.width};
      height: ${({ theme }) => theme.iconButton.size.xlarge.height};
      padding: ${({ theme }) => theme.iconButton.size.xlarge.padding};
      border-radius: ${({ theme }) => theme.iconButton.size.xlarge.borderRadius};
    `}
`;
