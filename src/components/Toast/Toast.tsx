import { cloneElement, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { useInnerToast, useToast } from './useToast';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
`;

const fadeOut = keyframes`
  to {
    opacity: 0;
    transform: translateX(40px);
  }
`;

const ToastWrapper = styled.div<{ $isDisapearing?: boolean }>`
  animation: ${({ $isDisapearing }) => ($isDisapearing ? fadeOut : fadeIn)} 0.3s ease both;
`;

interface IProps {
  id: string;
}

export const Toast = ({ id }: IProps) => {
  const { removeToast: markToastToDelete, toasts } = useToast();
  const { removeToast, deletingToasts } = useInnerToast();

  const toast = toasts.find((toast) => toast.params.id === id);

  const onClose = useCallback(() => {
    markToastToDelete(id);
    toast?.component.props.onClose?.();
  }, [id, markToastToDelete, toast?.component.props]);

  useEffect(() => {
    if (toast?.params.duration === 'infinity') return;
    setTimeout(onClose, toast?.params.duration);
  }, [toast?.params.duration, onClose]);

  const newComponent = toast
    ? cloneElement(toast.component, { onClose: toast.params.closeable ? onClose : undefined })
    : null;

  const isDisapearing = deletingToasts.includes(id);

  const onAnimationEnd = () => {
    if (isDisapearing) removeToast(id);
  };

  return (
    <ToastWrapper $isDisapearing={isDisapearing} onAnimationEnd={onAnimationEnd}>
      {newComponent}
    </ToastWrapper>
  );
};
