import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  size?: 'lg' | 'md' | 'sm';
};
