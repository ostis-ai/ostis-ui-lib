import { Spinner } from '@components/Spinner';
import styled from 'styled-components';

export const Wrap = styled.div<{ show?: boolean }>`
  position: absolute;
  height: calc(100vh - 80px - 36px);

  display: flex;
  justify-content: center;
  align-items: center;

  display: ${(props) => (props.show ? 'block' : 'none')};
`;

export const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate3d(-50%, -50%, 0);
`;

export const Frame = styled.iframe`
  width: 100%;
  height: 100%;

  margin: -7px;

  border: 0;
`;

export const Popup = styled.div<{ isclear?: boolean }>`
  width: ${(props) => (props.isclear ? '383px' : '344px')};

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  color: #323232;

  b {
    font-weight: 500;
  }
`;
