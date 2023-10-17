import styled, { css } from 'styled-components';

import AuthPassword from './assets/authorization-password.svg';
import AuthPasswordCrossed from './assets/eyeCrossed.svg';

type WrapperProps = {
  isFocused: boolean;
  isDisabled?: boolean;
  isSearch: boolean;
  isError: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 9px;

  width: 100%;
  height: 40px;

  padding: 8px 16px;

  border: 2px solid #ebebeb;
  border-radius: 10px;

  outline: none;
  cursor: text;

  background-color: white;

  &:hover {
    border-color: #7ec0ee;
  }

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #7ec0ee;

      &:hover {
        border-color: #7ec0ee;
      }
    `}

  ${(props) =>
    props.isError &&
    css`
      border-color: #f14747;

      &:hover {
        border-color: #f14747;
      }
    `}

	${(props) =>
    props.isDisabled &&
    css`
      background-color: #fbfbfb;
      border-color: #eeeeee;

      cursor: default;
      pointer-events: none;
    `}
`;

export const LeftIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  flex-grow: 1;

  padding: 0;
  min-width: 0;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  border: none;
  outline: none;

  color: #323232;

  &::placeholder {
    color: #737373;
    font-weight: 300;
  }

  &:disabled {
    background-color: #fbfbfb;
    color: #737373;

    cursor: default;
  }
`;

export const RightIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export const HidePassword = styled(AuthPassword)`
  flex-shrink: 0;
  padding: 0px 1px;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;

export const ShowPassword = styled(AuthPasswordCrossed)`
  flex-shrink: 0;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;
