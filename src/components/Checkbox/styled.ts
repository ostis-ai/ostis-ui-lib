import styled, { css } from 'styled-components';

import CheckMark from './checkMark.svg';

export const Label = styled.label<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
  color: #454545;

  cursor: pointer;

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: auto;
    `}
`;

export const CustomCheckbox = styled.div<{ $disabled: boolean }>`
  position: relative;
  box-sizing: border-box;

  width: 24px;
  height: 24px;

  border-radius: 5px;

  flex-shrink: 0;

  border: 2px solid #5896c0;

  &::before {
    background-color: #5896c0;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      border-color: #c0c0c0;
      color: #c0c0c0;

      cursor: auto;

      &::before {
        background-color: #c0c0c0;
        cursor: auto;
      }
    `}

  &::before {
    content: '';

    position: absolute;

    border-radius: 4px;

    width: 18px;
    height: 18px;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%) scale(0);
    transition: all ease 0.2s;

    opacity: 0;
  }
`;

export const StyledCheckMark = styled(CheckMark)<{ $disabled: boolean }>`
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: auto;
    `}
`;

export const CheckboxInput = styled.input`
  position: absolute;

  width: 0;
  height: 0;

  overflow: hidden;

  clip: rect(0 0 0 0);

  &:checked ~ ${CustomCheckbox} {
    border-color: #5896c0;
  }

  &:checked:disabled ~ ${CustomCheckbox} {
    border-color: #c0c0c0;
  }

  &:checked ~ ${CustomCheckbox}::before {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  &:checked ~ ${CustomCheckbox} ${StyledCheckMark} {
    opacity: 1;
  }
`;

export const LabelText = styled.div<{ $disabled: boolean }>`
  font-family: 'Roboto';
  font-size: 22px;
  line-height: 26px;

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: $beige-grey;
    `}
`;
