import styled, { css } from 'styled-components';

import { TChipSize } from './types';

export const Wrapper = styled.div<{ $disabled?: boolean; $size: TChipSize; $hasCloseIcon: boolean }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: ${({ theme }) => theme.chip.size.gap};
  padding: ${({ $hasCloseIcon }) =>
    $hasCloseIcon ? ({ theme }) => theme.chip.size.paddingWithIcon : ({ theme }) => theme.chip.size.padding};
  width: ${({ theme }) => theme.chip.size.width};
  max-width: ${({ theme }) => theme.chip.size.maxWidth};
  border-radius: ${({ theme }) => theme.chip.size.borderRadius};
  border: ${({ theme }) => theme.chip.size.border} solid ${({ theme }) => theme.chip.colors.border};
  background-color: ${({ theme }) => theme.chip.colors.backgroundColor};

  color: ${({ theme }) => theme.chip.colors.color};

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${({ theme }) => theme.chip.colors.disabled.color};
      border: ${({ theme }) => theme.chip.size.disabled.border} solid
        ${({ theme }) => theme.chip.colors.disabled.border};
      pointer-events: none;
    `}
`;

export const Text = styled.div<{ size: TChipSize }>`
  font-family: ${({ theme }) => theme.chip.font.fontFamily};
  font-weight: ${({ theme }) => theme.chip.size.fontWeight};
  font-size: ${({ theme }) => theme.chip.size.fontWeight};
  line-height: ${({ theme }) => theme.chip.size.lineHeight};
  max-width: ${({ theme }) => theme.chip.size.maxWidthText};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Icon = styled.div<{ $disabled?: boolean }>`
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.chip.size.borderRadiusIcon};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.chip.colors.hover.backgroundColorIcon};
    path: {
      fill: ${({ theme }) => theme.chip.colors.hover.fillIcon};
    }
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      background-color: ${({ theme }) => theme.chip.colors.disabled.backgroundColorIcon};
      path: {
        fill: ${({ theme }) => theme.chip.colors.disabled.fillIcon};
      }
    `}
`;
