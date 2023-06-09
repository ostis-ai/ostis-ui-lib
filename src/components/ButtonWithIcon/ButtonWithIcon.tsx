// Deprecated: will be done with the Button component

import { forwardRef, PropsWithChildren } from 'react';

import { Button } from './styled';

type TButtonType = 'button' | 'submit' | 'reset';

interface IButtonWithIcon {
  className?: string;
  disabled?: boolean;
  type?: TButtonType;
  onClick?: () => void;
}

export const ButtonWithIcon = forwardRef<HTMLButtonElement, PropsWithChildren<IButtonWithIcon>>(
  ({ children, className, disabled = false, type = 'button', onClick }, ref) => {
    return (
      <Button type={type} className={className} ref={ref} onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  },
);

ButtonWithIcon.displayName = 'ButtonWithIcon';
