import { ScLangText } from '@components/Language';
import { ScTagLink } from '@components/ScTag';
import { PseudoText } from '@components/Skeleton';
import { useState } from 'react';

export interface IScTagLinkProps {
  className?: string;
  addr?: number;
  systemId?: string;
  loaderHeight?: number | string;
  loaderWidth?: number | string;
}

export const ScnLink = ({ addr, systemId, loaderHeight, loaderWidth, className }: IScTagLinkProps) => {
  const [isLoad, setIsLoad] = useState(true);

  return (
    <>
      {isLoad && <PseudoText height={loaderHeight} width={loaderWidth} />}
      <ScTagLink className={className} addr={addr} systemId={systemId} as="span">
        <ScLangText
          addrOrSystemId={addr || (systemId as string)}
          loaderHeight={loaderHeight}
          loaderWidth={loaderWidth}
          setIsLoad={setIsLoad}
        />
      </ScTagLink>
    </>
  );
};
