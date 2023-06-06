import styled, { keyframes } from 'styled-components';

import Spinner from './icons/Spinner.svg';

export const Wrapper = styled.span<{ width: number; height: number }>`
  display: block;

  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

const Spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Svg = styled(Spinner)<{ appearance: string }>`
  animation: ${Spin} 1s linear infinite;

  path {
    fill: ${({ appearance }) => appearance};
  }
`;
