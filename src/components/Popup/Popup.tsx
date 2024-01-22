import { PropsWithChildren, ReactNode, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IconButton } from '@components/IconButton';

import Close from './close.svg';
import { Header, ModalWrap, Overlay } from './styled';

const body = document.body;

export interface IPopupProps {
  onClose: () => void;
  withCloseIcon?: boolean;
  closeIcon?: ReactNode;
  className?: string;
}

export const Popup = ({
  children,
  className,
  closeIcon,
  withCloseIcon = false,
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
        {withCloseIcon && (
          <Header>
            {closeIcon || (
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            )}
          </Header>
        )}
        {children}
      </ModalWrap>
    </>,
    body,
  );
};
