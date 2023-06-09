import { ComponentType, MouseEvent, ReactNode, useRef } from 'react';
import { ContextMenu } from '@components/ContextMenu';
import { useBooleanState } from '@hooks/useBooleanState';

export type TagProps<Tag extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[Tag] & {
  as?: Tag;
  children?: ReactNode;
  addr?: number;
  systemId?: string;
  showMenu?: boolean;
};

export type CompProps<P extends Record<string, any>, Comp extends ComponentType<P>> = P & {
  as?: Comp;
  addr: number;
};

export const ScTag = <
  P extends Record<string, any>,
  Comp extends ComponentType<P>,
  Tag extends keyof JSX.IntrinsicElements = 'div',
>({
  addr,
  systemId,
  as = 'div' as any,
  children,
  showMenu = true,
  ...restProps
}: TagProps<Tag> | CompProps<P, Comp>) => {
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
