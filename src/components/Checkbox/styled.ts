import styled, { css } from 'styled-components';

import CheckMark from './checkMark.svg';

export const Label = styled.label<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.checkbox.labelGap};

  width: fit-content;
  color: ${({ theme }) => theme.checkbox.colors.label};

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

  width: ${({ theme }) => theme.checkbox.size.outer};
  height: ${({ theme }) => theme.checkbox.size.outer};

  border-radius: ${({ theme }) => theme.checkbox.size.outerRadius};

  flex-shrink: 0;

  border: ${({ theme }) => theme.size.inputBorderWidth} solid ${({ theme }) => theme.checkbox.colors.borderInitial};

  &::before {
    background-color: ${({ theme }) => theme.checkbox.colors.borderInitial};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      border-color: ${({ theme }) => theme.checkbox.colors.disabled};
      color: ${({ theme }) => theme.checkbox.colors.disabled};

      cursor: auto;

      &::before {
        background-color: ${({ theme }) => theme.checkbox.colors.disabled};
        cursor: auto;
      }
    `}

  &::before {
    content: '';

    position: absolute;

    border-radius: ${({ theme }) => theme.checkbox.size.innerRadius};

    width: ${({ theme }) => theme.checkbox.size.inner};
    height: ${({ theme }) => theme.checkbox.size.inner};
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
    border-color: ${({ theme }) => theme.checkbox.colors.borderInitial};
  }

  &:checked:disabled ~ ${CustomCheckbox} {
    border-color: ${({ theme }) => theme.checkbox.colors.disabled};
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
  font-family: ${({ theme }) => theme.checkbox.font.fontFamily};
  font-size: ${({ theme }) => theme.checkbox.font.fontSize};
  line-height: ${({ theme }) => theme.checkbox.font.lineHeight};

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${({ theme }) => theme.checkbox.colors.disabledLabel};
    `}
`;
