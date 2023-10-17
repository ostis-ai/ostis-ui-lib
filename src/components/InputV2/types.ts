import { InputHTMLAttributes } from 'react';

export type InputV2Props = InputHTMLAttributes<HTMLInputElement> & {
  left?: JSX.Element;
  right?: JSX.Element;
  error?: string;
};
