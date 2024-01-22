import { MouseEventHandler, ReactNode } from 'react';

import { TSize } from './model';
import { Wrapper } from './styled';

export interface IIconButtonProps {
  children: ReactNode;
  size?: TSize;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
}

export const IconButton = ({ children, className, size = 'l', disabled, onClick }: IIconButtonProps) => {
  return (
    <Wrapper className={className} $size={size} disabled={disabled} onClick={onClick} type="button">
      {children}
    </Wrapper>
  );
};
