import styled, { css } from 'styled-components';

type ButtonProps = {
  variant: 'contained' | 'outlined';
  color: 'primary' | 'secondary';
  size: 'lg' | 'md' | 'sm';
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.button.gap};
  box-sizing: border-box;
  outline: none;
  border-radius: ${({ theme }) => theme.button.borderRadius};
  cursor: pointer;
  font-family: ${({ theme }) => theme.button.font.fontFamily};
  font-weight: 500;
  letter-spacing: 0;
  user-select: none;

  fill: currentColor;

  &:disabled {
    pointer-events: none;
  }

  /* Variants */
  ${(props) =>
    props.variant === 'contained' &&
    css`
      border: none;
    `}

  /* Sizes */
  ${(props) =>
    props.size === 'lg' &&
    css`
      padding: ${({ theme }) => theme.button.size.large.padding};
      font-size: ${({ theme }) => theme.button.font.large.fontSize};
      line-height: ${({ theme }) => theme.button.font.large.lineHeight};
    `}

  ${(props) =>
    props.size === 'md' &&
    css`
      padding: ${({ theme }) => theme.button.size.medium.padding};
      font-size: ${({ theme }) => theme.button.font.medium.fontSize};
      line-height: ${({ theme }) => theme.button.font.medium.lineHeight};
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      padding: ${({ theme }) => theme.button.size.small.padding};
      font-size: ${({ theme }) => theme.button.font.small.fontSize};
      line-height: ${({ theme }) => theme.button.font.small.lineHeight};
    `}

  /* Colors */
  ${(props) =>
    props.color === 'primary' &&
    css`
      background: ${({ theme }) => theme.button.colors.primary.backgroundInitial};
      color: ${({ theme }) => theme.button.colors.primary.text};

      &:hover {
        background: ${({ theme }) => theme.button.colors.primary.backgroundHover};
      }
      &:active {
        background: ${({ theme }) => theme.button.colors.primary.backgroundActive};
      }
      &:disabled {
        background: ${({ theme }) => theme.button.colors.primary.backgroundDisabled};
        color: ${({ theme }) => theme.button.colors.primary.textDisabled};
      }
    `}

  ${(props) =>
    props.color === 'secondary' &&
    css`
      background: ${({ theme }) => theme.button.colors.secondary.backgroundInitial};
      color: ${({ theme }) => theme.button.colors.secondary.text};

      &:hover {
        background: ${({ theme }) => theme.button.colors.secondary.backgroundHover};
      }
      &:active {
        background: ${({ theme }) => theme.button.colors.secondary.backgroundActive};
      }
      &:disabled {
        background: ${({ theme }) => theme.button.colors.secondary.backgroundDisabled};
        color: ${({ theme }) => theme.button.colors.primary.textDisabled};
      }
    `}
`;
