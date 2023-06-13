import { PropsWithChildren } from 'react';
import { useCommandContext } from '@components/CommandProvider';

import { StyledScTag, TAppearance } from './styled';

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
      as={as}
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
