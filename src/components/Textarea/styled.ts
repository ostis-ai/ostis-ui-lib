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

  padding: 6px 14px;

  background: #ffffff;
  border: 2px solid #ebebeb;
  border-radius: 10px;

  font-size: 20px;
  line-height: 24px;

  resize: none;

  overflow: hidden;
  outline: none;

  color: #323232;

  &::placeholder {
    font-weight: 300;
    color: #737373;
  }

  &:hover,
  &:focus {
    border-color: #7ec0ee;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #fafafa;
      border-color: #eeeeee;

      &:hover {
        border-color: #eeeeee;
      }
    `}

  ${({ status }) =>
    status === 'error' &&
    css`
      border-color: #f14747;

      &:hover {
        border-color: #f14747;
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
