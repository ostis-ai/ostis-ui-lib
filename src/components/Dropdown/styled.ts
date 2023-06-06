import styled, { css } from 'styled-components';

import { PositionInPortal } from '../PositionInPortal';

import { TDisplay } from './types';

export const StyledPositionInPortal = styled(PositionInPortal)<TDisplay>`
  display: flex;
  flex-wrap: nowrap;
  z-index: 3;
  flex-direction: ${({ display }) =>
    () => {
      switch (display) {
        case 'bottom':
          return 'column';
        case 'top':
          return 'column-reverse';
        default:
          return 'column';
      }
    }};
`;

export const FakeTarget = styled.div`
  pointer-events: none;
  height: 100%;
  flex: 0 0 auto;
`;

export const Container = styled.div<TDisplay>`
  pointer-events: initial;
  margin: 2px 0;
  background-color: #fff;
  border-radius: 10px;
  flex: 0 0 auto;
  max-width: calc(100vw - 32px);
  opacity: 0;
  transition-delay: 200ms;
  transition-property: opacity;

  ${(props) =>
    props.display === 'center' &&
    css`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    `}

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
`;
