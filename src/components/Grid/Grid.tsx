import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

const DEFAULT_TEMPLATE_COLUMNS = 12;
const DEFAULT_GAP = 24;

const getGap = (rowGap: number, columnGap: number) => css`
  column-gap: ${columnGap}px;
  row-gap: ${rowGap}px;
`;

const gridCss = css<{ templateColumns?: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ templateColumns = DEFAULT_TEMPLATE_COLUMNS }) => templateColumns},
    minmax(1px, 1fr)
  );
`;

export const Grid = styled.div<{
  templateColumns?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  alignItems?: string;
}>`
  ${gridCss};
  ${({ gap = DEFAULT_GAP, rowGap = gap, columnGap = gap }) => getGap(rowGap, columnGap)};
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `};
`;

export interface IGridItemProps {
  size?: number;
  alignSelf?: CSSProperties['alignSelf'];
  subGrid?: boolean;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  templateColumns?: number;
}

export const GridItem = styled.div<IGridItemProps>`
  grid-column-end: span ${({ size = 12 }) => size};
  ${({ subGrid = false }) => subGrid && gridCss}
  ${({ gap = DEFAULT_GAP, rowGap = gap, columnGap = gap }) => getGap(rowGap, columnGap)};
  ${({ alignSelf }) =>
    alignSelf &&
    css`
      align-self: ${alignSelf};
    `};
`;
