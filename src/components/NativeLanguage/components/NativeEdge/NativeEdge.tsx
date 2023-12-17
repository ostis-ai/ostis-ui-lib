import { IScnNode } from '@components/Scn/model';
import { getRandomInt } from '@utils/getRandomInt';

import { NativeLink } from '../NativeLink';

import { EdgeInner, EdgeWrapper, StyledScTagLink } from './styled';

interface IProps {
  className?: string;
  node: IScnNode;
}

export const NativeEdge = ({ node: { addr, type, sourceNode, targetNode } }: IProps) => {
  if (!sourceNode || !targetNode) return null;

  return (
    <EdgeWrapper>
      <EdgeInner>
        <NativeLink addr={sourceNode.addr} loaderWidth={getRandomInt(40, 80)} />
        <StyledScTagLink addr={addr} forwardedAs="span" />
        <NativeLink addr={targetNode.addr} loaderWidth={getRandomInt(40, 80)} />
      </EdgeInner>
    </EdgeWrapper>
  );
};
