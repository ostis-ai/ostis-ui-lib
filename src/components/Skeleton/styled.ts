import styled, { keyframes } from 'styled-components';

import { IPseudoText, ISkeleton } from './types';
import { normalizeSize } from './utils';

const Pulse = keyframes`
  to {
    opacity: 0.4;
  }
`;

export const StyledSkeleton = styled.span.attrs<ISkeleton>((props) => ({
  width: normalizeSize(props.width),
  height: normalizeSize(props.height),
}))<ISkeleton>`
  display: block;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  background-color: #e2e5e9;

  border-radius: 8px;

  animation: ${Pulse} 0.8s ease-in-out infinite alternate-reverse both;
`;

export const Wrapper = styled.span<IPseudoText>`
  display: flex;
  align-items: center;

  width: 100%;
  height: ${({ height }) => height};
`;
