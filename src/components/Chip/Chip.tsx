import { FC, MouseEvent, MouseEventHandler, ReactNode, useCallback } from 'react';

import CloseLarge from './icons/closeLarge.svg';
import CloseMedium from './icons/closeMedium.svg';
import { Icon, Text, Wrapper } from './styled';
import { TChipSize } from './types';

export interface IProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClose?: () => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  size?: TChipSize;
}

export const Chip: FC<IProps> = ({ children, className, disabled, onClose, onClick, size = 'm' }) => {
  const handleClickCloseIcon = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onClose?.();
    },
    [onClose],
  );

  return (
    <Wrapper onClick={onClick} className={className} disabled={disabled} size={size} hasCloseIcon={!!onClose}>
      <Text size={size}>{children}</Text>
      {!!onClose && (
        <Icon onClick={handleClickCloseIcon}>
          {size === 'l' && <CloseLarge />}
          {size === 'm' && <CloseMedium />}
        </Icon>
      )}
    </Wrapper>
  );
};
