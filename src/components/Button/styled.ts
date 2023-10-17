import styled, { css } from 'styled-components';

type ButtonProps = {
  variant: 'contained' | 'outlined';
  color: 'primary' | 'secondary';
  size: 'lg' | 'md' | 'sm';
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-sizing: border-box;
  outline: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-family: Roboto;
  font-weight: 500;
  letter-spacing: 0;
  user-select: none;

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
      padding: 0.5rem 3rem;
      font-size: 26px;
      line-height: 30px;
    `}

  ${(props) =>
    props.size === 'md' &&
    css`
      padding: 0.5rem 1rem;
      font-size: 22px;
      line-height: 26px;
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      padding: 0.5rem 1rem;
      font-size: 18px;
      line-height: 20px;
    `}

  /* Colors */
  ${(props) =>
    props.color === 'primary' &&
    css`
      background: #5896c0;
      color: #ffffff;

      &:hover {
        background: #4980a5;
      }
      &:active {
        background: #4980a5;
      }
      &:disabled {
        background: #c0c0c0;
      }
    `}

  ${(props) =>
    props.color === 'secondary' &&
    css`
      background: #ffffff;
      color: #5896c0;

      &:hover {
        background: #f5f5f5;
      }
      &:active {
        background: #f5f5f5;
      }
      &:disabled {
        background: #ffffff;
        color: #a6a6a6;

        & svg path {
          stroke: #a6a6a6;
        }
      }
    `}
`;
