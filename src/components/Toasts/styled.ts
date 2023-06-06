import { TToastPosition } from '@components/Toast/model';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 136px;
  bottom: 136px;
  left: 24px;
  right: 24px;

  z-index: 100;

  pointer-events: none;
`;

export const StyledToasts = styled.div<{ position: TToastPosition }>`
  position: absolute;

  display: flex;
  flex-direction: column;
  gap: 24px;

  pointer-events: all;

  ${({ position }) => {
    switch (position) {
      case 'topLeft':
        return css`
          left: 0;
          top: 0;
        `;
      case 'topCenter':
        return css`
          left: 50%;
          top: 0;

          transform: translate3d(-50%, 0, 0);

          align-items: center;
        `;
      case 'topRight':
        return css`
          top: 0;
          right: 0;

          align-items: flex-end;
        `;
      case 'centerLeft':
        return css`
          left: 0;
          top: 50%;

          transform: translate3d(0, -50%, 0);
        `;
      case 'center':
        return css`
          left: 50%;
          top: 50%;

          transform: translate3d(-50%, -50%, 0);

          align-items: center;
        `;
      case 'centerRight':
        return css`
          right: 0;
          top: 50%;

          transform: translate3d(0, -50%, 0);

          align-items: flex-end;
        `;
      case 'bottomLeft':
        return css`
          left: 0;
          bottom: 0;
        `;
      case 'bottomCenter':
        return css`
          left: 50%;
          bottom: 0;

          transform: translate3d(-50%, 0, 0);

          align-items: center;
        `;
      case 'bottomRight':
        return css`
          bottom: 0;
          right: 0;

          align-items: flex-end;
        `;
      default:
        return '';
    }
  }}
`;
