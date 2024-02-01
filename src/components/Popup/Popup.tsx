import { PropsWithChildren, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalWrap, Overlay } from './styled';

export interface IPopupProps {
  onClose: () => void;
  className?: string;
}

export const Popup = ({
  children,
  className,
  onClose,
}: PropsWithChildren<IPopupProps>) => {
  const closeByEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', closeByEscape);
    return window.removeEventListener('keydown', closeByEscape);
  }, [onClose, closeByEscape]);

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onClose} />
      <ModalWrap className={className}>
        {children}
      </ModalWrap>
    </>,
    document.body,
  );
};
