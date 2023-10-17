import styled, { css } from 'styled-components';

export const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  box-sizing: border-box;
`;

type IconProps = {
  disabled?: boolean;
};

export const Left = styled.div<IconProps>`
  position: absolute;
  top: 50%;
  left: 1rem;
  pointer-events: none;
  transform: translateY(-50%);
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

type InputProps = {
  left: boolean;
  right: boolean;
  error: boolean;
};

export const Input = styled.input<InputProps>`
  display: block;
  padding: 0.5rem 1rem;
  ${(props) =>
    props.left &&
    css`
      padding-left: 3rem;
    `}
  ${(props) =>
    props.right &&
    css`
      padding-right: 3rem;
    `}
  border: 2px solid #ebebeb;
  border-radius: 0.6rem;
  outline: none;
  box-sizing: border-box;

  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0;
  color: #323232;

  &:hover,
  &:focus {
    border: 2px solid #7ec0ee;
  }

  ${(props) =>
    props.error &&
    css`
      border: 2px solid #f14747;
    `}

  &:disabled {
    border: 2px solid #eeeeee;
    background: #fbfbfb;
    color: #737373;
  }

  &::placeholder {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    line-height: 23px;
    letter-spacing: 0;
    color: #737373;
  }
`;

export const Right = styled.div<IconProps>`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

export const Error = styled.span`
  position: absolute;
  bottom: -0.2rem;
  left: 0;
  transform: translateY(100%);
  z-index: 100;

  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  line-height: 13px;
  letter-spacing: 0;
  color: #f14747;
`;
