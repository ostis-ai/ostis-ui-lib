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

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.popup.colors.contentBackground};

  width: ${({ theme }) => theme.popup.size.contentWidth};
  height: ${({ theme }) => theme.popup.size.contentHeight};

  border-radius: ${({ theme }) => theme.popup.contentBorderRadius};

  transform: translate(-50%, -50%);

  z-index: 3;
`;

export const Header = styled.div`
  padding: 16px 16px;
  display: flex;
  justify-content: flex-end;
`;
