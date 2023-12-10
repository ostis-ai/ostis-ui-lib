import { ReactNode, useCallback, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

import { ToastContext } from './constants';
import { IToast, IToastParams, TAddToastParams, TToastComponent } from './model';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback((component: TToastComponent, baseParams?: TAddToastParams) => {
    const params: IToastParams = {
      id: baseParams?.id || nanoid(5),
      duration: baseParams?.duration || 'infinity',
      position: baseParams?.position || 'topCenter',
    };

    setToasts((prev) => {
      return [{ params, component }, ...prev.filter((el) => el.params.id !== baseParams?.id)];
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((prevToast) => prevToast.params.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast]);

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
};
