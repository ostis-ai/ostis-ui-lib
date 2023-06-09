import { PropsWithChildren } from 'react';
import { useCommandContext } from '@components/CommandProvider';

import { StyledScTag, TAppearance } from './styled';

interface IProps {
  className?: string;
  addr?: number;
  systemId?: string;
  appearance?: TAppearance;
  command?: number | string;
  as?: keyof JSX.IntrinsicElements;
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
}: PropsWithChildren<IProps>) => {
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
