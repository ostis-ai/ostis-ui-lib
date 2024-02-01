import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${({ theme }) => theme.popup.colors.overlayBackground};

  z-index: 3;
`;

export const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 3;
`;

