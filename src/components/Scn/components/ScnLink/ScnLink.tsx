import { ScLangText } from '@components/Language';
import { ScTagLink } from '@components/ScTagLink';

export interface IScTagLinkProps {
  className?: string;
  addr?: number;
  systemId?: string;
  loaderHeight?: number | string;
  loaderWidth?: number | string;
}

export const ScnLink = ({ addr, systemId, loaderHeight, loaderWidth, className }: IScTagLinkProps) => (
  <ScTagLink className={className} addr={addr} systemId={systemId} as="span">
    <ScLangText addrOrSystemId={addr || (systemId as string)} loaderHeight={loaderHeight} loaderWidth={loaderWidth} />
  </ScTagLink>
);
