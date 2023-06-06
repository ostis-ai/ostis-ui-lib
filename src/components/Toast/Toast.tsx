import { cloneElement,useCallback, useEffect } from 'react';

import { TToastComponent } from './model';
import { useToast } from './useToast';

interface IProps {
  duration?: number | 'infinity';
  id: string;
  component: TToastComponent;
}

export const Toast = ({ duration = 'infinity', id, component }: IProps) => {
  const { removeToast } = useToast();

  const onClose = useCallback(() => {
    removeToast(id);
    component.props.onClose?.();
  }, [component.props, id, removeToast]);

  useEffect(() => {
    if (duration === 'infinity') return;
    setInterval(onClose, duration);
  }, [duration, onClose]);

  const newComponent = cloneElement(component, { onClose });

  return <>{newComponent}</>;
};
