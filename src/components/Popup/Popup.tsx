import { PropsWithChildren, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalWrap, Overlay } from './styled';

const body = document.body;

interface IProps {
  onClose: () => void;
}

export const Popup = ({ children, onClose }: PropsWithChildren<IProps>) => {
  const closeByEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', (e) => closeByEscape(e));
    return window.removeEventListener('keydown', (e) => closeByEscape(e));
  }, [onClose, closeByEscape]);

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => onClose()} />
      <ModalWrap>{children}</ModalWrap>
    </>,
    body,
  );
};
