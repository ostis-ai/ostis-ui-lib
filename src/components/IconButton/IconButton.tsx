import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { TSize } from './model';
import { Wrapper } from './styled';

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: TSize;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
}

export const IconButton = ({
  children,
  className,
  disabled,
  size = 'l',
  type = 'button',
  onClick,
  ...restButtonProps
}: IIconButtonProps) => {
  return (
    <Wrapper className={className} $size={size} disabled={disabled} onClick={onClick} type={type} {...restButtonProps}>
      {children}
    </Wrapper>
  );
};
