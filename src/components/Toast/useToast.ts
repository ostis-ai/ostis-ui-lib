import { createSmartContext } from '@utils/createSmartContext';

import { IToast, TAddToast } from './model';

type BasicToastContext = {
  toasts: IToast[];
  addToast: TAddToast;
  removeToast: (id: string) => void;
};

export const [BasicToastProvider, useToast] = createSmartContext<BasicToastContext>({
  toasts: [] as IToast[],
  addToast: () => void 0,
  removeToast: () => void 0,
});

type InnerToastContext = {
  deletingToasts: string[];
  removeToast: (id: string) => void;
};

export const [InnerToastProvider, useInnerToast] = createSmartContext<InnerToastContext>({
  deletingToasts: [],
  removeToast: () => void 0,
});
