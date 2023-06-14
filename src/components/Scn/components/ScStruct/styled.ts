import { Scg } from '@components/Scg';
import { Spinner } from '@components/Spinner';
import { SwitchScgScn } from '@components/SwitchScgScn';
import styled, { css } from 'styled-components';

export const Struct = styled.div<{ isScg?: boolean }>`
  border: solid 1px #96a399;

  background-color: #fdfdfd;

  padding: 8px;

  border-radius: 8px;

  width: 100%;

  position: relative;

  overflow: hidden;

  ${({ isScg }) =>
    isScg &&
    css`
      padding: 0;
    `}
`;

export const StyledSwitchScgScn = styled(SwitchScgScn)`
  top: 8px !important;
`;

export const StyledScg = styled(Scg)`
  position: relative;

  min-height: 1024px;

  iframe {
    margin: 0 !important;
  }
`;

export const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
`;
