import { ReactElement } from 'react';

import { toastPositions } from './constants';

interface IComponentProps {
  [x: string]: any;
  onClose?: () => void;
}

export type TToastComponent = ReactElement<IComponentProps, string | React.JSXElementConstructor<any>>;

export type TToastPosition = (typeof toastPositions)[number];

export interface IToastParams {
  id: string;
  position: TToastPosition;
  duration: number | 'infinity';
  closeable: boolean;
}

export type TAddToastParams = Partial<IToastParams>;

export interface IToast {
  params: IToastParams;
  component: TToastComponent;
}

export type TAddToast = (component: TToastComponent, params?: TAddToastParams) => void;
