import { forwardRef, MouseEvent, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

import CloseIcon from './close.svg';
import { Icon, Text, Wrapper } from './styled';
import { TChipSize } from './types';

export interface IProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClose?: (e: MouseEvent) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  size?: TChipSize;
}

export const Chip = forwardRef<HTMLDivElement, PropsWithChildren<IProps>>(
  ({ children, className, disabled, onClose, onClick, size = 'm' }, ref) => {
    return (
      <Wrapper
        ref={ref}
        onClick={onClick}
        className={className}
        $disabled={disabled}
        $size={size}
        $hasCloseIcon={!!onClose}
      >
        <Text size={size}>{children}</Text>
        {!!onClose && (
          <Icon onClick={onClose} $disabled={disabled}>
            <CloseIcon />
          </Icon>
        )}
      </Wrapper>
    );
  },
);

Chip.displayName = 'Chip';
