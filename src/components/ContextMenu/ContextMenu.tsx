import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useTranslate } from '@components/Language';
import { ScTagLink } from '@components/ScTagLink';
import { Spinner } from '@components/Spinner';
import { useClickOutside } from '@hooks/useClickOutside';

import { ScLangText } from '../Language/ScLangText';

import { SPINER_COLOR } from './constants';
import { IContextItem } from './model';
import { StyledDropdown, StyledDropdownOption } from './styled';
import { useContextMenu } from './useContextMenu';

interface IProps {
  addr?: number;
  systemId?: string;
  targetRef: React.RefObject<HTMLElement>;
  relativeRef?: React.RefObject<HTMLElement>;
  onClose: () => void;
}

export const ContextMenu = ({ addr, systemId, targetRef, relativeRef, onClose }: IProps) => {
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
        <StyledDropdownOption isLoad>
          <Spinner size={24} appearance={SPINER_COLOR} />
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
