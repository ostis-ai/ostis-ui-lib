import { ComponentType, MouseEvent, ReactNode, useRef } from 'react';
import { ContextMenu } from '@components/ContextMenu';
import { useBooleanState } from '@hooks/useBooleanState';

export interface IScgTagProps {
  children?: ReactNode;
  addr?: number;
  systemId?: string;
  showMenu?: boolean;
  [x: string]: any;
}

export const ScTag = ({ addr, systemId, as = 'div', children, showMenu = true, ...restProps }: IScgTagProps) => {
  const [isOpened, openDropdown, closeDropdown] = useBooleanState(false);

  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  const onContextMenu = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openDropdown();
  };

  const dataProps = addr ? { 'data-addr': addr } : { 'data-system-id': systemId || '' };
  return (
    <>
      <Tag {...restProps} {...dataProps} ref={ref} onContextMenu={onContextMenu}>
        {children}
      </Tag>
      {isOpened && showMenu && <ContextMenu addr={addr} systemId={systemId} onClose={closeDropdown} targetRef={ref} />}
    </>
  );
};
