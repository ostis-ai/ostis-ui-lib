import { ReactNode, useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

import { IToast, IToastParams, TAddToastParams, TToastComponent } from './model';
import { Toasts } from './Toasts';
import { BasicToastProvider, InnerToastProvider } from './useToast';

type RenderToastsProps = {
  toasts: IToast[];
};

export type ToastProviderProps = {
  children: ReactNode;
  renderToasts?: (props: RenderToastsProps) => ReactNode;
};

const defaultRenderToasts = () => <Toasts />;

export const ToastProvider = ({ children, renderToasts = defaultRenderToasts }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const [deletingToasts, setDeletingToasts] = useState<string[]>([]);

  const addToast = useCallback((component: TToastComponent, baseParams?: TAddToastParams) => {
    const params: IToastParams = {
      id: baseParams?.id || nanoid(5),
      duration: baseParams?.duration || 'infinity',
      position: baseParams?.position || 'topCenter',
      closeable: baseParams?.closeable ?? true,
    };

    setToasts((prev) => {
      return [{ params, component }, ...prev.filter((el) => el.params.id !== baseParams?.id)];
    });
  }, []);

  const markToastToDelete = useCallback((id: string) => {
    setDeletingToasts((prev) => [...prev, id]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setDeletingToasts((prev) => prev.filter((prevToastId) => prevToastId !== id));
    setToasts((prev) => prev.filter((prevToast) => prevToast.params.id !== id));
  }, []);

  return (
    <BasicToastProvider toasts={toasts} addToast={addToast} removeToast={markToastToDelete}>
      <InnerToastProvider deletingToasts={deletingToasts} removeToast={removeToast}>
        {children}
        {renderToasts({ toasts })}
      </InnerToastProvider>
    </BasicToastProvider>
  );
};
