import styled, { css } from 'styled-components';

import AuthPassword from './assets/authorization-password.svg';
import AuthPasswordCrossed from './assets/eyeCrossed.svg';

type WrapperProps = {
  $isFocused: boolean;
  $isDisabled?: boolean;
  $isError: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.input.font.fontFamily};
  gap: ${({ theme }) => theme.input.iconGap};

  box-sizing: border-box;

  width: 100%;
  height: 40px;

  padding: ${({ theme }) => theme.input.size.padding};

  border: ${({ theme }) => theme.input.size.borderWidth} solid ${({ theme }) => theme.input.colors.initial.border};
  border-radius: ${({ theme }) => theme.input.borderRadius};

  outline: none;
  cursor: text;

  background-color: ${({ theme }) => theme.input.colors.initial.background};

  &:hover {
    border-color: ${({ theme }) => theme.input.colors.borderHover};
  }

  ${(props) =>
    props.$isFocused &&
    css`
      border-color: ${({ theme }) => theme.input.colors.borderFocused};

      &:hover {
        border-color: ${({ theme }) => theme.input.colors.borderFocusedHover};
      }
    `}

  ${(props) =>
    props.$isError &&
    css`
      border-color: ${({ theme }) => theme.input.colors.borderError};

      &:hover {
        border-color: ${({ theme }) => theme.input.colors.borderErrorHover};
      }
    `}

	${(props) =>
    props.$isDisabled &&
    css`
      background-color: ${({ theme }) => theme.input.colors.disabled.background};
      border-color: ${({ theme }) => theme.input.colors.disabled.border};

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

  font-family: inherit;
  font-style: normal;
  font-weight: ${({ theme }) => theme.input.font.inputWeight};
  font-size: ${({ theme }) => theme.input.font.fontSize};
  line-height: ${({ theme }) => theme.input.font.lineHeight};

  border: none;
  outline: none;

  color: ${({ theme }) => theme.input.colors.initial.text};

  &::placeholder {
    color: ${({ theme }) => theme.input.colors.placeholder};
    font-weight: ${({ theme }) => theme.input.font.placeholderWeight};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.input.colors.disabled.background};
    color: ${({ theme }) => theme.input.colors.disabled.text};

    cursor: default;
  }
`;

export const RightIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export const PasswordIconWrapper = styled.div`
  flex-shrink: 0;
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
