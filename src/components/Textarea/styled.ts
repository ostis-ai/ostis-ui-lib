import { InputStatus } from '@model/input';
import styled, { css } from 'styled-components';

export const StyledTextarea = styled.textarea<{
  disabled: boolean | undefined;
  status?: InputStatus;
  isScrollable: boolean;
}>`
  width: 100%;
  max-height: 80px;
  min-height: 40px;

  padding: ${({ theme }) => theme.textarea.size.padding};

  background-color: ${({ theme }) => theme.textarea.colors.initial.background};

  border: ${({ theme }) => theme.textarea.size.borderWidth} solid ${({ theme }) => theme.textarea.colors.initial.border};
  border-radius: ${({ theme }) => theme.textarea.borderRadius};

  font-size: ${({ theme }) => theme.textarea.font.fontSize};
  line-height: ${({ theme }) => theme.textarea.font.lineHeight};

  resize: none;

  overflow: hidden;
  outline: none;

  color: ${({ theme }) => theme.textarea.colors.initial.text};

  &::placeholder {
    color: ${({ theme }) => theme.textarea.colors.placeholder};
    font-weight: ${({ theme }) => theme.textarea.font.placeholderWeight};
  }

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.textarea.colors.borderHover};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.textarea.colors.disabled.background};
      border-color: ${({ theme }) => theme.textarea.colors.disabled.border};

      &:hover {
        border-color: ${({ theme }) => theme.textarea.colors.disabled.border};
      }
    `}

  ${({ status }) =>
    status === 'error' &&
    css`
      border-color: ${({ theme }) => theme.textarea.colors.borderError};

      &:hover {
        border-color: ${({ theme }) => theme.textarea.colors.borderErrorHover};
      }
    `}

    ${({ isScrollable }) =>
    isScrollable &&
    css`
      margin-right: 6px;

      cursor: auto;

      overflow: auto;

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;

        margin: 8px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;

        background-color: #c0c0c0;

        margin: 8px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;

        background-color: transparent;
      }
    `}
`;
