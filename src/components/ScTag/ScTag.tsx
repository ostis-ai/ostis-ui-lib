import { MouseEvent, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { useCommandContext } from '@components/CommandProvider';
import { ScLangText, useTranslate } from '@components/Language';
import { Spinner } from '@components/Spinner';
import { useBooleanState } from '@hooks/useBooleanState';
import { useClickOutside } from '@hooks/useClickOutside';
import styled, { css } from 'styled-components';

import { SPINNER_COLOR } from './constants';
import { IContextItem } from './model';
import { StyledDropdown, StyledDropdownOption } from './styled';
import { useContextMenu } from './useContextMenu';

export type TAppearance = 'blue' | 'transparent';

export interface IScTagProps {
  children?: ReactNode;
  addr?: number;
  systemId?: string;
  showMenu?: boolean;
  [x: string]: any;
}

export const ScTag = ({ addr, systemId, as = 'div', children, showMenu = true, ...restProps }: IScTagProps) => {
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

export interface IContextMenuProps {
  addr?: number;
  systemId?: string;
  targetRef: React.RefObject<HTMLElement>;
  relativeRef?: React.RefObject<HTMLElement>;
  onClose: () => void;
}

export const ContextMenu = ({ addr, systemId, targetRef, relativeRef, onClose }: IContextMenuProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contextItems, setContextItems] = useState<IContextItem[]>([]);

  const { getContextItems, onFixArgument: onOuterFixArgument } = useContextMenu();

  const translate = useTranslate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const contextItems = await getContextItems(addr || systemId);

      if (!contextItems) return onClose();

      const arrItemsMenu = contextItems.map((addr: number) => ({ addr }));

      setContextItems(arrItemsMenu);
      setIsLoading(false);
    })();
  }, [addr, getContextItems, onClose, systemId]);

  const onFixArgument = async (e: MouseEvent) => {
    e.stopPropagation();
    onOuterFixArgument?.(addr || systemId);
    onClose();
  };

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [onClose]);

  useClickOutside(dropdownRef, onClose);

  return (
    <StyledDropdown ref={dropdownRef} targetRef={targetRef} relativeRef={relativeRef}>
      {isLoading && (
        <StyledDropdownOption $isLoad>
          <Spinner size={24} appearance={SPINNER_COLOR} />
          {translate({ ru: 'Идет загрузка', en: 'Loading' })}
        </StyledDropdownOption>
      )}
      {!isLoading && (
        <>
          {contextItems.map(({ addr: command }, ind) => (
            <ScTagLink key={ind} command={command} addr={addr} showMenu={false} onClick={onClose}>
              <StyledDropdownOption>
                <ScLangText addrOrSystemId={command} />
              </StyledDropdownOption>
            </ScTagLink>
          ))}
        </>
      )}
    </StyledDropdown>
  );
};

const StyledScTag = styled(ScTag)<{ appearance: TAppearance }>`
  font-size: 18px;
  line-height: 22px;

  cursor: pointer;

  ${({ appearance }) => {
    switch (appearance) {
      case 'blue':
        return css`
          color: #2a6496;

          &:hover {
            background-color: #cbd9f1;

            color: #23527c;
          }
        `;
      case 'transparent':
        return css`
          &:hover {
            color: #323232;
          }
        `;
      default:
        return '';
    }
  }}
`;

export interface IScTagLinkProps {
  className?: string;
  addr?: number;
  systemId?: string;
  appearance?: TAppearance;
  command?: number | string;
  as?: any;
  showMenu?: boolean;
  onClick?: () => void;
}

export const ScTagLink = ({
  addr,
  children,
  systemId,
  command,
  className,
  as,
  appearance = 'blue',
  showMenu,
  onClick: onClickFromProps,
}: PropsWithChildren<IScTagLinkProps>) => {
  const { onExecuteCommand } = useCommandContext();

  const onClick = async (e: any) => {
    e.stopPropagation();
    onClickFromProps?.();
    onExecuteCommand(addr || systemId, command);
  };

  return (
    <StyledScTag
      className={className}
      forwardedAs={as}
      addr={addr}
      systemId={systemId}
      showMenu={showMenu}
      onClick={onClick}
      appearance={appearance}
    >
      {children}
    </StyledScTag>
  );
};
